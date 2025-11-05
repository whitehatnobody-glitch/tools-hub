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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const currentSlideData = heroSlides[currentSlide];
  
  const { currentText: subtitleText } = useTypingAnimation({ 
    words: currentSlideData.subtitle,
    typingSpeed: 180,
    deletingSpeed: 120,
    pauseDuration: 2000
  });


  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative bg-gray-900 text-white h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={`${slide.title} ${slide.subtitle}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent" />
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block mb-2">{slide.title.join(' ')}</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    {subtitleText}
                    <span className="animate-pulse text-pink-400">|</span>
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mt-6 mb-8">
                  {slide.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      const productsSection = document.getElementById('all-products');
                      if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                  
                  <button 
                    onClick={() => {
                      const productsSection = document.getElementById('all-products');
                      if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                  >
                    New Arrivals
                  </button>
                </div>
              </div>
            </div>
            
            {/* Service Highlights - Top Right */}
            <div className="absolute top-8 right-8 hidden lg:block">
              <ServiceHighlights />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125 shadow-xl ring-4 ring-white/30'
                : 'bg-white/50 hover:bg-white/80 hover:scale-110'
            }`}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-60 right-40 w-8 h-8 bg-pink-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
        <div className="flex items-center gap-8 text-white">
          <div className="text-center">
            <div className="text-2xl font-bold">10K+</div>
            <div className="text-sm opacity-80">Happy Customers</div>
          </div>
          <div className="w-px h-8 bg-white/30"></div>
          <div className="text-center">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm opacity-80">Premium Products</div>
          </div>
          <div className="w-px h-8 bg-white/30"></div>
          <div className="text-center">
            <div className="text-2xl font-bold">4.9★</div>
            <div className="text-sm opacity-80">Customer Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}
