
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import Navbar from '@/components/layout/Navbar';
import CategoryScroller from '@/components/layout/CategoryScroller';
import HeroBanner from '@/components/layout/HeroBanner';
import ProductCard from '@/components/products/ProductCard';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const { user } = useAuth();
  const { products } = useProducts();
  const navigate = useNavigate();

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
        </div>
      </div>
    </div>
  );
};

export default Index;
