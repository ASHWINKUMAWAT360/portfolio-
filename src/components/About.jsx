import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo, aboutData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Cpu, Code2, Zap, GraduationCap, MapPin, Building, Mail, Sparkles, ExternalLink } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const getPillarIcon = (icon) => {
    switch (icon) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Code': return <Code2 className="w-6 h-6 text-purple-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-emerald-400" />;
      default: return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Discover My Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            A look into who I am, my academic background, and what fuels my passion for software, AI, and digital innovation.
          </p>
        </motion.div>

        {/* Top Grid: Hologram Card & Bio */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: 3D Holographic Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[360px]">
              
              {/* Outer Orbit Rings */}
              <div className="absolute -inset-4 rounded-3xl border border-cyan-500/20 animate-spin-slow pointer-events-none" />
              <div className="absolute -inset-8 rounded-3xl border border-purple-500/15 animate-spin-reverse pointer-events-none" />

              {/* Holographic Card Container */}
              <div className="relative glass-card rounded-3xl p-8 border border-white/10 text-center overflow-hidden shadow-2xl">
                
                {/* Glowing backdrop gradient */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/20 via-purple-500/10 to-transparent pointer-events-none" />

                {/* Avatar Icon */}
                <div className="relative mx-auto w-28 h-28 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-0.5 shadow-neon-cyan mb-6">
                  <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl font-black gradient-text">AK</span>
                  </div>
                  {/* Floating active pill */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono text-emerald-300 flex items-center gap-1 shadow-sm whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Learning &amp; Building</span>
                  </div>
                </div>

                {/* Name & Academic Title */}
                <h3 className="text-2xl font-black text-white mb-1">{personalInfo.name}</h3>
                <p className="text-cyan-400 font-medium text-sm mb-4">{personalInfo.role}</p>
                
                <div className="h-px w-full bg-slate-800 my-4" />

                {/* Quick Academic details */}
                <div className="space-y-3 text-left text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Building className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>{personalInfo.college}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <GraduationCap className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>B.Tech in Engineering</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-cyan-500/10 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 text-xs font-semibold text-slate-300 transition-all duration-200"
                    onClick={() => sound.playClick()}
                  >
                    <span>View GitHub Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Introduction */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-block px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4 w-fit">
              Student • Developer • Technologist
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-5 leading-snug">
              Transforming Curiosity into Functional, Intelligent Software.
            </h3>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 text-cyan-200/90 font-medium">
                &ldquo;{aboutData.intro}&rdquo;
              </p>

              {aboutData.extendedBio.map((paragraph, idx) => (
                <p key={idx} className="text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick highlight tags */}
            <div className="flex flex-wrap gap-2 pt-6">
              {[
                'Full-Stack Exploration',
                'AI Model Prompting',
                'WebGL & 3D Web',
                'Student Workflow Systems',
                'Python & JS Architecture',
                'Collaborative Problem Solving'
              ].map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs font-medium text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Grid: 3 Pillars of Focus */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-white">Core Focus Areas</h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">The primary disciplines directing my projects and studies</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {aboutData.pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden group transition-all"
                onMouseEnter={() => sound.playHover()}
              >
                {/* Glow accent bar */}
                <div className={`h-1 w-12 rounded-full mb-5 ${
                  pillar.accent === 'cyan' ? 'bg-cyan-400' :
                  pillar.accent === 'purple' ? 'bg-purple-400' : 'bg-emerald-400'
                }`} />

                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/70 group-hover:scale-110 transition-transform">
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-[11px] font-mono text-slate-400 border border-slate-700">
                    {pillar.badge}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
