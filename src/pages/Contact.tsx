
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/layout/Navbar';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-rose to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Have questions or need support? We're here to help you succeed on Sayebo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-pink-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-pink-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="border-pink-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="border-pink-300"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-sa-blue hover:bg-sa-blue/90"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-sa-blue mt-1" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-600">support@sayebo.co.za</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-sa-blue mt-1" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-gray-600">+27 11 123 4567</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-sa-blue mt-1" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-gray-600">
                      123 Nelson Mandela Square<br />
                      Sandton, Johannesburg<br />
                      South Africa, 2196
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-sa-blue mt-1" />
                  <div>
                    <div className="font-medium">Business Hours</div>
                    <div className="text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Categories */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle>How Can We Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">For Buyers:</div>
                  <div className="text-gray-600">Order issues, product questions, returns</div>
                </div>
                
                <div className="text-sm">
                  <div className="font-medium text-gray-900">For Sellers:</div>
                  <div className="text-gray-600">Account setup, product listing, payments</div>
                </div>
                
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Technical Support:</div>
                  <div className="text-gray-600">Website issues, app problems</div>
                </div>
                
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Partnerships:</div>
                  <div className="text-gray-600">Business collaborations, wholesale inquiries</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-pink-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How do I become a seller?</h3>
                <p className="text-gray-600 text-sm">
                  Click "Become a Seller" on our homepage, register with your details, and start listing your products. 
                  We'll guide you through the process.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-pink-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What are the seller fees?</h3>
                <p className="text-gray-600 text-sm">
                  We charge a small commission on successful sales to maintain the platform. 
                  No upfront fees or monthly charges.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-pink-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How do returns work?</h3>
                <p className="text-gray-600 text-sm">
                  We have a 14-day return policy for most items. Contact the seller directly 
                  or reach out to our support team for assistance.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-pink-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Is my payment secure?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, we use industry-standard encryption and secure payment processors 
                  to protect your financial information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
