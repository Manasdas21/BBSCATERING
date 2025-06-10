
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import EventsSection from '@/components/EventsSection';
import MenuGallery from '@/components/MenuGallery';
import PhotoGallery from '@/components/PhotoGallery';
import SmartRecommendations from '@/components/SmartRecommendations';
import PriceCalculator from '@/components/PriceCalculator';
import TestimonialsSection from '@/components/TestimonialsSection';
import EnhancedBookingExperience from '@/components/EnhancedBookingExperience';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LiveChatSupport from '@/components/LiveChatSupport';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <EventsSection />
      <MenuGallery />
      <PhotoGallery />
      <SmartRecommendations />
      <PriceCalculator />
      <TestimonialsSection />
      <EnhancedBookingExperience />
      <ContactSection />
      <Footer />
      <LiveChatSupport />
    </div>
  );
};

export default Index;
