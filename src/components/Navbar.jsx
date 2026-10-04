import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';
import { personalInfo } from '../data/portfolioData';
import { Volume2, VolumeX, Menu, X, Terminal } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Education', id: 'education' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Achievements', id: 'achievements' },
  { name: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll Spy to highlight active section
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    sound.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    sound.enabled = nextState;
    setSoundEnabled(nextState);
    if (nextState) {
      sound.playSuccess();
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer select-none group"
            onClick={() => scrollTo('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-0.5 shadow-neon-cyan group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-black gradient-text text-sm tracking-wider">AK</span>
              </div>
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-white font-bold text-sm tracking-tight block">
                {personalInfo.name}
              </span>
              <span className="text-cyan-400 text-[10px] font-mono tracking-wider block">
                AI &amp; Tech Enthusiast
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 p-1.5 rounded-full bg-slate-900/70 border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-neon-cyan'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Right Header Utilities: Sound FX Toggle, Social Links, and Mobile Menu */}
          <div className="flex items-center space-x-3">
            
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 cursor-pointer ${
                soundEnabled
                  ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-400 shadow-neon-cyan'
                  : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title={soundEnabled ? 'Disable synthesized sound FX' : 'Enable synthesized sound FX'}
              aria-label="Toggle sound FX"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span className="hidden md:inline font-mono text-[10px]">SFX ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span className="hidden md:inline font-mono text-[10px]">SFX OFF</span>
                </>
              )}
            </button>

            {/* Quick GitHub Icon Link */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors hidden sm:flex cursor-pointer"
              title="GitHub Profile"
              onClick={() => sound.playClick()}
            >
              <FaGithub className="w-4 h-4" />
            </a>

            {/* Quick LinkedIn Icon Link */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-purple-400 transition-colors hidden sm:flex cursor-pointer"
              title="LinkedIn Profile"
              onClick={() => sound.playClick()}
            >
              <FaLinkedin className="w-4 h-4" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="lg:hidden p-2.5 rounded-xl border border-slate-800 bg-slate-900/90 text-white cursor-pointer hover:bg-slate-800 transition-colors"
              onClick={() => {
                setIsOpen(!isOpen);
                sound.playClick();
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="px-4 py-5 space-y-2 max-w-md mx-auto">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-slate-950" />}
                  </button>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-around">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
                  onClick={() => sound.playClick()}
                >
                  <FaGithub className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-purple-400"
                  onClick={() => sound.playClick()}
                >
                  <FaLinkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400"
                  onClick={() => sound.playClick()}
                >
                  <Terminal className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
