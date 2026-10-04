import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ExternalLink, Sparkles, X, Check, Play, Pause, RotateCcw, Send, Bot, Code, Layers } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

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
            <span>Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Interactive software projects demonstrating hands-on proficiency in 3D WebGL graphics, Generative AI integration, and digital productivity systems.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              onMouseEnter={() => sound.playHover()}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Project Header Banner with Icon & Badge */}
                <div className={`h-48 bg-gradient-to-br ${
                  project.color === 'cyan' ? 'from-cyan-950/60 via-slate-900 to-blue-950/40' :
                  project.color === 'purple' ? 'from-purple-950/60 via-slate-900 to-pink-950/40' :
                  'from-emerald-950/60 via-slate-900 to-teal-950/40'
                } p-6 flex flex-col justify-between relative overflow-hidden border-b border-slate-800`}>
                  
                  {/* Decorative circuit pattern */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Top Badge & Number */}
                  <div className="flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-cyan-300">
                      {project.badge}
                    </span>
                    <span className="text-slate-500 font-mono text-xs font-bold">
                      0{project.id}
                    </span>
                  </div>

                  {/* Centered Large Icon */}
                  <div className="text-6xl text-center my-auto filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300 select-none">
                    {project.icon}
                  </div>

                  {/* Bottom Category pill */}
                  <div className="z-10">
                    <span className="text-xs font-mono text-slate-400">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Details Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {project.shortDesc}
                  </p>

                  {/* Technologies Used */}
                  <div className="mb-6">
                    <h4 className="text-[11px] font-mono uppercase text-slate-500 tracking-wider mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-[11px] font-mono text-slate-300 border border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    sound.playClick();
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl bg-gradient-to-r ${project.accentGradient} text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer`}
                >
                  <span>View Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                  title="View GitHub Repository"
                  onClick={() => sound.playClick()}
                >
                  <FaGithub className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Interactive Project Details & Live Demo Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl glass-card rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl my-8 bg-slate-950/95"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-900/60">
                <div className="flex items-center gap-4">
                  <div className="text-4xl p-3 rounded-2xl bg-slate-800 border border-slate-700">
                    {selectedProject.icon}
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-1 inline-block">
                      {selectedProject.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(null);
                    sound.playClick();
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Detailed Description */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Project Overview</h4>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {selectedProject.fullDesc}
                  </p>
                </div>

                {/* Interactive Live Simulation Embed */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Interactive Feature Simulation</span>
                  </h4>
                  
                  {selectedProject.demoType === '3d-showcase' && (
                    <PortfolioSimulation />
                  )}

                  {selectedProject.demoType === 'ai-playground' && (
                    <AiPlaygroundSimulation />
                  )}

                  {selectedProject.demoType === 'productivity-demo' && (
                    <ProductivityTimerSimulation />
                  )}
                </div>

                {/* Key Architectural Highlights */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Key Highlights</h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies List */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Full Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-mono text-cyan-300 border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 sm:p-8 border-t border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
                  onClick={() => sound.playClick()}
                >
                  <FaGithub className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>

                <button
                  onClick={() => {
                    setSelectedProject(null);
                    sound.playClick();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-neon-cyan hover:brightness-110 transition-all cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Sub-component 1: 3D Showcase interactive preview
function PortfolioSimulation() {
  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 text-xs space-y-3">
      <div className="flex items-center justify-between text-cyan-300 font-mono">
        <span>⚡ 3D WebGL Engine Diagnostics</span>
        <span className="text-emerald-400">● 60 FPS Target</span>
      </div>
      <p className="text-slate-300">
        This portfolio is rendered in real time using <strong>Three.js</strong> with hardware-accelerated shaders, dynamic point lights, and mathematically computed meshes (Core, Quantum Knot, and Gyroscope).
      </p>
      <div className="grid grid-cols-3 gap-2 text-center font-mono">
        <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
          <div className="text-cyan-400 font-bold">Three.js</div>
          <div className="text-slate-500 text-[10px]">WebGL 2.0</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
          <div className="text-purple-400 font-bold">Vite + React</div>
          <div className="text-slate-500 text-[10px]">Instant HMR</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
          <div className="text-emerald-400 font-bold">Web Audio</div>
          <div className="text-slate-500 text-[10px]">Synthesized FX</div>
        </div>
      </div>
    </div>
  );
}

// Sub-component 2: Interactive AI prompt playground simulation
function AiPlaygroundSimulation() {
  const [selectedPrompt, setSelectedPrompt] = useState('Explain Generative AI');
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const sampleResponses = {
    'Explain Generative AI': "Generative AI creates novel synthetic media (text, code, 3D assets, images) by learning latent probability distributions from large training corpora. It moves computing from retrieval to creation.",
    'Python Study Roadmap': "1. Master Core Syntax & Data Structures (Lists, Dicts, Tuples)\n2. Practice OOP & Algorithmic Problem Solving\n3. Build CLI Tools & REST API Integrations\n4. Dive into AI libraries (NumPy, PyTorch, HuggingFace)",
    'Web Dev Project Ideas': "• 3D Interactive Portfolio (WebGL / Three.js)\n• AI Knowledge Assistant with streaming LLM replies\n• Real-time collaborative Markdown workspace with sync"
  };

  const handleSimulate = (promptKey) => {
    sound.playClick();
    setSelectedPrompt(promptKey);
    setIsGenerating(true);
    setResponse('');

    const fullText = sampleResponses[promptKey];
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < fullText.length) {
        setResponse((prev) => prev + fullText.charAt(currentIdx));
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        sound.playSuccess();
      }
    }, 15);
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/30 text-xs space-y-3">
      <div className="flex items-center justify-between text-purple-300 font-mono">
        <span className="flex items-center gap-1.5">
          <Bot className="w-3.5 h-3.5 text-purple-400" />
          <span>Interactive Student AI Prompt Simulator</span>
        </span>
        <span className="text-purple-400 text-[10px] font-mono">Simulated LLM API</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.keys(sampleResponses).map((key) => (
          <button
            key={key}
            onClick={() => handleSimulate(key)}
            disabled={isGenerating}
            className={`px-3 py-1.5 rounded-lg font-mono text-[11px] transition-colors ${
              selectedPrompt === key
                ? 'bg-purple-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs min-h-[75px] text-slate-200 whitespace-pre-line leading-relaxed">
        {response || (
          <span className="text-slate-500 italic">Click any prompt above to simulate an AI response stream...</span>
        )}
      </div>
    </div>
  );
}

