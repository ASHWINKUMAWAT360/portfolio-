import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ArrowUp, Mail, Heart, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

export default function Footer() {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Education', id: 'education' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80 items-start">
          
          {/* Brand & Introduction */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-0.5 shadow-neon-cyan">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-black gradient-text text-xs tracking-wider">AK</span>
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                {personalInfo.name}
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {personalInfo.headline} at <span className="text-cyan-400 font-medium">{personalInfo.college}</span>, Jaipur, India.
              Crafting interactive 3D web experiences, artificial intelligence tools, and digital productivity workflows.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/40 text-slate-400 hover:text-white transition-colors"
                title="GitHub"
                onClick={() => sound.playClick()}
              >
                <FaGithub className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-400/40 text-slate-400 hover:text-purple-300 transition-colors"
                title="LinkedIn"
                onClick={() => sound.playClick()}
              >
                <FaLinkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-300 transition-colors"
                title="Email"
                onClick={() => sound.playClick()}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    sound.playClick();
                    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left text-slate-400 hover:text-cyan-300 transition-colors py-1 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack & Back to Top */}
          <div className="md:col-span-3 space-y-4 md:text-right flex flex-col md:items-end">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Engineering Stack</h4>
            <div className="flex flex-wrap md:justify-end gap-1.5 max-w-xs">
              {['React', 'Three.js', 'Vite', 'Tailwind CSS', 'WebGL', 'Framer Motion', 'Web Audio API'].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 text-xs font-semibold transition-all cursor-pointer shadow-md"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-slate-400 font-semibold">{personalInfo.name}</strong>. Built for innovation.
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <span>Designed &amp; Developed with</span>
            <span className="text-cyan-400">3D WebGL</span>
            <span>&amp; Modern Standards</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
