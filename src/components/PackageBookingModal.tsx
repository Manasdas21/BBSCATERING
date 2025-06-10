
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, User, Mail, Phone, Users, Clock } from 'lucide-react';

interface PackageBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  packageTitle: string;
  packagePrice: number;
}

const PackageBookingModal: React.FC<PackageBookingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  packageTitle,
  packagePrice
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '18:00',
    guestCount: '',
    location: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required';
    if (!formData.guestCount) newErrors.guestCount = 'Guest count is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-forest flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-gold" />
            Book {packageTitle}
          </DialogTitle>
          <p className="text-gray-600">
            Complete your booking for ₹{packagePrice} per person
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-forest border-b border-gold/20 pb-2">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="guestCount" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Number of Guests *
                </Label>
                <Input
                  id="guestCount"
                  type="number"
                  min="1"
                  value={formData.guestCount}
                  onChange={(e) => handleInputChange('guestCount', e.target.value)}
                  placeholder="50"
                  className={errors.guestCount ? 'border-red-500' : ''}
                />
                {errors.guestCount && <p className="text-red-500 text-sm mt-1">{errors.guestCount}</p>}
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-forest border-b border-gold/20 pb-2">
              Event Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Event Date *
                </Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange('eventDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={errors.eventDate ? 'border-red-500' : ''}
                />
                {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
              </div>

              <div>
                <Label htmlFor="eventTime" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Event Time
                </Label>
                <Input
                  id="eventTime"
                  type="time"
                  value={formData.eventTime}
                  onChange={(e) => handleInputChange('eventTime', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Event Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Enter venue address or 'To be confirmed'"
              />
            </div>

            <div>
              <Label htmlFor="message">Special Requirements</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Any special dietary requirements, decorations, or other requests..."
                rows={3}
              />
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-gradient-to-r from-gold/10 to-forest/10 p-4 rounded-lg">
            <h4 className="font-semibold text-forest mb-2">Booking Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Package:</span>
                <span className="font-medium">{packageTitle}</span>
              </div>
              <div className="flex justify-between">
                <span>Price per person:</span>
                <span className="font-medium text-gold">₹{packagePrice}</span>
              </div>
              {formData.guestCount && (
                <div className="flex justify-between font-semibold border-t pt-1 mt-2">
                  <span>Estimated Total:</span>
                  <span className="text-gold">₹{(parseFloat(formData.guestCount) * packagePrice).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70"
            >
              Confirm Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PackageBookingModal;
