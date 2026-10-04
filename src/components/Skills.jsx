import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { skillsData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Code2, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

const categories = ['All', 'Web Development', 'Programming', 'AI & Data', 'Productivity'];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const filteredSkills = selectedCategory === 'All'
    ? skillsData
    : skillsData.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            A comprehensive overview of the programming languages, artificial intelligence tools, and developer workflows I actively leverage.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                sound.playClick();
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-neon-cyan'
                  : 'bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredSkills.map((skill, i) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onMouseEnter={() => sound.playHover()}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-cyan-400/40 relative flex flex-col justify-between group shadow-lg"
              >
                {/* Glowing top line */}
                <div className={`h-1 w-10 rounded-full bg-gradient-to-r ${skill.color} mb-5`} />

                <div>
                  {/* Icon & Level Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 text-[11px] font-mono text-cyan-300 border border-slate-700">
                      {skill.tag}
                    </span>
                  </div>

                  {/* Skill Name & Category */}
                  <h3 className="text-lg font-black text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3 font-mono">{skill.category}</p>

                  {/* Description */}
                  <p className="text-slate-300 text-xs leading-relaxed mb-5">
                    {skill.description}
                  </p>
                </div>

                {/* Proficiency Progress Bar */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400 font-medium">{skill.level}</span>
                    <span className="text-cyan-400 font-mono font-bold">{skill.percentage}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.percentage}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Skills Summary Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 glass rounded-2xl p-6 border border-white/10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Full-Stack &amp; AI Engineering Ready</h4>
              <p className="text-xs text-slate-400">Constantly upgrading technical competencies with new projects and industry tools.</p>
            </div>
          </div>
          <a
            href="#projects"
            onClick={() => sound.playClick()}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-slate-700 whitespace-nowrap transition-colors"
          >
            See Them in Action →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
