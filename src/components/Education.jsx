import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { educationData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { GraduationCap, Building, Calendar, MapPin, BookOpen, CheckCircle, Sparkles } from 'lucide-react';

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="section-padding relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300 mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            My <span className="gradient-text">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Formal university engineering education paired with rigorous independent research and technology development.
          </p>
        </motion.div>

        {/* Main University Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-14"
        >
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
            
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />
            
            {/* University & Degree Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-slate-800">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 shadow-lg text-cyan-400">
                  <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>{educationData.status}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">
                    {educationData.degree}
                  </h3>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-slate-300">
                    <span className="flex items-center gap-1 font-semibold text-cyan-400">
                      <Building className="w-4 h-4 text-cyan-400" />
                      {educationData.college}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      {educationData.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Year badge */}
              <div className="flex items-center gap-2 self-start px-4 py-2 rounded-2xl bg-slate-800/90 border border-slate-700/80 text-cyan-300 font-mono text-xs sm:text-sm shadow-sm whitespace-nowrap">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{educationData.duration}</span>
              </div>
            </div>

            {/* Program Description */}
            <div className="py-6 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>{educationData.description}</p>
            </div>

            {/* Academic Highlights */}
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Academic Focus Points</span>
              </h4>
              <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive engineering curriculum covering core computing &amp; algorithm design</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Hands-on experimentation with modern artificial intelligence &amp; web software</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Relevant Learning Areas Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>Relevant Learning Areas</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Key academic &amp; self-driven engineering disciplines being mastered
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {educationData.learningAreas.map((area, i) => (
              <motion.div
                key={area.title}
                whileHover={{ y: -4 }}
                onMouseEnter={() => sound.playHover()}
                className="glass-card rounded-2xl p-5 border border-white/10 hover:border-cyan-500/40 relative flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                      {area.tag}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">0{i + 1}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {area.title}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {area.desc}
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-cyan-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Active Study</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
