
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Bride",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      quote: "DelishDine Catering exceeded our expectations for our wedding. The food was exquisite, and the service was impeccable. Our guests are still raving about the menu!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Corporate Event Planner",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      quote: "We've used DelishDine for multiple corporate events, and they consistently deliver exceptional quality. Their attention to detail and professionalism make them our go-to caterer.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Birthday Celebration Host",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      quote: "The themed menu DelishDine created for my 40th birthday was phenomenal. They captured the exact vibe I wanted and made the evening truly special.",
      rating: 5
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Anniversary Party",
      image: "https://randomuser.me/api/portraits/men/22.jpg", 
      quote: "From planning to execution, working with DelishDine was a pleasure. They helped us create a memorable anniversary celebration with outstanding food and presentation.",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      handleNext();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      handlePrev();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-forest text-white">
      <div className="container-section">
        <div className="text-center mb-16">
          <h2 className="section-heading text-white">What Our Clients Say</h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full px-4"
                >
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 border-2 border-gold">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                      ))}
                    </div>
                    
                    <blockquote className="text-lg italic mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div>
                      <p className="font-bold text-xl">{testimonial.name}</p>
                      <p className="text-gold">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handlePrev}
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-gold w-6" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
