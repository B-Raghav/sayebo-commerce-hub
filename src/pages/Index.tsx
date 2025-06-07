
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/products/ProductCard';
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockProducts = [
    {
      id: '1',
      title: 'Premium Wireless Headphones',
      description: 'High-quality noise-canceling wireless headphones with 30-hour battery life',
      price: 299.99,
      category: 'Electronics',
      image: '/placeholder.svg',
      sellerId: 'seller1'
    },
    {
      id: '2',
      title: 'Organic Cotton T-Shirt',
      description: 'Comfortable and sustainable organic cotton t-shirt in multiple colors',
      price: 39.99,
      category: 'Clothing',
      image: '/placeholder.svg',
      sellerId: 'seller2'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">Sayebo</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your premier destination for quality products from trusted sellers
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/login')} size="lg" className="px-8">
                Get Started
              </Button>
              <Button onClick={() => navigate('/seller-register')} variant="outline" size="lg" className="px-8">
                Become a Seller
              </Button>
            </div>
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">For Buyers</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  Discover amazing products from verified sellers with secure transactions
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">For Sellers</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  Reach millions of customers and grow your business with our platform
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  Safe payments, fast delivery, and excellent customer support
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Products</h1>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
