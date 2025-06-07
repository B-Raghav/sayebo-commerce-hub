
// API service layer ready for MongoDB integration
// Replace these mock functions with actual HTTP calls to your backend

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sellerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'seller';
  createdAt?: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Authentication APIs
export const authAPI = {
  async login(email: string, password: string, role: 'user' | 'seller'): Promise<AuthResponse> {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password, role })
    // });
    // return response.json();
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split('@')[0],
            role
          },
          token: 'mock-jwt-token'
        });
      }, 500);
    });
  },

  async register(email: string, password: string, role: 'user' | 'seller', name: string): Promise<AuthResponse> {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password, role, name })
    // });
    // return response.json();
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            role
          },
          token: 'mock-jwt-token'
        });
      }, 500);
    });
  }
};

// Product APIs
export const productAPI = {
  async getProducts(sellerId?: string): Promise<Product[]> {
    // TODO: Replace with actual API call
    // const url = sellerId ? `/api/products?sellerId=${sellerId}` : '/api/products';
    // const response = await fetch(url);
    // return response.json();
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  },

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/products', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(product)
    // });
    // return response.json();
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ...product,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }, 500);
    });
  },

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/products/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(product)
    // });
    // return response.json();
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id,
          ...product,
          updatedAt: new Date()
        } as Product);
      }, 500);
    });
  },

  async deleteProduct(id: string): Promise<void> {
    // TODO: Replace with actual API call
    // await fetch(`/api/products/${id}`, {
    //   method: 'DELETE'
    // });
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
};

// Helper function to get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth headers
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};
