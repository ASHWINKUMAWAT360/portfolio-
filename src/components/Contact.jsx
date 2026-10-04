import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { contactInfo, personalInfo } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Mail, Send, Copy, Check, MapPin, Clock, Sparkles, ExternalLink, MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Clipboard copy state
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Live IST Time clock
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Form submission state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    sound.playSuccess();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playClick();
    setIsSubmitting(true);

    // Simulate sending message with pleasant transition
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sound.playSuccess();

      // Open mailto link as practical fallback so message reaches Ashwin
      const mailtoUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
        formData.subject || `Portfolio Message from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, '_blank');

      // Reset form after delay
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitted(false);
      }, 4000);
    }, 1000);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300 mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Let&apos;s Connect</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Whether you want to discuss a project, explore AI collaborations, or simply say hello, my inbox is always open!
          </p>
        </motion.div>

        {/* Top 3 Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Email */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-cyan-400/40 flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">Direct Email</h3>
              <p className="text-xs text-slate-400 mb-3 font-mono">University &amp; Professional Inbox</p>
              <p className="text-sm text-cyan-300 font-mono break-all mb-6 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                {contactInfo.email}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${contactInfo.email}`}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 shadow-neon-cyan hover:brightness-110 transition-all"
                onClick={() => sound.playClick()}
              >
                <span>Compose</span>
                <Send className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* Card 2: LinkedIn */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-purple-400/40 flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                <FaLinkedin className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">LinkedIn Profile</h3>
              <p className="text-xs text-slate-400 mb-3 font-mono">Professional Network &amp; Updates</p>
              <p className="text-sm text-purple-300 font-mono break-all mb-6 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                ashwin-kumawat
              </p>
            </div>

            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all cursor-pointer"
              onClick={() => sound.playClick()}
            >
              <span>Connect on LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Card 3: GitHub */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-cyan-400/40 flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                <FaGithub className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">GitHub Repositories</h3>
              <p className="text-xs text-slate-400 mb-3 font-mono">Open Source Projects &amp; Code</p>
              <p className="text-sm text-cyan-300 font-mono break-all mb-6 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                ASHWINKUMAWAT360
              </p>
            </div>

            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
              onClick={() => sound.playClick()}
            >
              <span>Explore GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

        </div>

        {/* Bottom Section: Location Widget & Interactive Message Form */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Location & Availability Widget (Col 5) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Location & Time card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <MapPin className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Current Location</h4>
                  <p className="text-xs text-slate-400 font-mono">Jaipur, Rajasthan, India</p>
                </div>
              </div>

              {/* Live Digital Clock Widget */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Local Time (IST):</span>
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold">{contactInfo.timezone}</span>
                </div>
                <div className="text-2xl font-mono font-black text-white tracking-wider">
                  {currentTime || 'Loading...'}
                </div>
              </div>

              {/* Status & College info */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Institution:</strong> {contactInfo.college}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Availability:</strong> {contactInfo.availability}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Coordinates:</strong> {contactInfo.coordinates}</span>
                </div>
              </div>
            </div>

            {/* Quick response pledge */}
            <div className="glass rounded-2xl p-5 border border-white/10 text-xs text-slate-400 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
              <span>Prompt communication assured. Messages typically answered within 24 hours.</span>
            </div>
          </motion.div>

          {/* Interactive Message Form (Col 7) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative"
          >
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">Send Me a Message</h3>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400 text-3xl shadow-lg">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-white">Message Transmitted!</h4>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you for reaching out. Your default email client was opened with the message draft, and I will get back to you shortly!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      YOUR NAME <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      YOUR EMAIL <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Collaboration / Greeting"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    MESSAGE <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Ashwin, I would love to talk about..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-neon-cyan hover:brightness-110 active:scale-98 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
