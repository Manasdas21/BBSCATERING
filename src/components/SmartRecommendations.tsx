
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Calendar, ChefHat, Clock, MapPin, TrendingUp, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendBookingEmail } from '@/utils/emailService';
import { BookingFormData } from '@/types/forms';
import PackageBookingModal from './PackageBookingModal';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  category: string;
  bestFor: string[];
  popularityScore: number;
  seasonalDiscount?: number;
  estimatedTime: string;
  servingSize: string;
  dietaryTags: string[];
  performanceMetrics: {
    bookingRate: number;
    customerSatisfaction: number;
    repeatOrders: number;
  };
}

const SmartRecommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    id: string;
    title: string;
    price: number;
  } | null>(null);
  const { toast } = useToast();
  
  // Use a unique key for recommendations to prevent conflicts
  const [recommendations] = useState<Recommendation[]>([
    {
      id: 'smart-rec-1',
      title: 'Premium Wedding Package',
      description: 'Complete wedding catering with traditional Indian cuisine, desserts, and beverages. Perfect for grand celebrations.',
      price: 280,
      originalPrice: 320,
      rating: 4.9,
      category: 'Wedding',
      bestFor: ['Large gatherings', 'Traditional ceremonies', 'Multi-day events'],
      popularityScore: 95,
      seasonalDiscount: 12,
      estimatedTime: '4-6 hours',
      servingSize: '100-500 guests',
      dietaryTags: ['Vegetarian Options', 'Vegan Options', 'Gluten-Free'],
      performanceMetrics: {
        bookingRate: 87,
        customerSatisfaction: 4.9,
        repeatOrders: 73
      }
    },
    {
      id: 'smart-rec-2',
      title: 'Corporate Lunch Excellence',
      description: 'Professional catering optimized for business meetings and corporate events with quick service.',
      price: 220,
      rating: 4.7,
      category: 'Corporate',
      bestFor: ['Business meetings', 'Office parties', 'Professional events'],
      popularityScore: 89,
      estimatedTime: '2-3 hours',
      servingSize: '20-100 guests',
      dietaryTags: ['Quick Service', 'Healthy Options', 'International'],
      performanceMetrics: {
        bookingRate: 92,
        customerSatisfaction: 4.7,
        repeatOrders: 68
      }
    },
    {
      id: 'smart-rec-3',
      title: 'Birthday Celebration Special',
      description: 'Fun and festive menu perfect for birthday celebrations with customizable themes and decorations.',
      price: 250,
      originalPrice: 280,
      rating: 4.8,
      category: 'Birthday',
      bestFor: ['Family gatherings', 'Kids parties', 'Adult celebrations'],
      popularityScore: 82,
      seasonalDiscount: 11,
      estimatedTime: '3-4 hours',
      servingSize: '15-80 guests',
      dietaryTags: ['Kid-Friendly', 'Custom Themes', 'Dessert Focus'],
      performanceMetrics: {
        bookingRate: 85,
        customerSatisfaction: 4.8,
        repeatOrders: 71
      }
    },
    {
      id: 'smart-rec-4',
      title: 'Intimate Gathering Package',
      description: 'Curated menu for small, intimate events with premium ingredients and personalized service.',
      price: 320,
      rating: 4.9,
      category: 'Intimate',
      bestFor: ['Small gatherings', 'Anniversary', 'Family dinners'],
      popularityScore: 78,
      estimatedTime: '2-3 hours',
      servingSize: '5-25 guests',
      dietaryTags: ['Premium', 'Personalized', 'Gourmet'],
      performanceMetrics: {
        bookingRate: 91,
        customerSatisfaction: 4.9,
        repeatOrders: 81
      }
    }
  ]);

  const categories = ['all', 'Wedding', 'Corporate', 'Birthday', 'Intimate'];

  const getSmartRecommendations = () => {
    let filtered = recommendations;
    
    if (selectedCategory !== 'all') {
      filtered = recommendations.filter(rec => rec.category === selectedCategory);
    }

    // Sort by performance metrics and popularity
    return filtered.sort((a, b) => {
      const scoreA = (a.performanceMetrics.bookingRate * 0.4) + 
                    (a.performanceMetrics.customerSatisfaction * 20 * 0.3) + 
                    (a.popularityScore * 0.3);
      const scoreB = (b.performanceMetrics.bookingRate * 0.4) + 
                    (b.performanceMetrics.customerSatisfaction * 20 * 0.3) + 
                    (b.popularityScore * 0.3);
      return scoreB - scoreA;
    });
  };

  const handleChoosePackage = (packageId: string, packageTitle: string, packagePrice: number) => {
    console.log('SmartRecommendations: Choosing package', { packageId, packageTitle, packagePrice });
    setSelectedPackage({
      id: packageId,
      title: packageTitle,
      price: packagePrice
    });
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (formData: any) => {
    if (!selectedPackage) {
      console.error('SmartRecommendations: No package selected');
      return;
    }

    try {
      console.log('SmartRecommendations: Submitting booking with data:', formData);
      
      // Create booking data for email service
      const bookingData: BookingFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        location: formData.location || 'To be confirmed',
        eventType: selectedPackage.title,
        guestCount: formData.guestCount,
        message: `${formData.message}\n\nPackage Details:\n- Package: ${selectedPackage.title} (ID: ${selectedPackage.id})\n- Price per person: ₹${selectedPackage.price}\n- Estimated total: ₹${(parseFloat(formData.guestCount) * selectedPackage.price).toLocaleString()}\n\nThis is an automated booking from Smart Recommendations.`
      };

      console.log('SmartRecommendations: Sending email with booking data:', bookingData);

      // Send booking email to admin
      const emailSent = await sendBookingEmail(bookingData);
      
      console.log('SmartRecommendations: Email sent result:', emailSent);

      if (emailSent) {
        toast({
          title: "Package Booked Successfully!",
          description: `Your ${selectedPackage.title} package has been booked. We'll contact you within 24 hours to confirm details.`,
        });

        // Store selected package in sessionStorage with unique key
        sessionStorage.setItem('smartRecommendationsBooking', JSON.stringify({
          ...selectedPackage,
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          },
          eventDetails: formData,
          timestamp: new Date().toISOString()
        }));
      } else {
        toast({
          title: "Booking Request Received",
          description: "Your booking request has been recorded, but there was an issue with email notification. We'll still contact you soon.",
          variant: "destructive"
        });
      }

      setIsBookingModalOpen(false);
      setSelectedPackage(null);
    } catch (error) {
      console.error('SmartRecommendations: Package booking error:', error);
      toast({
        title: "Booking Error",
        description: "There was an issue processing your booking. Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };

  const handleCloseModal = () => {
    console.log('SmartRecommendations: Closing booking modal');
    setIsBookingModalOpen(false);
    setSelectedPackage(null);
  };

  const smartRecommendations = getSmartRecommendations();

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-cream via-white to-gold/5" id="smart-recommendations">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-gold mr-3" />
              <h2 className="text-4xl font-bold text-forest">Smart Recommendations</h2>
            </div>
            <p className="text-xl text-gray-600 mb-6">
              AI-powered suggestions based on performance data & customer preferences
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gold hover:bg-gold/90" : ""}
                >
                  {category === 'all' ? 'All Categories' : category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {smartRecommendations.map((rec, index) => (
              <Card key={rec.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-2 border-transparent hover:border-gold/20">
                <CardHeader className="bg-gradient-to-r from-gold/10 to-forest/10 relative">
                  {index === 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Top Pick
                    </Badge>
                  )}
                  {rec.seasonalDiscount && (
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                      {rec.seasonalDiscount}% OFF
                    </Badge>
                  )}
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-forest pr-4">{rec.title}</CardTitle>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-gold mr-1" />
                      <span className="font-bold">{rec.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {rec.servingSize}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {rec.estimatedTime}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 text-sm">{rec.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <ChefHat className="w-4 h-4 text-gold" />
                      <div className="flex items-center gap-2">
                        {rec.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">₹{rec.originalPrice}</span>
                        )}
                        <span className="text-lg font-bold text-forest">₹{rec.price}</span>
                        <span className="text-sm text-gray-600">per person</span>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <h5 className="text-xs font-semibold text-gray-700 mb-2">Performance Insights</h5>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-bold text-green-600">{rec.performanceMetrics.bookingRate}%</div>
                        <div className="text-gray-600">Booking Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-blue-600">{rec.performanceMetrics.customerSatisfaction}</div>
                        <div className="text-gray-600">Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-purple-600">{rec.performanceMetrics.repeatOrders}%</div>
                        <div className="text-gray-600">Repeat Orders</div>
                      </div>
                    </div>
                  </div>

                  {/* Dietary Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {rec.dietaryTags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-gold/10 text-gold border-gold/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-forest mb-2">Perfect For:</h4>
                    <div className="flex flex-wrap gap-1">
                      {rec.bestFor.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleChoosePackage(rec.id, rec.title, rec.price)}
                    className="w-full bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Choose This Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Smart Insights */}
          <div className="mt-12 bg-white p-6 rounded-xl shadow-lg border border-gold/20">
            <h3 className="text-2xl font-bold text-forest mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-gold" />
              Smart Insights
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">95%</div>
                <div className="text-gray-600">Customer Satisfaction Rate</div>
                <div className="text-sm text-gray-500">Based on 500+ recent bookings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">2.3x</div>
                <div className="text-gray-600">Faster Booking Process</div>
                <div className="text-sm text-gray-500">With AI recommendations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
                <div className="text-gray-600">Repeat Customer Rate</div>
                <div className="text-sm text-gray-500">Customers who book again</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Booking Modal */}
      {selectedPackage && (
        <PackageBookingModal
          isOpen={isBookingModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleBookingSubmit}
          packageTitle={selectedPackage.title}
          packagePrice={selectedPackage.price}
        />
      )}
    </>
  );
};

export default SmartRecommendations;