// Sub-component 3: Interactive Student Productivity Timer & Checklist
function ProductivityTimerSimulation() {
  const [seconds, setSeconds] = useState(1500); // 25 min default
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review Data Structures algorithm notes', completed: true },
    { id: 2, title: 'Write Three.js shader vertex logic', completed: false },
    { id: 3, title: 'Complete Python assignment on JECRC portal', completed: false },
  ]);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      sound.playSuccess();
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTask = (id) => {
    sound.playClick();
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30 text-xs space-y-4">
      <div className="flex items-center justify-between text-emerald-300 font-mono">
        <span>⏱️ Student Focus &amp; Task Operating System</span>
        <span className="text-emerald-400 font-mono font-bold">{formatTime(seconds)}</span>
      </div>

      {/* Timer Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setIsActive(!isActive);
            sound.playClick();
          }}
          className="px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold flex items-center gap-1.5 hover:bg-emerald-400 transition-colors"
        >
          {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isActive ? 'Pause' : 'Start Focus'}</span>
        </button>

        <button
          onClick={() => {
            setIsActive(false);
            setSeconds(1500);
            sound.playClick();
          }}
          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Student Checklist */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <span className="text-slate-400 text-[11px] font-mono">STUDENT STUDY CHECKLIST (CLICK TO COMPLETE):</span>
        {tasks.map(t => (
          <div
            key={t.id}
            onClick={() => toggleTask(t.id)}
            className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-emerald-500/40 transition-colors"
          >
            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
              t.completed ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600'
            }`}>
              {t.completed && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className={`text-xs ${t.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
              {t.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
