import { Palette } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-teal-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-teal-400 to-cyan-400 p-2 rounded-lg">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">DoodleFlow</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              A simple drawing tool for everyone. No fuss, just fun.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-teal-300">App</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-teal-300 transition-colors">Features</a>
              <a href="#" className="block text-gray-400 hover:text-teal-300 transition-colors">How to Use</a>
              <a href="#" className="block text-gray-400 hover:text-teal-300 transition-colors">Gallery</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-teal-300">Help</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-teal-300 transition-colors">Support</a>
              <a href="#" className="block text-gray-400 hover:text-teal-300 transition-colors">Community</a>
              <a href="#" className="block text-gray-400 hover:text-teal-300 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
