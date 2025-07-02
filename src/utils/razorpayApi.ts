// Razorpay Payment Gateway Integration
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface CreateOrderRequest {
  amount: number;
  currency: string;
  receipt: string;
  bookingId: number;
}

export interface CreateOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  bookingId: number;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  paymentId?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const razorpayApi = {
  // Load Razorpay script
  loadRazorpayScript: (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  // Create Razorpay order
  createOrder: async (orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
    try {
      // In production, this would call your backend API
      // const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/create-order`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderData)
      // });
      // return response.json();

      // Mock implementation for development
      return Promise.resolve({
        id: `order_${Date.now()}`,
        amount: orderData.amount,
        currency: orderData.currency,
        receipt: orderData.receipt,
        status: 'created'
      });
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error;
    }
  },

  // Verify payment
  verifyPayment: async (verificationData: VerifyPaymentRequest): Promise<VerifyPaymentResponse> => {
    try {
      // In production, this would call your backend API
      // const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/verify`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(verificationData)
      // });
      // return response.json();

      // Mock implementation for development
      return Promise.resolve({
        success: true,
        message: 'Payment verified successfully',
        paymentId: verificationData.razorpay_payment_id
      });
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },

  // Initialize Razorpay payment
  initializePayment: async (options: RazorpayOptions): Promise<void> => {
    const isLoaded = await razorpayApi.loadRazorpayScript();
    
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay SDK');
    }

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }
};