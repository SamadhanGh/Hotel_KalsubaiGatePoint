import React from 'react';
import { Mountain, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hotel Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Mountain className="h-8 w-8 text-amber-500" />
              <h3 className="text-xl font-bold">Hotel Kalsubai Gate Point</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Experience the beauty of Kalsubai Peak with our comfortable accommodation and delicious food.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-amber-500" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-amber-500" />
                <span className="text-gray-300">info@hotelkalsubai.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-amber-500" />
                <span className="text-gray-300">Kalsubai Peak, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/menu" className="block text-gray-300 hover:text-amber-500 transition-colors">Menu</a>
              <a href="/gallery" className="block text-gray-300 hover:text-amber-500 transition-colors">Gallery</a>
              <a href="/facilities" className="block text-gray-300 hover:text-amber-500 transition-colors">Facilities</a>
              <a href="/blog" className="block text-gray-300 hover:text-amber-500 transition-colors">Blog</a>
              <a href="/contact" className="block text-gray-300 hover:text-amber-500 transition-colors">Contact</a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-gray-300">24/7 Open</span>
              </div>
              <p className="text-gray-300 text-sm">
                Restaurant: 6:00 AM - 10:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Hotel Kalsubai Gate Point. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;