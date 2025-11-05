import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Truck, RotateCcw, Headphones } from 'lucide-react';
import { useTypingAnimation } from '../hooks/useTypingAnimation';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: ['Elevate', 'Your'],
    subtitle: ['Style', 'Fashion', 'Look', 'Wardrobe'],
    description: 'Discover our curated collection of premium fashion pieces designed for the modern lifestyle.',
    cta: 'Shop Collection'
  },
  {
    id: 2,
    image: 'https://raw.githubusercontent.com/Solved-Overnight/arvana-clothing/refs/heads/main/img/background/bg4.jpg',
    title: ['New', 'Season'],
    subtitle: ['Arrivals', 'Collection', 'Trends', 'Styles'],
    description: 'Fresh styles and contemporary designs that define modern elegance and sophistication.',
    cta: 'Explore New'
  },
  {
    id: 3,
    image: 'https://raw.githubusercontent.com/Solved-Overnight/arvana-clothing/refs/heads/main/img/background/bg2.jpg',
    title: ['Premium'],
    subtitle: ['Quality', 'Luxury', 'Elegance', 'Craftsmanship'],
    description: 'Exceptional craftsmanship meets timeless design in every piece of our collection.',
    cta: 'Shop Premium'
  }
];

const ServiceHighlights = () => {
  const [currentService, setCurrentService] = useState(0);
  
  const services = [
    { icon: Truck, text: 'Free Shipping', color: 'bg-green-500' },
    { icon: RotateCcw, text: 'Easy Returns', color: 'bg-blue-500' },
    { icon: Headphones, text: '24/7 Support', color: 'bg-purple-500' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <div className="relative w-48 h-16 overflow-hidden">
      {services.map((service, index) => {
        const IconComponent = service.icon;
        const isActive = index === currentService;
        const isPrev = index === (currentService - 1 + services.length) % services.length;
        const isNext = index === (currentService + 1) % services.length;
        
        let translateClass = 'translate-x-full opacity-0';
        if (isActive) translateClass = 'translate-x-0 opacity-100';
        else if (isPrev) translateClass = '-translate-x-full opacity-0';
        
        return (
          <div
            key={index}
            className={`absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 transform transition-all duration-700 ease-in-out ${translateClass} hover:scale-105`}
          >
            <div className="flex items-center gap-3 text-white h-full">
              <div className={`w-3 h-3 ${service.color} rounded-full animate-pulse`}></div>
              <IconComponent className="h-4 w-4" />
              <span className="font-semibold text-sm whitespace-nowrap">{service.text}</span>
            </div>
          </div>
        );
      })}
      
      {/* Progress indicator */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {services.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentService ? 'bg-white scale-125' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Hero() {
  const { currentText: subtitleText } = useTypingAnimation({
    words: ['enjoy', 'explore', 'discover'],
    typingSpeed: 180,
    deletingSpeed: 120,
    pauseDuration: 2000
  });

  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-12 lg:py-0">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 z-10">
            {/* Badge */}
            <div className="inline-block">
              <span className="text-orange-600 font-semibold text-sm sm:text-base tracking-wider uppercase">BEST DESTINATIONS AROUND THE WORLD</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              Travel, <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">{subtitleText}</span>
                <span className="animate-pulse text-orange-400">|</span>
                <div className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
              </span><br />
              and live a new<br />
              and full life
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
              Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button
                onClick={() => {
                  const productsSection = document.getElementById('all-products');
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center group transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Find out more
              </button>

              <button className="flex items-center gap-3 text-gray-700 font-medium hover:text-orange-600 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                </div>
                <span>Play Demo</span>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-[600px] xl:h-[700px] flex items-center justify-center">
            {/* Decorative plane icons */}
            <div className="absolute top-20 right-20 animate-bounce" style={{ animationDuration: '3s' }}>
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
            <div className="absolute top-40 left-10 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
              <svg className="w-6 h-6 sm:w-10 sm:h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
            <div className="absolute bottom-32 right-32 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
              <svg className="w-7 h-7 sm:w-10 sm:h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>

            {/* Main Image */}
            <div className="relative z-10">
              <img
                src="https://raw.githubusercontent.com/Solved-Overnight/arvana-clothing/refs/heads/main/img/collections/home_woman_model.jpg"
                alt="Traveler with backpack"
                className="w-full h-auto max-w-md lg:max-w-lg xl:max-w-xl object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
