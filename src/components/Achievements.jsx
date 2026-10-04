import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { achievementsData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Trophy, Award, BookOpen, Code, Sparkles, PlusCircle, CheckCircle, Calendar, Building, HelpCircle } from 'lucide-react';

const categoryTabs = ['All', 'Certifications', 'Hackathons', 'Courses', 'Awards', 'Other achievements'];

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddInfo, setShowAddInfo] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const filteredCategories = selectedCategory === 'All'
    ? achievementsData
    : achievementsData.filter(cat => cat.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="achievements" className="section-padding relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-amber-300 mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Milestones &amp; Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Honors &amp; <span className="gradient-text">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            A growing portfolio of certified competencies, hackathon challenges, specialized courses, and engineering milestones.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categoryTabs.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                sound.playClick();
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Category Blocks */}
        <motion.div layout className="space-y-8">
          <AnimatePresence>
            {filteredCategories.map((group, groupIdx) => (
              <motion.div
                layout
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: groupIdx * 0.1 }}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                      {group.icon}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {group.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-400">
                        Category: {group.category}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-cyan-300 border border-slate-700 hidden sm:inline-block">
                    {group.badge}
                  </span>
                </div>

                {/* Items in this category */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.items.map((item, itemIdx) => (
                    <motion.div
                      key={itemIdx}
                      whileHover={{ y: -4 }}
                      onMouseEnter={() => sound.playHover()}
                      className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${
                            item.status === 'Completed' || item.status === 'Launched'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                          }`}>
                            {item.status}
                          </span>
                          <span className="text-slate-500 font-mono text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            {item.year}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                          {item.title}
                        </h4>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                          <Building className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                          <span className="truncate">{item.issuer}</span>
                        </div>

                        <p className="text-slate-300 text-xs leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1 text-[11px] text-slate-500">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Verified Profile Milestone</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Future Expansion / How to Add Milestones Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl glass border border-slate-800 text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex-shrink-0">
              <PlusCircle className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-center sm:text-left">
              <span className="font-semibold text-white block">Continuous Milestone Expansion</span>
              <span className="text-slate-400 text-xs">
                As I earn new certifications, compete in hackathons, or finish courses, they are cleanly cataloged right here in real time.
              </span>
            </div>
            <button
              onClick={() => {
                setShowAddInfo(!showAddInfo);
                sound.playClick();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs border border-slate-700 whitespace-nowrap cursor-pointer transition-colors"
            >
              {showAddInfo ? 'Hide Guide' : 'How to Add'}
            </button>
          </div>

          {/* Add Info Modal/Drawer */}
          <AnimatePresence>
            {showAddInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-6 glass rounded-2xl border border-cyan-500/30 max-w-2xl mx-auto text-left text-xs text-slate-300 space-y-2 bg-slate-950/90"
              >
                <div className="font-mono text-cyan-300 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>How Ashwin can add new achievements:</span>
                </div>
                <p>
                  1. Open file: <code className="bg-slate-800 px-2 py-0.5 rounded text-cyan-400">src/data/portfolioData.js</code>
                </p>
                <p>
                  2. Locate the <code className="bg-slate-800 px-2 py-0.5 rounded text-cyan-400">achievementsData</code> array.
                </p>
                <p>
                  3. Simply add a new item under any category (Certifications, Hackathons, Courses, Awards, Other achievements):
                </p>
                <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-200 overflow-x-auto">
{`{
  title: "Hackathon Name or Certificate",
  issuer: "Issuing Organization",
  year: "2026",
  status: "Completed / Winner",
  desc: "Brief summary of the milestone."
}`}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
