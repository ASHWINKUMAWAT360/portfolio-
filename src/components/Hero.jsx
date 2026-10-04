import { motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { personalInfo } from '../data/portfolioData'
import { sound } from '../utils/audio'
import { Sparkles, ArrowRight, Mail, Terminal, MapPin } from 'lucide-react'

const ThreeScene = lazy(() => import('./ThreeScene'))

export default function Hero() {
  const scrollTo = (id) => {
    sound.playClick()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[calc(100vh-140px)]">
          
          {/* Left Column: Hero Introduction */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            
            {/* Status & Location Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md w-fit mb-6 shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-mono text-cyan-300">Available for Projects &amp; Learning</span>
              <span className="text-slate-600">|</span>
              <span className="text-xs font-mono text-slate-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                {personalInfo.location}
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-cyan-400 font-mono text-sm sm:text-base tracking-wide flex items-center gap-2 mb-2"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Hello world, I&apos;m</span>
            </motion.p>

            {/* User Name */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black mb-3 leading-none tracking-tight"
            >
              <span className="text-white">Ashwin </span>
              <span className="gradient-text">Kumawat</span>
            </motion.h1>

            {/* Sub-Headline / Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-0.5 w-8 sm:w-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
              <h2 className="text-lg sm:text-2xl text-slate-200 font-semibold tracking-wide">
                B.Tech Student <span className="text-cyan-400">|</span> AI &amp; Technology Enthusiast
              </h2>
            </motion.div>

            {/* Professional Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-slate-300 text-sm sm:text-base lg:text-lg mb-8 max-w-xl leading-relaxed font-normal"
            >
              I am a <strong className="text-white font-semibold">{personalInfo.role}</strong> at{' '}
              <span className="text-cyan-400 font-medium">{personalInfo.college}</span>, deeply interested in{' '}
              <span className="text-white font-medium">technology, artificial intelligence, web development, and digital productivity</span>.
              I am learning modern technologies and building practical projects that solve real-world problems.
            </motion.p>

            {/* Call To Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <button
                onClick={() => scrollTo('projects')}
                onMouseEnter={() => sound.playHover()}
                className="group px-7 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold rounded-2xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                onMouseEnter={() => sound.playHover()}
                className="px-7 py-3.5 glass-card text-white font-semibold rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:bg-slate-800/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 text-sm sm:text-base cursor-pointer shadow-sm"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80"
            >
              {personalInfo.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black gradient-text tracking-tight">{stat.value}</span>
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D WebGL Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Ambient Backlight Ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border border-cyan-500/15 animate-spin-slow" />
              <div className="w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full border border-purple-500/10 animate-spin-reverse" />
            </div>

            {/* Interactive ThreeScene Canvas */}
            <div className="w-full max-w-[540px]">
              <Suspense fallback={
                <div className="w-full h-[400px] flex flex-col items-center justify-center glass rounded-3xl border border-cyan-500/20 text-cyan-400 font-mono text-sm">
                  <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
                  <span>Loading 3D WebGL Engine...</span>
                </div>
              }>
                <ThreeScene />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Smooth Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 cursor-pointer hidden sm:flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors"
        onClick={() => scrollTo('about')}
      >
        <span className="text-[11px] font-mono tracking-widest uppercase">Scroll Down</span>
        <div className="w-5 h-8 border-2 border-slate-700 hover:border-cyan-400 rounded-full flex justify-center p-1 transition-colors">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-1 h-1.5 bg-cyan-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
