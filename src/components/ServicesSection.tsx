
import React from 'react';
import { Utensils, Users, GlassWater, ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  className 
}: { 
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl border-b-4 border-gold hover:-translate-y-1", 
      className
    )}>
      <div className="bg-cream w-16 h-16 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gold" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Buffet Service",
      description: "A versatile and economical option perfect for larger gatherings, offering a wide variety of dishes beautifully presented.",
      icon: Utensils
    },
    {
      title: "Plated Service",
      description: "Elegant, formal dining experience with professionally served multi-course meals for a sophisticated touch.",
      icon: Users
    },
    {
      title: "Cocktail Reception",
      description: "Interactive food stations and passed hors d'oeuvres, ideal for networking events and social gatherings.",
      icon: GlassWater
    },
    {
      title: "Themed Cuisine",
      description: "Specialized menus inspired by global cuisines, from Mediterranean to Asian fusion, tailored to your preferences.",
      icon: ChefHat
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="container-section">
        <div className="text-center mb-16">
          <h2 className="section-heading">Our Services</h2>
          <p className="section-subheading mx-auto">
            We offer a variety of catering services tailored to meet your specific needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              className={`animate-fade-in`}
              // Removed the style prop since it's not defined in the component props
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-playfair font-bold mb-6">Custom Catering Solutions</h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Don't see what you're looking for? We specialize in creating custom catering packages tailored to your specific event needs. Contact us to discuss your vision, and we'll design a unique culinary experience for your guests.
          </p>
          <a href="#booking" className="btn-secondary">
            Request Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
