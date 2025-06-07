
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-rose to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-sa-blue">Sayebo</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Celebrating Women's Day every day by empowering South African women entrepreneurs 
            and connecting them with customers who value quality, authenticity, and community.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Sayebo was born from a simple belief: that South African women have incredible 
                talents and stories to share with the world. Our platform celebrates the spirit 
                of Ubuntu - the interconnectedness of humanity - by creating a marketplace where 
                women entrepreneurs can thrive.
              </p>
              <p>
                From handcrafted jewelry in the townships of Cape Town to traditional textiles 
                in rural KwaZulu-Natal, every product on Sayebo tells a story of resilience, 
                creativity, and cultural pride.
              </p>
              <p>
                We're more than just an e-commerce platform - we're a community that believes 
                in the power of women to transform their lives, their families, and their communities 
                through entrepreneurship.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600" 
              alt="South African women entrepreneurs"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Empowerment</h3>
                <p className="text-gray-600 text-sm">
                  Supporting women to build sustainable businesses and achieve financial independence.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-sa-blue mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600 text-sm">
                  Building connections between entrepreneurs and customers across South Africa.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-sa-green mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Quality</h3>
                <p className="text-gray-600 text-sm">
                  Promoting authentic, high-quality products that reflect South African craftsmanship.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Heritage</h3>
                <p className="text-gray-600 text-sm">
                  Celebrating and preserving South African culture through traditional and modern products.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-white rounded-lg p-8 border border-pink-200 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sa-blue mb-2">1,200+</div>
              <div className="text-gray-600">Women Entrepreneurs Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">15,000+</div>
              <div className="text-gray-600">Products Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sa-green mb-2">R2.3M</div>
              <div className="text-gray-600">Revenue Generated for Sellers</div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center bg-gradient-to-r from-pink to-peach rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-800 max-w-4xl mx-auto leading-relaxed">
            "To create a thriving marketplace where South African women entrepreneurs can showcase 
            their talents, share their stories, and build successful businesses while preserving 
            and celebrating our rich cultural heritage."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
