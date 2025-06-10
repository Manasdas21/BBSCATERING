
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2940')"
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-playfair">
            Welcome to <span className="text-gold">BBS Catering</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto">
            Exceptional catering services for weddings, corporate events, and private parties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#booking" className="btn-primary">
              Book Your Event <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#services" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-md font-medium transition-all duration-200 inline-flex items-center gap-2">
              Explore Our Services
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
