
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calculator, Users, Calendar, MapPin, Utensils } from 'lucide-react';

const PriceCalculator = () => {
  const [guests, setGuests] = useState(50);
  const [eventType, setEventType] = useState('');
  const [menuType, setMenuType] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const eventTypes = [
    { value: 'wedding', label: 'Wedding', multiplier: 1.5 },
    { value: 'corporate', label: 'Corporate Event', multiplier: 1.2 },
    { value: 'birthday', label: 'Birthday Party', multiplier: 1.0 },
    { value: 'anniversary', label: 'Anniversary', multiplier: 1.3 },
    { value: 'festival', label: 'Festival Celebration', multiplier: 1.4 }
  ];

  const menuTypes = [
    { value: 'basic', label: 'Basic Menu', price: 200 },
    { value: 'premium', label: 'Premium Menu', price: 350 },
    { value: 'deluxe', label: 'Deluxe Menu', price: 500 },
    { value: 'custom', label: 'Custom Menu', price: 400 }
  ];

  const serviceTypes = [
    { value: 'pickup', label: 'Pickup', multiplier: 0.8 },
    { value: 'delivery', label: 'Delivery', multiplier: 1.0 },
    { value: 'fullservice', label: 'Full Service', multiplier: 1.5 }
  ];

  useEffect(() => {
    calculatePrice();
  }, [guests, eventType, menuType, serviceType, location]);

  const calculatePrice = () => {
    const selectedEvent = eventTypes.find(e => e.value === eventType);
    const selectedMenu = menuTypes.find(m => m.value === menuType);
    const selectedService = serviceTypes.find(s => s.value === serviceType);

    if (selectedEvent && selectedMenu && selectedService) {
      let basePrice = selectedMenu.price * guests;
      basePrice *= selectedEvent.multiplier;
      basePrice *= selectedService.multiplier;

      // Bulk discount
      if (guests > 100) basePrice *= 0.9;
      if (guests > 200) basePrice *= 0.85;

      setEstimatedPrice(Math.round(basePrice));
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-forest mb-4">Price Calculator</h2>
          <p className="text-xl text-gray-600">Get an instant estimate for your event</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gold/10 to-forest/10">
              <CardTitle className="flex items-center gap-2 text-2xl text-forest">
                <Calculator className="w-6 h-6" />
                Event Price Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold text-forest mb-3 block">
                      <Users className="w-4 h-4 inline mr-2" />
                      Number of Guests: {guests}
                    </Label>
                    <Slider
                      value={[guests]}
                      onValueChange={(value) => setGuests(value[0])}
                      max={500}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>10</span>
                      <span>500</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold text-forest mb-3 block">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Event Type
                    </Label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-semibold text-forest mb-3 block">
                      <Utensils className="w-4 h-4 inline mr-2" />
                      Menu Type
                    </Label>
                    <Select value={menuType} onValueChange={setMenuType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select menu type" />
                      </SelectTrigger>
                      <SelectContent>
                        {menuTypes.map((menu) => (
                          <SelectItem key={menu.value} value={menu.value}>
                            {menu.label} - ₹{menu.price}/person
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-semibold text-forest mb-3 block">
                      Service Type
                    </Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gold/20 to-forest/20 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold text-forest mb-4">Price Estimate</h3>
                    <div className="text-4xl font-bold text-gold mb-2">
                      ₹{estimatedPrice.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Estimated total for {guests} guests
                    </p>
                    
                    {guests > 100 && (
                      <div className="bg-green-100 border border-green-300 rounded p-3 mb-4">
                        <p className="text-green-700 text-sm">
                          🎉 Bulk discount applied! You save {guests > 200 ? '15%' : '10%'}
                        </p>
                      </div>
                    )}

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Per person rate:</span>
                        <span>₹{estimatedPrice ? Math.round(estimatedPrice / guests) : 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service charges:</span>
                        <span>Included</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%):</span>
                        <span>₹{Math.round(estimatedPrice * 0.18).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gold hover:bg-gold/90 text-white h-12 text-lg">
                    Get Detailed Quote
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    <p>💡 This is an estimate. Final pricing may vary based on specific requirements.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
