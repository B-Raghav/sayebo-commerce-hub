
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      title: 'Handcrafted African Jewelry Set',
      price: 450,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200',
      quantity: 1,
      stock: 12
    },
    {
      id: '2',
      title: 'Traditional Shweshwe Dress',
      price: 890,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200',
      quantity: 2,
      stock: 8
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: Math.min(newQuantity, item.stock) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blush-rose to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
            <p className="text-gray-600 mb-6">You need to login to view your cart</p>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-rose to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
            <Button onClick={() => navigate('/products')} className="bg-sa-blue hover:bg-sa-blue/90">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <Card key={item.id} className="border-pink-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sa-green font-bold">R{item.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Order Summary */}
            <div>
              <Card className="border-pink-200 sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `R${shipping}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-sm text-sa-green">🎉 Free shipping on orders over R500!</p>
                  )}
                  <hr className="border-pink-200" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-sa-green">R{total.toLocaleString()}</span>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-sa-blue hover:bg-sa-blue/90 text-white font-semibold"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/products')}
                    className="w-full border-pink-300 hover:bg-pink hover:text-pink-800"
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
