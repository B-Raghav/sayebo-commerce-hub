
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  image: string;
  rating?: number;
  reviews?: number;
  sellerId: string;
  stock?: number;
  badge?: string;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsBySeller: (sellerId: string) => Product[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load initial mock products
    const mockProducts: Product[] = [
      {
        id: '1',
        title: 'Handcrafted African Jewelry Set',
        description: 'Beautiful beaded necklace and earrings made by local artisans',
        price: 450,
        originalPrice: 600,
        discount: 25,
        category: 'Jewelry',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
        rating: 4.8,
        reviews: 89,
        sellerId: 'seller1',
        stock: 12,
        badge: "Women's Choice"
      },
      {
        id: '2',
        title: 'Traditional Shweshwe Dress',
        description: 'Elegant traditional South African dress in modern cut',
        price: 890,
        originalPrice: 1200,
        discount: 26,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
        rating: 4.9,
        reviews: 156,
        sellerId: 'seller2',
        stock: 8,
        badge: 'Bestseller'
      },
      {
        id: '3',
        title: 'Natural Rooibos Skincare Set',
        description: 'Organic skincare products made with South African rooibos',
        price: 320,
        originalPrice: 450,
        discount: 29,
        category: 'Beauty',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
        rating: 4.7,
        reviews: 203,
        sellerId: 'seller3',
        stock: 25,
        badge: 'Natural'
      },
      {
        id: '4',
        title: 'Handwoven Baskets Collection',
        description: 'Traditional African baskets perfect for home decoration',
        price: 280,
        originalPrice: 380,
        discount: 26,
        category: 'Home Decor',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        rating: 4.6,
        reviews: 67,
        sellerId: 'seller1',
        stock: 15,
        badge: 'Handmade'
      },
      {
        id: '5',
        title: 'Inspirational Book: Women Leaders SA',
        description: 'Stories of successful South African women entrepreneurs',
        price: 180,
        originalPrice: 250,
        discount: 28,
        category: 'Books',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        rating: 4.5,
        reviews: 94,
        sellerId: 'seller4',
        stock: 30,
        badge: 'Inspiring'
      },
      {
        id: '6',
        title: 'Herbal Tea Wellness Bundle',
        description: 'Collection of South African healing teas for wellness',
        price: 220,
        originalPrice: 300,
        discount: 27,
        category: 'Health',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
        rating: 4.4,
        reviews: 78,
        sellerId: 'seller5',
        stock: 20,
        badge: 'Wellness'
      }
    ];
    setProducts(mockProducts);
  }, []);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductsBySeller = (sellerId: string) => {
    return products.filter(product => product.sellerId === sellerId);
  };

  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      getProductsBySeller
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
