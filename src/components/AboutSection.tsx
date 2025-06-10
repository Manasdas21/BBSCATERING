
import React from 'react';
import { Clock, Users, Award } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="bg-cream py-16 md:py-24">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-heading">About Us</h2>
          <p className="section-subheading mx-auto">
            Crafting exceptional culinary experiences for over a decade
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-forest">Our Story</h3>
            <p className="text-gray-700">
              DelishDine Catering was founded in 2010 with a simple mission: to create memorable dining experiences through exceptional food and impeccable service. Our team of culinary experts brings creativity and passion to every event, ensuring that each meal is a delightful experience for all your guests.
            </p>
            <p className="text-gray-700">
              From intimate gatherings to grand celebrations, we specialize in catering weddings, corporate events, and private parties. We believe that great food brings people together, and we're dedicated to making your special occasions truly unforgettable.
            </p>
            
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-gold" />
                </div>
                <h4 className="font-bold">10+ Years</h4>
                <p className="text-sm text-gray-600">Experience</p>
              </div>
              <div className="text-center">
                <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-gold" />
                </div>
                <h4 className="font-bold">1000+</h4>
                <p className="text-sm text-gray-600">Events</p>
              </div>
              <div className="text-center">
                <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-gold" />
                </div>
                <h4 className="font-bold">15+</h4>
                <p className="text-sm text-gray-600">Awards</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in-right">
            <img 
              src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070" 
              alt="Professional chefs at work" 
              className="rounded-lg shadow-xl object-cover h-[500px] w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg md:max-w-[250px]">
              <p className="text-forest font-playfair font-bold text-lg">"We believe food is an art form that brings joy to life's special moments."</p>
              <p className="text-right text-gold font-medium mt-2">- Executive Chef</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
