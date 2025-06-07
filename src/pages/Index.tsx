
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import CategoryScroller from '@/components/layout/CategoryScroller';
import HeroBanner from '@/components/layout/HeroBanner';
import ProductCard from '@/components/products/ProductCard';
import { toast } from '@/hooks/use-toast';

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

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock products with Women's Day theme and South African context
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

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToCart = (productId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    toast({
      title: "Added to Cart",
      description: "Product has been added to your cart.",
    });
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-rose to-white">
      <Navbar />
      
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Category Scroller */}
      <CategoryScroller />
      
      <div className="container mx-auto px-4 py-8">
        {/* Featured Products Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <button 
              onClick={() => navigate('/products')}
              className="text-sa-blue hover:text-sa-blue/80 font-medium transition-colors"
            >
              View All Products →
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 8).map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
