
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import AddProductForm from '@/components/products/AddProductForm';
import ProductCard from '@/components/products/ProductCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Store, Package, TrendingUp, DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sellerId: string;
}

const SellerDashboard = () => {
  const { user, loading } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, getProductsBySeller } = useProducts();
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'seller')) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const sellerProducts = user ? getProductsBySeller(user.id) : [];

  const handleProductAdded = (product: Product) => {
    if (editingProduct) {
      // Update existing product
      updateProduct(product.id, product);
      setEditingProduct(null);
      toast({
        title: "Product updated",
        description: "Product has been updated successfully.",
      });
    } else {
      // Add new product
      addProduct({ ...product, sellerId: user?.id || '' });
      toast({
        title: "Product added",
        description: "Product has been added to your store.",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (productId: string) => {
    deleteProduct(productId);
    toast({
      title: "Product deleted",
      description: "Product has been removed from your store.",
    });
  };

  const stats = {
    totalProducts: sellerProducts.length,
    totalRevenue: sellerProducts.reduce((sum, p) => sum + p.price, 0),
    categories: new Set(sellerProducts.map(p => p.category)).size
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user.role !== 'seller') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}! Manage your products and track your sales.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Products</CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalProducts}</div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Categories</CardTitle>
              <Store className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.categories}</div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Inventory Value</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">R{stats.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="add">Add Product</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Products</CardTitle>
                <CardDescription>
                  Manage your product inventory and make updates as needed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sellerProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
                    <p className="text-gray-600 mb-4">Start by adding your first product to your store.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sellerProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        showActions={true}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="add">
            <AddProductForm
              onProductAdded={handleProductAdded}
              editingProduct={editingProduct}
              onCancelEdit={() => setEditingProduct(null)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;
