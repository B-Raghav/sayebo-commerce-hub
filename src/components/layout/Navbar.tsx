
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Store } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
      navigate('/seller-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div 
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Sayebo
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={navigateToDashboard}
                  className="flex items-center gap-2"
                >
                  {user.role === 'seller' ? <Store className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  {user.role === 'seller' ? 'Seller Dashboard' : 'Dashboard'}
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {user.name || user.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={navigateToDashboard}>
                      {user.role === 'seller' ? 'Seller Dashboard' : 'Dashboard'}
                    </DropdownMenuItem>
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
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
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
