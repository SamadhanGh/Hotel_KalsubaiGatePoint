package com.hotelkalsubai.service;

import com.hotelkalsubai.dto.auth.JwtResponse;
import com.hotelkalsubai.entity.User;
import com.hotelkalsubai.repository.UserRepository;
import com.hotelkalsubai.security.JwtUtils;
import com.hotelkalsubai.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SmsService smsService;

    public void sendPasswordResetEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with email: " + email);
        }

        User user = userOpt.get();
        String resetToken = generateResetToken();
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1)); // 1 hour expiry
        userRepository.save(user);

        // Send email with reset link
        String resetLink = "http://localhost:5173/reset-password?token=" + resetToken;
        emailService.sendPasswordResetEmail(email, resetLink);
    }

    public void sendMobileOtp(String phoneNumber) {
        String otpCode = generateOtpCode();
        
        // Find or create user with phone number
        Optional<User> userOpt = userRepository.findByPhoneNumber(phoneNumber);
        User user;
        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else {
            user = new User();
            user.setPhoneNumber(phoneNumber);
            user.setUsername("user_" + phoneNumber.substring(phoneNumber.length() - 4));
            user.setRoles(Set.of(User.Role.ROLE_USER));
        }

        user.setOtpCode(otpCode);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5)); // 5 minutes expiry
        userRepository.save(user);

        // Send SMS
        smsService.sendOtp(phoneNumber, otpCode);
    }

    public JwtResponse verifyOtpAndLogin(String phoneNumber, String otpCode) {
        Optional<User> userOpt = userRepository.findByPhoneNumber(phoneNumber);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOpt.get();
        if (user.getOtpCode() == null || !user.getOtpCode().equals(otpCode)) {
            throw new RuntimeException("Invalid OTP");
        }

        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        // Clear OTP
        user.setOtpCode(null);
        user.setOtpExpiry(null);
        user.setIsPhoneVerified(true);
        userRepository.save(user);

        // Generate JWT
        UserDetailsImpl userDetails = UserDetailsImpl.build(user);
        String jwt = jwtUtils.generateJwtToken(userDetails);

        List<String> roles = user.getRoles().stream()
                .map(role -> role.name())
                .collect(Collectors.toList());

        return new JwtResponse(jwt, user.getId(), user.getUsername(), user.getEmail(), roles);
    }

    public JwtResponse authenticateWithGoogle(String token, String userType) {
        // Verify Google token and get user info
        // This is a simplified implementation - in production, verify with Google API
        GoogleUserInfo googleUser = verifyGoogleToken(token);
        
        Optional<User> userOpt = userRepository.findByGoogleId(googleUser.getId());
        User user;
        
        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else {
            // Create new user
            user = new User();
            user.setGoogleId(googleUser.getId());
            user.setEmail(googleUser.getEmail());
            user.setUsername(googleUser.getName());
            user.setIsEmailVerified(true);
            
            if ("admin".equals(userType)) {
                user.setRoles(Set.of(User.Role.ROLE_ADMIN, User.Role.ROLE_USER));
            } else {
                user.setRoles(Set.of(User.Role.ROLE_USER));
            }
            
            userRepository.save(user);
        }

        // Generate JWT
        UserDetailsImpl userDetails = UserDetailsImpl.build(user);
        String jwt = jwtUtils.generateJwtToken(userDetails);

        List<String> roles = user.getRoles().stream()
                .map(role -> role.name())
                .collect(Collectors.toList());

        return new JwtResponse(jwt, user.getId(), user.getUsername(), user.getEmail(), roles);
    }

    public JwtResponse authenticateWithFacebook(String token, String userType) {
        // Similar implementation for Facebook
        FacebookUserInfo facebookUser = verifyFacebookToken(token);
        
        Optional<User> userOpt = userRepository.findByFacebookId(facebookUser.getId());
        User user;
        
        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else {
            // Create new user
            user = new User();
            user.setFacebookId(facebookUser.getId());
            user.setEmail(facebookUser.getEmail());
            user.setUsername(facebookUser.getName());
            user.setIsEmailVerified(true);
            
            if ("admin".equals(userType)) {
                user.setRoles(Set.of(User.Role.ROLE_ADMIN, User.Role.ROLE_USER));
            } else {
                user.setRoles(Set.of(User.Role.ROLE_USER));
            }
            
            userRepository.save(user);
        }

        // Generate JWT
        UserDetailsImpl userDetails = UserDetailsImpl.build(user);
        String jwt = jwtUtils.generateJwtToken(userDetails);

        List<String> roles = user.getRoles().stream()
                .map(role -> role.name())
                .collect(Collectors.toList());

        return new JwtResponse(jwt, user.getId(), user.getUsername(), user.getEmail(), roles);
    }

    private String generateResetToken() {
        return java.util.UUID.randomUUID().toString();
    }

    private String generateOtpCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }

    private GoogleUserInfo verifyGoogleToken(String token) {
        // In production, verify with Google API
        // For now, return mock data
        return new GoogleUserInfo("google_123", "user@gmail.com", "Google User");
    }

    private FacebookUserInfo verifyFacebookToken(String token) {
        // In production, verify with Facebook API
        // For now, return mock data
        return new FacebookUserInfo("fb_123", "user@facebook.com", "Facebook User");
    }

    // Helper classes
    private static class GoogleUserInfo {
        private String id;
        private String email;
        private String name;

        public GoogleUserInfo(String id, String email, String name) {
            this.id = id;
            this.email = email;
            this.name = name;
        }

        public String getId() { return id; }
        public String getEmail() { return email; }
        public String getName() { return name; }
    }

    private static class FacebookUserInfo {
        private String id;
        private String email;
        private String name;

        public FacebookUserInfo(String id, String email, String name) {
            this.id = id;
            this.email = email;
            this.name = name;
        }

        public String getId() { return id; }
        public String getEmail() { return email; }
        public String getName() { return name; }
    }
}