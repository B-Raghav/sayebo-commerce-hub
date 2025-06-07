
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/products/ProductCard';
import CategoryScroller from '@/components/layout/CategoryScroller';
import HeroBanner from '@/components/layout/HeroBanner';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Enhanced mock data with more realistic products
  const mockProducts = [
    {
      id: '1',
      title: 'Premium Wireless Headphones',
      description: 'High-quality noise-canceling wireless headphones with 30-hour battery life',
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      category: 'Electronics',
      image: '/placeholder.svg',
      rating: 4.5,
      reviews: 1247,
      sellerId: 'seller1',
      stock: 15
    },
    {
      id: '2',
      title: 'Organic Cotton T-Shirt',
      description: 'Comfortable and sustainable organic cotton t-shirt in multiple colors',
      price: 39.99,
      originalPrice: 59.99,
      discount: 33,
      category: 'Clothing',
      image: '/placeholder.svg',
      rating: 4.2,
      reviews: 856,
      sellerId: 'seller2',
      stock: 50
    },
    {
      id: '3',
      title: 'Smart Watch Series 5',
      description: 'Advanced fitness tracking with heart rate monitoring and GPS',
      price: 249.99,
      originalPrice: 349.99,
      discount: 29,
      category: 'Electronics',
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 2341,
      sellerId: 'seller3',
      stock: 8
    },
    {
      id: '4',
      title: 'Home Coffee Maker',
      description: 'Professional-grade coffee maker with built-in grinder',
      price: 199.99,
      originalPrice: 279.99,
      discount: 29,
      category: 'Home & Kitchen',
      image: '/placeholder.svg',
      rating: 4.3,
      reviews: 543,
      sellerId: 'seller1',
      stock: 12
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToCart = (productId) => {
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'under50' && product.price < 50) ||
                        (priceFilter === '50to200' && product.price >= 50 && product.price <= 200) ||
                        (priceFilter === 'over200' && product.price > 200);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Category Scroller */}
      <CategoryScroller />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under50">Under $50</SelectItem>
                  <SelectItem value="50to200">$50 - $200</SelectItem>
                  <SelectItem value="over200">Over $200</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Hot Deals Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">🔥 Hot Deals</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <EnhancedProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Product Card Component
const EnhancedProductCard = ({ product, onAddToCart }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            -{product.discount}%
          </Badge>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 h-8 w-8 opacity-80 hover:opacity-100"
        >
          ❤️
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
          {product.title}
        </h3>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-green-600">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            size="sm"
            onClick={() => onAddToCart(product.id)}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add to Cart
          </Button>
          <Button size="sm" variant="outline" className="px-3">
            Buy Now
          </Button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;
