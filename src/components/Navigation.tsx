"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useScroll } from "framer-motion";

const Navigation = () => {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        const unsubscribe = scrollYProgress.onChange((latest) => {
            // Show navigation after 10% scroll
            if (latest > 0.1) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            unsubscribe();
        };
    }, [scrollYProgress]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
                        }`}
                >
                    <nav className="container flex justify-end items-center px-6">
                        <ul className="flex gap-8 items-center mr-8">
                            {["Home", "Projects", "Services", "About", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`#${item.toLowerCase()}`}
                                        className="text-sm font-bold text-primary opacity-70 hover:opacity-100 hover:text-accent transition-all"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="logo order-2">
                            <Link href="/">
                                <img
                                    src="/logo-navy-blue.png"
                                    alt="Jamie Rose Logo"
                                    className="h-16 w-auto"
                                />
                            </Link>
                        </div>
                    </nav>
                </motion.header>
            )}
        </AnimatePresence>
    );
};

export default Navigation;
