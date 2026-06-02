"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/config/content";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create the mailto link with form data
    const subject = encodeURIComponent(`New Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:${content.socials.email.replace("mailto:", "")}?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 500);
  };

  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-[#050505] via-[#1a0500] to-[#050505]">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
            Let&apos;s<span className="text-white/20"> Talk</span>
          </h2>
          <div className="w-24 h-1 bg-white mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-6">Have an idea?</h3>
              <p className="text-lg text-white/60 mb-12 max-w-md">
                I&apos;m currently available for freelance work and open to new opportunities. Let&apos;s create something beautiful together.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-mono text-white/40 uppercase mb-2">Email</h4>
                  <a href={content.socials.email} className="text-xl text-white hover:text-white/70 transition-colors">
                    {content.socials.email.replace("mailto:", "")}
                  </a>
                </div>
                
                <div>
                  <h4 className="text-sm font-mono text-white/40 uppercase mb-2">Socials</h4>
                  <div className="flex gap-6">
                    <a href={content.socials.github} target="_blank" rel="noreferrer" className="text-white hover:text-white/70 transition-colors">
                      GitHub
                    </a>
                    <a href={content.socials.linkedin} target="_blank" rel="noreferrer" className="text-white hover:text-white/70 transition-colors">
                      LinkedIn
                    </a>
                    <a href={content.socials.instagram} target="_blank" rel="noreferrer" className="text-white hover:text-white/70 transition-colors">
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 glass-card rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-6 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Message Sent</h3>
                <p className="text-white/60">I&apos;ll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-sm font-mono text-white/40 hover:text-white transition-colors underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 flex flex-col">
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors peer placeholder-transparent"
                    placeholder="Name"
                  />
                  <label htmlFor="name" className="absolute left-0 top-4 text-white/40 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white peer-valid:-top-3 peer-valid:text-xs peer-valid:text-white pointer-events-none">
                    Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors peer placeholder-transparent"
                    placeholder="Email"
                  />
                  <label htmlFor="email" className="absolute left-0 top-4 text-white/40 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white peer-valid:-top-3 peer-valid:text-xs peer-valid:text-white pointer-events-none">
                    Email
                  </label>
                </div>

                <div className="relative group flex-1">
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors peer placeholder-transparent resize-none min-h-[120px]"
                    placeholder="Message"
                  />
                  <label htmlFor="message" className="absolute left-0 top-4 text-white/40 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white peer-valid:-top-3 peer-valid:text-xs peer-valid:text-white pointer-events-none">
                    Message
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="self-start mt-4 px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-4"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <span className="text-xl">→</span>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
