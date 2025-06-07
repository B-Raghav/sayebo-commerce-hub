
import { Button } from "@/components/ui/button";
import { ArrowDown, Star } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to <span className="text-yellow-300">Sayebo</span>
            </h1>
            <p className="text-xl mb-6 opacity-90">
              Discover amazing products from trusted sellers worldwide
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
              <span className="text-lg">Trusted by 10M+ customers</span>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Become a Seller
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">🎉 Special Offer</div>
                <div className="text-xl mb-4">Up to 70% OFF</div>
                <div className="text-sm opacity-75">on selected items</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="text-center pb-4">
        <ArrowDown className="h-6 w-6 mx-auto animate-bounce opacity-75" />
      </div>
    </div>
  );
};

export default HeroBanner;
