import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface AddProductFormProps {
  onProductAdded: (product: Product) => void;
  editingProduct?: Product | null;
  onCancelEdit?: () => void;
}

const categories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports & Outdoors',
  'Books',
  'Beauty & Health',
  'Art & Crafts',
  'Automotive',
  'Health',
  'Other'
];

const AddProductForm = ({ onProductAdded, editingProduct, onCancelEdit }: AddProductFormProps) => {
  const [formData, setFormData] = useState({
    title: editingProduct?.title || '',
    description: editingProduct?.description || '',
    price: editingProduct?.price || 0,
    category: editingProduct?.category || '',
    image: editingProduct?.image || ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call - replace with actual MongoDB integration
      const product = {
        ...formData,
        id: editingProduct?.id || Math.random().toString(36).substr(2, 9),
        image: formData.image || '/placeholder.svg'
      };

      onProductAdded(product);
      
      if (editingProduct) {
        toast({
          title: "Product updated!",
          description: "Your product has been updated successfully.",
        });
        onCancelEdit?.();
      } else {
        toast({
          title: "Product added!",
          description: "Your product has been added successfully.",
        });
        // Reset form
        setFormData({
          title: '',
          description: '',
          price: 0,
          category: '',
          image: ''
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Plus className="h-5 w-5" />
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {editingProduct ? 'Update your product details' : 'Fill in the details to add a new product to your store'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700">Product Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter product title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="border-gray-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price" className="text-gray-700">Price (ZAR)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="1"
                min="0"
                placeholder="0"
                value={formData.price || ''}
                onChange={handleInputChange}
                required
                className="border-gray-300"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-700">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image" className="text-gray-700">Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleInputChange}
                className="border-gray-300"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your product..."
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
              className="border-gray-300"
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {editingProduct ? 'Updating...' : 'Adding...'}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </div>
              )}
            </Button>
            
            {editingProduct && (
              <Button type="button" variant="outline" onClick={onCancelEdit} className="border-gray-300 hover:bg-gray-50">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;
