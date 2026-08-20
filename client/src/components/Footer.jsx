import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Glass background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/10 backdrop-blur-xl"></div>
      
      {/* Gradient border */}
      <div className="absolute inset-0 border-t border-white/40"></div>
      
      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Name */}
          <div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <img 
  src="/bulb.png" 
  alt="AI Code Intelligence" 
  className="w-6 h-6 object-contain" 
/>
            </div>
            <div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Code Intelligence
              </h3>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Built with</span>
            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-white/50 backdrop-blur-sm text-gray-700 border border-white/40">
                ML [Python]
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-white/50 backdrop-blur-sm text-gray-700 border border-white/40">
                Vite
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-white/50 backdrop-blur-sm text-gray-700 border border-white/40">
                React
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-white/50 backdrop-blur-sm text-gray-700 border border-white/40">
                Flask
              </span>
            </div>
          </div>

          {/* Version */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">v2.0.0</span>
            <span className="text-xs text-gray-300">•</span>
            <span className="text-xs text-gray-400">© {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;