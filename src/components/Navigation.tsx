"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

const Navigation = () => {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Show navigation after 10% scroll
        if (latest > 0.05) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    });

    // Close menu when clicking a link
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-2" : "bg-transparent py-4"
                        }`}
                >
                    <nav className="container flex justify-between items-center px-4 md:px-6">
                        {/* Logo - Standard Left/Center Placement */}
                        <div className="logo">
                            <Link href="/">
                                <img
                                    src="/logo-navy-blue.png"
                                    alt="Jamie Rose Logo"
                                    className={`transition-all duration-300 ${isScrolled ? "h-12" : "h-14 md:h-16"}`}
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex gap-8 items-center">
                            {navLinks.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm font-bold text-[#1b2a4e] opacity-70 hover:opacity-100 hover:text-[#ff7c3b] transition-all uppercase tracking-widest"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-[#1b2a4e] hover:text-[#ff7c3b] transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>

                        {/* Mobile Navigation Menu */}
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, x: "100%" }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: "100%" }}
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                    className="fixed inset-0 top-[64px] bg-white z-[90] md:hidden flex flex-col items-center justify-center gap-8"
                                >
                                    {navLinks.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={handleLinkClick}
                                            className="text-2xl font-bold text-[#1b2a4e] hover:text-[#ff7c3b] transition-all uppercase tracking-[0.2em]"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </nav>
                </motion.header>
            )}
        </AnimatePresence>
    );
};

export default Navigation;
