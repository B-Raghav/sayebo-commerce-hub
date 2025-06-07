
import { Button } from "@/components/ui/button";
import { ArrowDown, Star, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-blush-rose via-pink to-peach text-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-pink-600" />
              <span className="text-lg font-semibold text-pink-700">Women's Day Special</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to <span className="text-sa-blue">Sayebo</span>
            </h1>
            <p className="text-xl mb-6 text-gray-700">
              Celebrating South African women entrepreneurs and their amazing products
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg text-gray-600">Trusted by 100K+ South Africans</span>
            </div>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="bg-sa-blue hover:bg-sa-blue/90 text-white font-semibold"
                onClick={() => navigate('/products')}
              >
                Shop Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-sa-blue text-sa-blue hover:bg-sa-blue hover:text-white"
                onClick={() => navigate('/register?role=seller')}
              >
                Become a Seller
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-light-gold via-peach to-pink backdrop-blur-sm rounded-lg p-8 border border-pink-200 shadow-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Heart className="h-8 w-8 text-pink-600 fill-pink-600" />
                  <div className="text-3xl font-bold text-gray-800">Women's Day</div>
                </div>
                <div className="text-2xl mb-4 text-sa-blue font-bold">Up to 70% OFF</div>
                <div className="text-sm text-gray-600">on selected items from female entrepreneurs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="text-center pb-4">
        <ArrowDown className="h-6 w-6 mx-auto animate-bounce text-gray-400" />
      </div>
    </div>
  );
};

export default HeroBanner;
