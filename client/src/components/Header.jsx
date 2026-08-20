import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiInfo, FiGithub, FiCode, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const navItems = [
  { name: 'Analyzer', icon: FiCode, id: 'analyzer', type: 'scroll' },
  { name: 'About', icon: FiInfo, id: 'about', type: 'scroll' },
  { name: 'GitHub', icon: FiGithub, path: 'https://github.com/dharshithdev/AI-Code-Intelligence.git', type: 'external' },
];

const handleNavClick = (item) => {
  setIsOpen(false);
  
  // If it's an external link (GitHub)
  if (item.type === 'external') {
    window.open(item.path, '_blank');
    return;
  }
  
  // If it's a scroll link (Analyzer, About)
  if (location.pathname === '/') {
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
};

  return (
    <>
      <header className={`
        fixed top-4 lg:top-6 left-1/2 transform -translate-x-1/2 
        w-[92%] lg:w-[85%] max-w-7xl
        bg-white/70 backdrop-blur-xl 
        border border-white/40 
        rounded-2xl lg:rounded-[2rem] 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.08)]
        z-[100] 
        px-4 lg:px-6 
        py-2 lg:py-3 
        flex justify-between items-center 
        transition-all duration-500
        ${isScrolled ? 'shadow-2xl bg-white/90' : ''}
      `}>
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
<div className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">              <img 
                src="/bulb.png" 
                alt="AI" 
                className="w-5 h-5 lg:w-6 lg:h-6 object-contain" 
              />
            </div>
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
              AI Code<span className="text-transparent">.</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-widest hidden sm:block -mt-1">
              INTELLIGENCE
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-1 text-sm font-semibold text-slate-600">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <button 
                    onClick={() => handleNavClick(item)} 
                    className="group relative px-4 py-2.5 rounded-full hover:text-blue-600 transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <Icon size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-3">
            <Link 
              to="/" 
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <FiUserPlus size={16} />
              <span>Get Started</span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-slate-700 hover:text-blue-600 hover:shadow-lg transition-all duration-300"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] md:hidden transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsOpen(false)} 
        />
        
        {/* Menu Panel */}
        <div className={`
          absolute top-[4.5rem] left-1/2 transform -translate-x-1/2 
          w-[92%] 
          bg-white/95 backdrop-blur-xl 
          rounded-2xl 
          p-4 
          shadow-2xl 
          border border-white/40
          transition-all duration-500 
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}
        `}>
          <nav>
            <ul className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <button 
                      onClick={() => handleNavClick(item)} 
                      className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-md font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300 group"
                    >
                      <Icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                );
              })}
              
              <li className="pt-2 border-t border-slate-100 flex flex-col gap-2 mt-2">
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-md font-semibold text-slate-500 hover:bg-slate-50 transition-all duration-300"
                >
                  <FiLogIn size={18} />
                  <span>Log In</span>
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-md font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                  <FiUserPlus size={18} />
                  <span>Get Started</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;