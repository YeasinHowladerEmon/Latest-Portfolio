'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Send, Github, Linkedin, Terminal, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { HolographicContact } from '../ui/Scene3D';
import emailjs from '@emailjs/browser';


const InputField = ({ label, type, name, value, onChange, placeholder, required = false }: any) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative mb-6 group">
            <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFocused || value ? '-top-3 text-xs bg-black px-2 text-lime-400' : 'top-4 text-gray-500'
                    }`}
            >
                {label} {required && <span className="text-fuchsia-500">*</span>}
            </label>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required={required}
                    rows={5}
                    className={`w-full bg-black/50 border-2 rounded-lg px-4 py-4 text-white outline-none transition-all duration-300 resize-none ${isFocused ? 'border-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.3)]' : 'border-white/10 hover:border-white/30'
                        }`}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required={required}
                    className={`w-full bg-black/50 border-2 rounded-lg px-4 py-4 text-white outline-none transition-all duration-300 ${isFocused ? 'border-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.3)]' : 'border-white/10 hover:border-white/30'
                        }`}
                />
            )}
            {/* Corner accents */}
            <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-300 ${isFocused ? 'border-lime-400' : 'border-transparent'}`} />
            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-300 ${isFocused ? 'border-lime-400' : 'border-transparent'}`} />
        </div>
    );
};

export function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<{ type: string; message: string }>({ type: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setStatus({ type: '', message: '' });

        try {
            // 1. Send to Backend (MongoDB)
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to save message');

            // 2. Send via EmailJS (Optional/Fail-safe)
            // Ensure you have these variables in your .env.local
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

            if (serviceId && templateId && publicKey) {
                await emailjs.send(
                    serviceId,
                    templateId,
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        phone: formData.phone,
                    },
                    publicKey
                );
            }

            setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            console.error('Submit error:', error);
            setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
        } finally {
            setSending(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="py-24 bg-zinc-950 relative overflow-hidden" ref={ref}>
            {/* 3D Holographic Background */}
            <HolographicContact />

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[2rem_2rem] opacity-20 pointer-events-none" />

            {/* Animated Glowing Orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-400/20 rounded-full blur-[100px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[100px]"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                }}
            />

            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 border border-lime-400/30 rounded-full bg-lime-400/5 mb-6">
                        <Terminal className="text-lime-400" size={16} />
                        <span className="text-lime-400 text-sm uppercase tracking-widest font-medium">Transmission Link</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        INITIATE <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-fuchsia-500">CONTACT</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-xl">
                        Signal verified. Channel open. Awaiting your transmission.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left Side: Contact Info & Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-12"
                    >
                        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-lime-400/50 transition-colors duration-500">
                            <div className="absolute inset-0 bg-linear-to-br from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <span className="w-2 h-8 bg-lime-400 rounded-full" />
                                Direct Channels
                            </h3>

                            <div className="space-y-6">
                                <a href="mailto:hello@cyber.dev" className="flex items-center gap-4 group/item">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-lime-400 group-hover/item:text-lime-400 transition-all duration-300">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Email Protocol</div>
                                        <div className="text-white font-mono text-lg group-hover/item:text-lime-400 transition-colors">hello@cyber.dev</div>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 group/item">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-fuchsia-500 group-hover/item:text-fuchsia-500 transition-all duration-300">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Base of Operations</div>
                                        <div className="text-white font-mono text-lg group-hover/item:text-fuchsia-500 transition-colors">Neo Tokyo, Grid 7</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group/item">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-cyan-400 group-hover/item:text-cyan-400 transition-all duration-300">
                                        <Globe size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Network Status</div>
                                        <div className="text-white font-mono text-lg group-hover/item:text-cyan-400 transition-colors flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            Online & Available
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {[
                                { icon: Github, label: 'GitHub', color: 'hover:text-white hover:border-white' },
                                { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-400' },
                                { icon: Terminal, label: 'CV', color: 'hover:text-lime-400 hover:border-lime-400' },
                            ].map((social, idx) => (
                                <motion.a
                                    key={social.label}
                                    href="#"
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex-1 h-16 bg-black/50 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color}`}
                                >
                                    <social.icon size={24} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-lime-400 to-fuchsia-500 rounded-3xl blur opacity-20" />
                        <form
                            onSubmit={handleSubmit}
                            className="relative bg-black border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-lime-400 via-fuchsia-500 to-cyan-400 rounded-t-3xl" />

                            <h3 className="text-xl font-mono text-white mb-8 border-b border-white/10 pb-4 flex justify-between items-center">
                                <span>// SEND_MESSAGE.exe</span>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80 animate-pulse" />
                                </div>
                            </h3>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="IDENTIFIER"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                    />

                                    <InputField
                                        label="DIGITAL ADDRESS"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="PHONE NUMBER"
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 234 567 890"
                                    />

                                    <InputField
                                        label="SUBJECT"
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Project Inquiry"
                                        required
                                    />
                                </div>

                                <InputField
                                    label="TRANSMISSION DATA"
                                    type="textarea"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Enter your message here..."
                                    required
                                />
                            </div>

                            {status.message && (
                                <div className={`mt-4 p-4 rounded-xl text-sm font-mono border ${status.type === 'success' ? 'bg-lime-400/5 border-lime-400/20 text-lime-400' : 'bg-red-500/5 border-red-500/20 text-red-500'}`}>
                                    {status.type === 'success' ? '> SUCCESS: ' : '> ERROR: '} {status.message}
                                </div>
                            )}

                            <motion.button
                                type="submit"
                                disabled={sending}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full mt-8 text-black font-bold py-4 rounded-xl uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] ${status.type === 'success' ? 'bg-green-500' : 'bg-lime-400 hover:bg-lime-300'}`}
                            >
                                {sending ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                        <span>Transmitting...</span>
                                    </>
                                ) : status.type === 'success' ? (
                                    <>
                                        <CheckCircle2 size={20} />
                                        <span>Transmission Received</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        <span>Execute Send</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
