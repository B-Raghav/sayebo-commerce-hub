
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import { Search, Filter, ShoppingCart, Star, Heart } from 'lucide-react';
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

const Products = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock products with Women's Day theme
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'under300' && product.price < 300) ||
                        (priceFilter === '300to600' && product.price >= 300 && product.price <= 600) ||
                        (priceFilter === 'over600' && product.price > 600);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-rose to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-gray-600">Discover amazing products from South African women entrepreneurs</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-pink-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-pink-300 focus:border-pink-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 border-pink-300">
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
                <SelectTrigger className="w-48 border-pink-300">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under300">Under R300</SelectItem>
                  <SelectItem value="300to600">R300 - R600</SelectItem>
                  <SelectItem value="over600">Over R600</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-pink-200">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-pink-200 bg-white">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  />
                  {product.discount && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white font-semibold">
                      -{product.discount}%
                    </Badge>
                  )}
                  {product.badge && (
                    <Badge className="absolute top-3 right-3 bg-pink text-pink-800 font-semibold">
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
                    <Badge variant="secondary" className="text-xs bg-peach text-orange-700">
                      {product.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600 font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight cursor-pointer hover:text-sa-blue"
                      onClick={() => handleProductClick(product.id)}>
                    {product.title}
                  </h3>
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-sa-green">
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
                      className="flex-1 bg-sa-blue hover:bg-sa-blue/90" 
                      size="sm"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Cart
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="px-3 border-pink-300 hover:bg-pink hover:text-pink-800"
                      onClick={() => handleProductClick(product.id)}
                    >
                      View
                    </Button>
                  </div>
                  
                  <div className="text-xs text-center">
                    {product.stock && product.stock > 0 ? (
                      <span className="text-sa-green font-medium">{product.stock} in stock</span>
                    ) : (
                      <span className="text-red-600 font-medium">Out of stock</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
