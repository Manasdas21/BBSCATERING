
import { Phone, MessageCircle, Clock, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const ContactButtons = () => {
  const phoneNumber = "9611906084";
  
  return (
    <div className="space-y-4">
      {/* Primary Contact Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={() => window.location.href = `tel:${phoneNumber}`}
          className="flex items-center justify-center gap-3 h-12 bg-gradient-to-r from-forest to-forest/80 hover:from-forest/90 hover:to-forest/70 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex-1"
        >
          <Phone className="h-5 w-5" />
          Call Us Now
        </Button>
        <Button 
          onClick={() => window.location.href = `https://wa.me/91${phoneNumber}`}
          className="flex items-center justify-center gap-3 h-12 bg-gradient-to-r from-[#25D366] to-[#25D366]/80 hover:from-[#25D366]/90 hover:to-[#25D366]/70 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex-1"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp Us
        </Button>
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-gold/10 to-forest/10 p-4 rounded-xl border border-gold/20">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-forest">
            <Clock className="w-4 h-4 text-gold" />
            <span className="font-medium">Quick Response</span>
          </div>
          <div className="flex items-center gap-2 text-forest">
            <MapPin className="w-4 h-4 text-gold" />
            <span className="font-medium">Home Delivery</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">
          We respond within 30 minutes during business hours
        </p>
      </div>
    </div>
  );
};
