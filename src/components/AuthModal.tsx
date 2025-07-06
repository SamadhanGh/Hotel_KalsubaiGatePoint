import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Shield, 
  Mail, 
  Lock, 
  Phone, 
  Eye, 
  EyeOff,
  UserPlus,
  LogIn,
  Smartphone
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsummit/react-facebook-login';
import { authApi } from '../../utils/authApi';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

type AuthMode = 'login' | 'register';
type UserType = 'user' | 'admin';
type LoginMethod = 'email' | 'phone';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<UserType>('user');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    otpCode: ''
  });

  // Refs to prevent re-rendering issues
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Stable handlers using useCallback
  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleTabChange = useCallback((tab: UserType) => {
    setActiveTab(tab);
  }, []);

  const handleAuthModeChange = useCallback((mode: AuthMode) => {
    setAuthMode(mode);
    setFormData({
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      otpCode: ''
    });
  }, []);

  const handleLoginMethodChange = useCallback((method: LoginMethod) => {
    setLoginMethod(method);
    setOtpSent(false);
    setFormData(prev => ({
      ...prev,
      otpCode: ''
    }));
  }, []);

  // Close modal handler
  const handleClose = useCallback(() => {
    onClose();
    // Reset form after animation completes
    setTimeout(() => {
      setFormData({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        otpCode: ''
      });
      setAuthMode('login');
      setActiveTab('user');
      setLoginMethod('email');
      setOtpSent(false);
      setShowPassword(false);
    }, 300);
  }, [onClose]);

  // Prevent modal close when clicking inside
  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Email/Password Authentication
  const handleEmailAuth = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (authMode === 'login') {
        response = await authApi.login({
          email: formData.email,
          password: formData.password,
          userType: activeTab
        });
      } else {
        response = await authApi.register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          userType: activeTab
        });
      }

      if (response.success) {
        toast.success(authMode === 'login' ? 'Login successful!' : 'Registration successful!');
        onSuccess(response.data);
        handleClose();
      } else {
        toast.error(response.message || 'Authentication failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  }, [authMode, formData, activeTab, onSuccess, handleClose]);

  // Phone OTP Authentication
  const handlePhoneAuth = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!otpSent) {
        // Send OTP
        const response = await authApi.sendOtp(formData.phoneNumber);
        if (response.success) {
          setOtpSent(true);
          toast.success('OTP sent successfully!');
        } else {
          toast.error('Failed to send OTP');
        }
      } else {
        // Verify OTP
        const response = await authApi.verifyOtp(formData.phoneNumber, formData.otpCode);
        if (response.success) {
          toast.success('Login successful!');
          onSuccess(response.data);
          handleClose();
        } else {
          toast.error('Invalid OTP');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  }, [formData, otpSent, onSuccess, handleClose]);

  // Google Login
  const handleGoogleSuccess = useCallback(async (credentialResponse: any) => {
    try {
      const response = await authApi.googleLogin(credentialResponse.credential, activeTab);
      if (response.success) {
        toast.success('Google login successful!');
        onSuccess(response.data);
        handleClose();
      } else {
        toast.error('Google login failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Google login failed');
    }
  }, [activeTab, onSuccess, handleClose]);

  // Facebook Login
  const handleFacebookResponse = useCallback(async (response: any) => {
    if (response.accessToken) {
      try {
        const authResponse = await authApi.facebookLogin(response.accessToken, activeTab);
        if (authResponse.success) {
          toast.success('Facebook login successful!');
          onSuccess(authResponse.data);
          handleClose();
        } else {
          toast.error('Facebook login failed');
        }
      } catch (error: any) {
        toast.error(error.message || 'Facebook login failed');
      }
    }
  }, [activeTab, onSuccess, handleClose]);

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
            onClick={handleModalClick}
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <h2 className="text-2xl font-bold mb-4">Welcome to Hotel Kalsubai</h2>
              
              {/* User Type Tabs */}
              <div className="flex bg-white/20 rounded-lg p-1">
                <button
                  onClick={() => handleTabChange('user')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                    activeTab === 'user' 
                      ? 'bg-white text-amber-600 shadow-md' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Guest</span>
                </button>
                <button
                  onClick={() => handleTabChange('admin')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                    activeTab === 'admin' 
                      ? 'bg-white text-amber-600 shadow-md' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Auth Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => handleAuthModeChange('login')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                    authMode === 'login' 
                      ? 'bg-white text-gray-800 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => handleAuthModeChange('register')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                    authMode === 'register' 
                      ? 'bg-white text-gray-800 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </button>
              </div>

              {/* Login Method Toggle (only for login) */}
              {authMode === 'login' && (
                <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                  <button
                    onClick={() => handleLoginMethodChange('email')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                      loginMethod === 'email' 
                        ? 'bg-white text-gray-800 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </button>
                  <button
                    onClick={() => handleLoginMethodChange('phone')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                      loginMethod === 'phone' 
                        ? 'bg-white text-gray-800 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Smartphone className="h-4 w-4" />
                    <span>Phone</span>
                  </button>
                </div>
              )}

              {/* Forms */}
              <AnimatePresence mode="wait">
                {authMode === 'register' || loginMethod === 'email' ? (
                  <motion.form
                    key="email-form"
                    ref={formRef}
                    onSubmit={handleEmailAuth}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    {authMode === 'register' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Username
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Enter your username"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          required
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Please wait...</span>
                        </div>
                      ) : (
                        authMode === 'login' ? 'Sign In' : 'Sign Up'
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="phone-form"
                    onSubmit={handlePhoneAuth}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          required
                          disabled={otpSent}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    {otpSent && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="overflow-hidden"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Enter OTP
                        </label>
                        <input
                          type="text"
                          value={formData.otpCode}
                          onChange={(e) => handleInputChange('otpCode', e.target.value)}
                          required
                          maxLength={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center text-lg tracking-widest"
                          placeholder="000000"
                        />
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Please wait...</span>
                        </div>
                      ) : (
                        otpSent ? 'Verify OTP' : 'Send OTP'
                      )}
                    </button>

                    {otpSent && (
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setFormData(prev => ({ ...prev, otpCode: '' }));
                        }}
                        className="w-full text-amber-600 hover:text-amber-700 text-sm font-medium"
                      >
                        Change Phone Number
                      </button>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Social Login (only for email method) */}
              {(authMode === 'register' || loginMethod === 'email') && (
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => toast.error('Google login failed')}
                      render={(renderProps) => (
                        <button
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span className="ml-2">Google</span>
                        </button>
                      )}
                    />

                    <FacebookLogin
                      appId={import.meta.env.VITE_FACEBOOK_APP_ID || "your-facebook-app-id"}
                      onSuccess={handleFacebookResponse}
                      onFail={(error: any) => toast.error('Facebook login failed')}
                      render={({ onClick }: any) => (
                        <button
                          onClick={onClick}
                          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          <span className="ml-2">Facebook</span>
                        </button>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Forgot Password Link */}
              {authMode === 'login' && loginMethod === 'email' && (
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;