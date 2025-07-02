// Mock API utilities for development
// In production, replace these with actual API calls to your Spring Boot backend

const API_BASE_URL = 'http://localhost:8080/api';

// Mock data for development
const mockMenuItems = [
  { id: 1, name: 'Paneer Butter Masala', price: 180, category: 'veg', description: 'Rich and creamy paneer curry' },
  { id: 2, name: 'Chicken Biryani', price: 220, category: 'nonveg', description: 'Aromatic basmati rice with tender chicken' },
  // Add more mock items as needed
];

const mockGalleryImages = [
  { id: 1, url: '/images/hotel1.jpg', title: 'Hotel Exterior', category: 'Building' },
  { id: 2, url: '/images/room1.jpg', title: 'Comfortable Rooms', category: 'Rooms' },
  // Add more mock images as needed
];

// API functions (replace with actual implementations)
export const api = {
  // Menu APIs
  getMenuItems: async () => {
    // In production: return fetch(`${API_BASE_URL}/menu`).then(res => res.json());
    return Promise.resolve(mockMenuItems);
  },

  addMenuItem: async (item: any) => {
    // In production: return fetch(`${API_BASE_URL}/menu`, { method: 'POST', body: JSON.stringify(item) });
    console.log('Adding menu item:', item);
    return Promise.resolve({ success: true });
  },

  updateMenuItem: async (id: number, item: any) => {
    // In production: return fetch(`${API_BASE_URL}/menu/${id}`, { method: 'PUT', body: JSON.stringify(item) });
    console.log('Updating menu item:', id, item);
    return Promise.resolve({ success: true });
  },

  deleteMenuItem: async (id: number) => {
    // In production: return fetch(`${API_BASE_URL}/menu/${id}`, { method: 'DELETE' });
    console.log('Deleting menu item:', id);
    return Promise.resolve({ success: true });
  },

  // Gallery APIs
  getGalleryImages: async () => {
    // In production: return fetch(`${API_BASE_URL}/gallery`).then(res => res.json());
    return Promise.resolve(mockGalleryImages);
  },

  uploadGalleryImage: async (formData: FormData) => {
    // In production: return fetch(`${API_BASE_URL}/gallery`, { method: 'POST', body: formData });
    console.log('Uploading gallery image:', formData);
    return Promise.resolve({ success: true });
  },

  deleteGalleryImage: async (id: number) => {
    // In production: return fetch(`${API_BASE_URL}/gallery/${id}`, { method: 'DELETE' });
    console.log('Deleting gallery image:', id);
    return Promise.resolve({ success: true });
  },

  // Booking APIs
  createBooking: async (booking: any) => {
    // In production: return fetch(`${API_BASE_URL}/booking`, { method: 'POST', body: JSON.stringify(booking) });
    console.log('Creating booking:', booking);
    return Promise.resolve({ success: true });
  },

  // Contact APIs
  submitContactForm: async (formData: any) => {
    // In production: return fetch(`${API_BASE_URL}/contact`, { method: 'POST', body: JSON.stringify(formData) });
    console.log('Submitting contact form:', formData);
    return Promise.resolve({ success: true });
  },

  // Admin APIs
  adminLogin: async (credentials: any) => {
    // In production: return fetch(`${API_BASE_URL}/login`, { method: 'POST', body: JSON.stringify(credentials) });
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      return Promise.resolve({ success: true, token: 'mock-jwt-token' });
    }
    return Promise.resolve({ success: false, message: 'Invalid credentials' });
  }
};

export default api;