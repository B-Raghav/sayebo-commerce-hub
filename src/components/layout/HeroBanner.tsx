
import { Button } from "@/components/ui/button";
import { ArrowDown, Star } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-gray-100 text-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to <span className="text-blue-600">Sayebo</span>
            </h1>
            <p className="text-xl mb-6 text-gray-700">
              Discover amazing products from trusted South African sellers
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg text-gray-600">Trusted by 10M+ customers</span>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Become a Seller
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 backdrop-blur-sm rounded-lg p-8 border border-gray-200 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-gray-800">🎉 Special Offer</div>
                <div className="text-xl mb-4 text-blue-600 font-semibold">Up to 70% OFF</div>
                <div className="text-sm text-gray-600">on selected items</div>
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
