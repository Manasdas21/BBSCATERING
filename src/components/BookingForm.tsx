
import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Phone, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { sendBookingEmail, sendCustomerConfirmation } from '@/utils/emailService';
import { BookingFormData } from '@/types/forms';

const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    location: '',
    eventType: 'Wedding',
    guestCount: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email notification to admin with all booking details
      const adminEmailSent = await sendBookingEmail(formData);
      
      // Send confirmation email to customer
      const customerEmailSent = await sendCustomerConfirmation(formData);
      
      toast({
        title: "Booking Request Received",
        description: adminEmailSent 
          ? "Thank you for your inquiry. We'll contact you within 24 hours to discuss your event." 
          : "Your booking request has been received, but there was an issue with the email notification.",
      });
      
      if (customerEmailSent) {
        toast({
          title: "Confirmation Email Sent",
          description: "A confirmation email has been sent to your email address.",
        });
      }
      
      // Reset the form if email was sent successfully
      if (adminEmailSent) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          eventTime: '',
          location: '',
          eventType: 'Wedding',
          guestCount: '',
          message: '',
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your booking request. Please try again.",
        variant: "destructive",
      });
      console.error("Booking form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-16 md:py-24 bg-gray-50">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-heading">Book Your Event</h2>
          <p className="section-subheading mx-auto">
            Fill out the form below to start planning your perfect catered event
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Full Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">Phone Number*</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="eventDate" className="block mb-2 font-medium text-gray-700">Event Date*</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="eventTime" className="block mb-2 font-medium text-gray-700">Event Time*</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    id="eventTime"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="location" className="block mb-2 font-medium text-gray-700">Event Location*</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Event Address"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="eventType" className="block mb-2 font-medium text-gray-700">Event Type*</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate">Corporate Event</option>
                  <option value="Birthday">Birthday Party</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="guestCount" className="block mb-2 font-medium text-gray-700">Number of Guests*</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Estimated Guest Count"
                  />
                </div>
              </div>
            </div>
              
            <div className="mt-6">
              <label htmlFor="message" className="block mb-2 font-medium text-gray-700">Additional Information</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="Tell us more about your event, dietary requirements, or special requests..."
              ></textarea>
            </div>
              
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Submit Booking Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
