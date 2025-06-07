
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import { Star, ShoppingCart, Heart, ArrowLeft, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
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
  images?: string[];
  rating?: number;
  reviews?: number;
  sellerId: string;
  stock?: number;
  badge?: string;
  features?: string[];
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Mock product data
  const mockProduct: Product = {
    id: '1',
    title: 'Handcrafted African Jewelry Set',
    description: 'This beautiful beaded necklace and earrings set is handcrafted by skilled South African artisans using traditional techniques passed down through generations. Each piece tells a story of cultural heritage and modern elegance.',
    price: 450,
    originalPrice: 600,
    discount: 25,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600'
    ],
    rating: 4.8,
    reviews: 89,
    sellerId: 'seller1',
    stock: 12,
    badge: "Women's Choice",
    features: [
      'Handcrafted by local artisans',
      'Traditional African beading techniques',
      'High-quality materials',
      'Unique cultural design',
      'Comes with authenticity certificate'
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct(mockProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
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
      description: `${quantity} item(s) added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to purchase items.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blush-rose to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blush-rose to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
            <Button onClick={() => navigate('/products')}>Back to Products</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-rose to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 hover:bg-pink hover:text-pink-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border border-pink-200">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 overflow-hidden rounded border-2 ${
                      selectedImage === index ? 'border-pink-500' : 'border-pink-200'
                    }`}
                  >
                    <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-peach text-orange-700">
                  {product.category}
                </Badge>
                {product.badge && (
                  <Badge className="bg-pink text-pink-800">
                    {product.badge}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`h-5 w-5 ${i <= Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-sa-green">
                  R{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      R{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge className="bg-red-500 text-white">
                      {product.discount}% OFF
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              
              {product.features && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Purchase Section */}
            <Card className="border-pink-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-8 w-8 p-0"
                      >
                        -
                      </Button>
                      <span className="w-12 text-center">{quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="text-sa-green font-medium">{product.stock} items</span> in stock
                  </div>

                  <div className="space-y-3">
                    <Button 
                      onClick={handleBuyNow}
                      className="w-full bg-sa-blue hover:bg-sa-blue/90 text-white font-semibold"
                      size="lg"
                    >
                      Buy Now - R{(product.price * quantity).toLocaleString()}
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleAddToCart}
                        variant="outline"
                        className="flex-1 border-pink-300 hover:bg-pink hover:text-pink-800"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="icon" className="border-pink-300 hover:bg-pink">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="border-pink-300 hover:bg-pink">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="h-4 w-4" />
                <span>Free delivery</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <RotateCcw className="h-4 w-4" />
                <span>Easy returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
