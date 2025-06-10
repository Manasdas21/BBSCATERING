
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ContactButtons } from "./ContactButtons";
import { sendAdminNotification } from "@/utils/emailService";
import { ContactFormData } from "@/types/forms";
import { ChefHat, Calendar, MessageSquare, User } from "lucide-react";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData: ContactFormData = {
      name,
      phone,
      date,
      message,
    };

    try {
      // Send email notification to admin
      const emailSent = await sendAdminNotification(formData);
      
      // Show success or error toast
      toast({
        title: emailSent ? "Order Request Sent!" : "Request Received",
        description: emailSent 
          ? "We'll contact you shortly to confirm your order details." 
          : "Your order request has been received, but there was an issue sending the email notification.",
      });

      // Reset form if successful
      if (emailSent) {
        setName("");
        setPhone("");
        setDate("");
        setMessage("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your order request. Please try again.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-cream/20 to-gold/10 p-8 rounded-2xl shadow-2xl border border-gold/20 transform hover:scale-[1.02] transition-all duration-300">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gold/20 p-3 rounded-full mr-3">
            <ChefHat className="w-8 h-8 text-gold" />
          </div>
          <h3 className="text-3xl font-bold font-playfair text-forest">Contact Us to Place Your Order</h3>
        </div>
        <p className="text-gray-600 text-lg">
          Ready to experience our delicious catering? Let's make your event unforgettable!
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold/60 mx-auto mt-4 rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="flex items-center text-sm font-semibold text-forest mb-2">
              <User className="w-4 h-4 mr-2 text-gold" />
              Your Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="border-2 border-gold/20 focus:border-gold focus:ring-gold/20 rounded-lg h-12 transition-all duration-200"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="flex items-center text-sm font-semibold text-forest mb-2">
              <svg className="w-4 h-4 mr-2 text-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Phone Number
            </label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="Your contact number"
              required
              className="border-2 border-gold/20 focus:border-gold focus:ring-gold/20 rounded-lg h-12 transition-all duration-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="flex items-center text-sm font-semibold text-forest mb-2">
            <Calendar className="w-4 h-4 mr-2 text-gold" />
            Event Date
          </label>
          <Input
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            required
            className="border-2 border-gold/20 focus:border-gold focus:ring-gold/20 rounded-lg h-12 transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="flex items-center text-sm font-semibold text-forest mb-2">
            <MessageSquare className="w-4 h-4 mr-2 text-gold" />
            Order Details & Special Requests
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your event requirements, number of guests, preferred dishes, and any special requests..."
            className="min-h-[120px] border-2 border-gold/20 focus:border-gold focus:ring-gold/20 rounded-lg transition-all duration-200 resize-none"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full h-14 bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
              Sending Your Order Request...
            </>
          ) : (
            <>
              <ChefHat className="w-5 h-5 mr-2" />
              Send Order Request
            </>
          )}
        </Button>

        {/* Enhanced Contact Buttons */}
        <div className="pt-4 border-t border-gold/20">
          <p className="text-center text-sm text-gray-600 mb-4 font-medium">
            Or reach us directly for immediate assistance
          </p>
          <ContactButtons />
        </div>
      </form>

      {/* Trust Indicators */}
      <div className="mt-8 pt-6 border-t border-gold/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gold">50+</div>
            <div className="text-xs text-gray-600">Menu Items</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gold">24/7</div>
            <div className="text-xs text-gray-600">Support</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gold">100%</div>
            <div className="text-xs text-gray-600">Fresh Food</div>
          </div>
        </div>
      </div>
    </div>
  );
};
