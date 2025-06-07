
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Store, ShoppingCart, Search, Heart } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigateToDashboard = () => {
    if (user?.role === 'seller') {
      navigate('/dashboard/seller');
    } else {
      navigate('/dashboard/user');
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-pink-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="text-3xl font-bold text-sa-blue cursor-pointer hover:text-sa-blue/80 transition-colors"
            onClick={() => navigate('/')}
          >
            Sayebo
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => navigate('/')}
              className={`text-gray-700 hover:text-sa-blue transition-colors ${location.pathname === '/' ? 'text-sa-blue font-medium' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/products')}
              className={`text-gray-700 hover:text-sa-blue transition-colors ${location.pathname === '/products' ? 'text-sa-blue font-medium' : ''}`}
            >
              Products
            </button>
            <button 
              onClick={() => navigate('/about')}
              className={`text-gray-700 hover:text-sa-blue transition-colors ${location.pathname === '/about' ? 'text-sa-blue font-medium' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className={`text-gray-700 hover:text-sa-blue transition-colors ${location.pathname === '/contact' ? 'text-sa-blue font-medium' : ''}`}
            >
              Contact
            </button>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Cart Icon - Only for users */}
                {user.role === 'user' && (
                  <>
                    <Button
                      variant="ghost"
                      className="relative hover:bg-pink hover:text-pink-800"
                      onClick={() => navigate('/cart')}
                    >
                      <Heart className="h-5 w-5 text-gray-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="relative hover:bg-pink hover:text-pink-800"
                      onClick={() => navigate('/cart')}
                    >
                      <ShoppingCart className="h-5 w-5 text-gray-600" />
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-pink text-pink-800 text-xs">
                        2
                      </Badge>
                    </Button>
                  </>
                )}
                
                {/* Dashboard Button */}
                <Button
                  variant="ghost"
                  onClick={navigateToDashboard}
                  className="flex items-center gap-2 hover:bg-pink hover:text-pink-800 text-gray-700"
                >
                  {user.role === 'seller' ? <Store className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  <span className="hidden md:inline">
                    {user.role === 'seller' ? 'Seller Hub' : 'My Account'}
                  </span>
                </Button>
                
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 hover:bg-pink hover:text-pink-800">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <span className="hidden md:inline text-sm text-gray-700">
                        {user.name || user.email}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={navigateToDashboard}>
                      {user.role === 'seller' ? 'Seller Dashboard' : 'My Account'}
                    </DropdownMenuItem>
                    {user.role === 'user' && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/cart')}>
                          My Cart
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/orders')}>
                          My Orders
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-sa-blue hover:bg-pink"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  className="bg-sa-blue hover:bg-sa-blue/90 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
