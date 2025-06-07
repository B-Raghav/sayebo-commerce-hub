
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import CategoryScroller from '@/components/layout/CategoryScroller';
import HeroBanner from '@/components/layout/HeroBanner';
import { Search, Filter, ShoppingCart, Star, Heart } from 'lucide-react';
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

  // Mock products with ZAR pricing and South African context
  const mockProducts = [
    {
      id: '1',
      title: 'Samsung Galaxy A54 5G',
      description: 'Latest smartphone with excellent camera and long battery life',
      price: 8999,
      originalPrice: 10999,
      discount: 18,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      rating: 4.5,
      reviews: 247,
      sellerId: 'seller1',
      stock: 15,
      badge: 'New'
    },
    {
      id: '2',
      title: 'Traditional African Print Dress',
      description: 'Beautiful handmade dress with authentic South African patterns',
      price: 599,
      originalPrice: 799,
      discount: 25,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
      rating: 4.8,
      reviews: 156,
      sellerId: 'seller2',
      stock: 8,
      badge: 'Popular'
    },
    {
      id: '3',
      title: 'Rooibos Tea Premium Pack',
      description: 'Organic South African Rooibos tea, 100% natural and caffeine-free',
      price: 299,
      originalPrice: 399,
      discount: 25,
      category: 'Health',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
      rating: 4.7,
      reviews: 89,
      sellerId: 'seller3',
      stock: 25,
      badge: 'Local'
    },
    {
      id: '4',
      title: 'Handcrafted Wooden Coffee Table',
      description: 'Beautiful solid wood coffee table made by local artisans',
      price: 2599,
      originalPrice: 3299,
      discount: 21,
      category: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      rating: 4.6,
      reviews: 34,
      sellerId: 'seller1',
      stock: 5,
      badge: 'Handmade'
    },
    {
      id: '5',
      title: 'Biltong Maker Pro',
      description: 'Professional biltong maker for authentic South African dried meat',
      price: 1899,
      originalPrice: 2299,
      discount: 17,
      category: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
      rating: 4.4,
      reviews: 67,
      sellerId: 'seller4',
      stock: 12,
      badge: 'Local Favorite'
    },
    {
      id: '6',
      title: 'Springbok Rugby Jersey',
      description: 'Official Springboks rugby jersey - support the national team',
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      category: 'Sports',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      rating: 4.9,
      reviews: 203,
      sellerId: 'seller2',
      stock: 18,
      badge: 'Official'
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
                        (priceFilter === 'under500' && product.price < 500) ||
                        (priceFilter === '500to2000' && product.price >= 500 && product.price <= 2000) ||
                        (priceFilter === 'over2000' && product.price > 2000);
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300"
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
                  <SelectItem value="under500">Under R500</SelectItem>
                  <SelectItem value="500to2000">R500 - R2,000</SelectItem>
                  <SelectItem value="over2000">Over R2,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              View All
            </Button>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
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

// Clean Product Card Component with ZAR pricing
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 bg-white">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white font-semibold">
            -{product.discount}%
          </Badge>
        )}
        {product.badge && (
          <Badge className="absolute top-3 right-3 bg-blue-600 text-white font-semibold">
            {product.badge}
          </Badge>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-3 right-3 h-8 w-8 bg-white/90 hover:bg-white"
        >
          <Heart className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
            {product.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600 font-medium">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight">
          {product.title}
        </h3>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-green-600">
            R{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              R{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        <div className="flex gap-2 mb-3">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700" 
            size="sm"
            onClick={() => onAddToCart(product.id)}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add to Cart
          </Button>
          <Button size="sm" variant="outline" className="px-3 border-gray-300 hover:bg-gray-50">
            View
          </Button>
        </div>
        
        <div className="text-xs text-center">
          {product.stock > 0 ? (
            <span className="text-green-600 font-medium">{product.stock} in stock</span>
          ) : (
            <span className="text-red-600 font-medium">Out of stock</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;
