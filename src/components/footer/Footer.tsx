import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-restaurant-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold">NPGROUP</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your one-stop destination for restaurant dining, fresh bakery items, and premium decoration products.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* <Facebook className="h-5 w-5" /> */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* <Instagram className="h-5 w-5" /> */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* <Twitter className="h-5 w-5" /> */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* <Youtube className="h-5 w-5" /> */}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Restaurant</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bakery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Decoration</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                123 Main Street, City
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +1 234 567 890
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                info@npgroup.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2026 NPGROUP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};