import { BlogPost, CreateBlogPost } from '../types/blog';
import { mockBlogPosts } from '../data/blogPosts';

// Mock API for blog operations
// In production, replace with actual API calls to Spring Boot backend

const API_BASE_URL = 'http://localhost:8080/api';

export const blogApi = {
  // Get all blog posts
  getAllBlogs: async (): Promise<BlogPost[]> => {
    // In production: return fetch(`${API_BASE_URL}/blogs`).then(res => res.json());
    return Promise.resolve(mockBlogPosts);
  },

  // Get single blog post by ID
  getBlogById: async (id: number): Promise<BlogPost | null> => {
    // In production: return fetch(`${API_BASE_URL}/blogs/${id}`).then(res => res.json());
    const blog = mockBlogPosts.find(post => post.id === id);
    return Promise.resolve(blog || null);
  },

  // Create new blog post (admin only)
  createBlog: async (blogData: CreateBlogPost): Promise<BlogPost> => {
    // In production: return fetch(`${API_BASE_URL}/blogs`, { method: 'POST', body: JSON.stringify(blogData) });
    const newBlog: BlogPost = {
      id: Date.now(), // Generate temporary ID
      ...blogData,
      publishedAt: new Date().toISOString()
    };
    mockBlogPosts.unshift(newBlog);
    return Promise.resolve(newBlog);
  },

  // Update blog post (admin only)
  updateBlog: async (id: number, blogData: Partial<CreateBlogPost>): Promise<BlogPost> => {
    // In production: return fetch(`${API_BASE_URL}/blogs/${id}`, { method: 'PUT', body: JSON.stringify(blogData) });
    const blogIndex = mockBlogPosts.findIndex(post => post.id === id);
    if (blogIndex !== -1) {
      mockBlogPosts[blogIndex] = { ...mockBlogPosts[blogIndex], ...blogData };
      return Promise.resolve(mockBlogPosts[blogIndex]);
    }
    throw new Error('Blog post not found');
  },

  // Delete blog post (admin only)
  deleteBlog: async (id: number): Promise<void> => {
    // In production: return fetch(`${API_BASE_URL}/blogs/${id}`, { method: 'DELETE' });
    const blogIndex = mockBlogPosts.findIndex(post => post.id === id);
    if (blogIndex !== -1) {
      mockBlogPosts.splice(blogIndex, 1);
    }
    return Promise.resolve();
  }
};