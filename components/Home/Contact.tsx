'use client'
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Send, Github, Linkedin } from 'lucide-react';

export function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Message sent! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section
            id="contact"
            className="py-20 bg-zinc-950 relative overflow-hidden"
            ref={ref}
        >
            {/* Animated background elements */}
            <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-white mb-4">
                        LET'S CREATE
                        <span className="block text-lime-400">SOMETHING AMAZING</span>
                    </h2>
                    <div className="flex justify-center gap-2 mb-6">
                        <div className="w-2 h-2 bg-lime-400" />
                        <div className="w-2 h-2 bg-fuchsia-500" />
                        <div className="w-2 h-2 bg-lime-400" />
                    </div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind? Let's collaborate and bring your vision to life.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-360 px-4 sm:px-6 lg:px-8 mx-auto">
                    {/* Left side - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-white mb-6">Get in touch</h3>
                            <p className="text-gray-400 mb-8">
                                Whether you're looking to build a new product, revamp an existing
                                one, or just want to chat about possibilities, I'm here to help.
                            </p>
                        </div>

                        {/* Contact info card */}
                        <motion.div
                            className="border-2 border-white/10 p-8 relative group hover:border-lime-400 transition-colors"
                            whileHover={{ x: 10 }}
                        >
                            <div className="absolute top-0 left-0 w-4 h-4 bg-lime-400" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-fuchsia-500" />

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                                    <Mail className="text-black" size={24} />
                                </div>
                                <div>
                                    <div className="text-gray-400 uppercase text-xs tracking-wider mb-2">
                                        Email me at
                                    </div>
                                    <div className="text-white">your.email@example.com</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Social links */}
                        <div>
                            <div className="text-gray-400 uppercase text-xs tracking-wider mb-4">
                                Connect with me
                            </div>
                            <div className="flex gap-4">
                                {[
                                    { icon: Github, label: 'GitHub', href: '#' },
                                    { icon: Linkedin, label: 'LinkedIn', href: '#' },
                                    { icon: Mail, label: 'Email', href: '#contact' },
                                ].map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        className="w-14 h-14 border-2 border-white/10 hover:border-lime-400 text-white hover:text-lime-400 flex items-center justify-center group transition-colors"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <social.icon size={24} />
                                        <span className="sr-only">{social.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Decorative quote */}
                        <motion.div
                            className="border-l-4 border-fuchsia-500 pl-6 py-4"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <p className="text-white italic mb-2">
                                "The only way to do great work is to love what you do."
                            </p>
                            <p className="text-gray-500 text-sm">- Steve Jobs</p>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-lime-400 uppercase text-xs tracking-wider mb-3"
                            >
                                Your Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-6 py-4 bg-black border-2 border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors uppercase tracking-wide"
                                placeholder="JOHN DOE"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-lime-400 uppercase text-xs tracking-wider mb-3"
                            >
                                Your Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-6 py-4 bg-black border-2 border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors uppercase tracking-wide"
                                placeholder="HELLO@EXAMPLE.COM"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-lime-400 uppercase text-xs tracking-wider mb-3"
                            >
                                Your Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-6 py-4 bg-black border-2 border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="group relative w-full px-8 py-4 bg-gradient-to-r from-lime-400 to-fuchsia-500 text-black uppercase tracking-widest overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Send Message
                                <Send size={20} />
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-white"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
