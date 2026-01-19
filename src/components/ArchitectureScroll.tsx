"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ArchitectureScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const frameCount = 54;
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Preload images
    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            const loadImage = (index: number) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = `/hero-sequence/frame-${index}.webp`;
                    img.onload = () => {
                        loadedCount++;
                        setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
                        resolve(img);
                    };
                });
            };

            const promises = [];
            for (let i = 1; i <= frameCount; i++) {
                promises.push(loadImage(i));
            }

            const results = await Promise.all(promises);
            setImages(results as HTMLImageElement[]);
            setIsLoading(false);
        };

        preloadImages();
    }, []);

    // Draw to canvas on scroll
    useEffect(() => {
        if (images.length === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const render = () => {
            const latest = smoothProgress.get();
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(latest * frameCount)
            );

            const img = images[frameIndex];
            if (img) {
                // Clear canvas
                context.clearRect(0, 0, canvas.width, canvas.height);

                // Set high quality smoothing
                context.imageSmoothingEnabled = true;
                context.imageSmoothingQuality = "high";

                // Calculate aspect ratio fit based on actual canvas dimensions
                const scale = Math.max(
                    canvas.width / img.width,
                    canvas.height / img.height
                );
                const x = canvas.width / 2 - (img.width / 2) * scale;
                const y = canvas.height / 2 - (img.height / 2) * scale;

                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);

        // Initial resize with High DPI support
        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
        };
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    }, [images, smoothProgress]);

    // Text overlay transforms
    const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    const philosophyOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
    const philosophyX = useTransform(scrollYProgress, [0.25, 0.3], [-50, 0]);

    const innovationOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
    const innovationX = useTransform(scrollYProgress, [0.55, 0.6], [50, 0]);


    return (
        <div id="home" ref={containerRef} className="relative h-[400vh] bg-background">
            {/* Loading State */}
            {isLoading && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
                    <div className="w-64 h-1 bg-secondary/10 relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${loadingProgress}%` }}
                        />
                    </div>
                    <p className="mt-4 font-sans text-xs uppercase tracking-widest text-secondary/60">
                        Designing Project {loadingProgress}%
                    </p>
                    <div className="mt-2 text-[8px] font-sans opacity-20 uppercase tracking-[0.3em]">
                        Structural Integration in Progress
                    </div>
                </div>
            )}

            {/* Sticky Canvas */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="block h-full w-full" />
            </div>

            {/* Hero Section (0% Scroll) */}
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale }}
                className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none px-4"
            >
                <h1 className="flex flex-col items-center text-center drop-shadow-[0_8px_25px_rgba(255,255,255,0.3)] w-full">
                    <span className="font-serif text-5xl sm:text-7xl md:text-8xl text-[#1a365d] lowercase italic leading-none drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">
                        Architectural
                    </span>
                    <span className="font-sans font-black text-5xl sm:text-8xl md:text-9xl text-[#c45c2c] uppercase tracking-tighter leading-none -mt-2 sm:-mt-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
                        Portfolio<span className="text-[#c45c2c]">.</span>
                    </span>
                </h1>
                <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-4 py-2 px-4 sm:px-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg max-w-[90vw]">
                    <div className="h-[1px] w-6 sm:w-12 bg-[#1a365d]/40" />
                    <p className="font-sans text-[8px] sm:text-[10px] md:text-sm tracking-[0.2em] sm:tracking-[0.4em] text-[#1a365d] font-bold uppercase truncate">
                        JAMIE ROSE P. ARDIENTE
                    </p>
                    <div className="h-[1px] w-6 sm:w-12 bg-[#1a365d]/40" />
                </div>
            </motion.div>

            {/* Design Philosophy (30% Scroll) */}
            <motion.div
                style={{ opacity: philosophyOpacity, x: philosophyX }}
                className="fixed inset-y-0 left-0 w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-24 pointer-events-none"
            >
                <div className="relative group">
                    <div className="absolute -left-4 sm:-left-6 top-0 bottom-0 w-1 bg-[#c45c2c] shadow-[0_0_15px_rgba(196,92,44,0.4)]" />
                    <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl text-[#1a365d] mb-4 italic leading-none [text-shadow:1px_1px_0_rgba(255,255,255,0.8),-1px_-1px_0_rgba(255,255,255,0.8)] md:[text-shadow:2px_2px_0_rgba(255,255,255,0.8),-1px_-1px_0_rgba(255,255,255,0.8)] font-black">
                        Design Philosophy
                    </h2>
                </div>
                <div className="relative mt-2">
                    <div className="absolute -inset-x-4 sm:-inset-x-6 -inset-y-3 bg-white/40 blur-xl rounded-2xl -z-10" />
                    <p className="font-sans text-base sm:text-xl md:text-2xl text-[#1a365d] max-w-sm sm:max-w-md leading-tight font-black uppercase tracking-tight">
                        "Shaping space. Enhancing life"
                    </p>
                    <p className="font-sans text-xs sm:text-sm md:text-base text-[#1a365d]/80 max-w-sm sm:max-w-md leading-relaxed mt-2 sm:mt-3 italic font-semibold">
                        Sustainable design driven by structural honesty and spatial utility.
                    </p>
                </div>
            </motion.div>

            {/* Architectural Approach (60% Scroll) */}
            <motion.div
                style={{ opacity: innovationOpacity, x: innovationX }}
                className="fixed inset-y-0 right-0 w-full md:w-1/2 flex flex-col justify-center items-end text-right px-6 sm:px-12 md:px-24 pointer-events-none"
            >
                <div className="relative group flex flex-col items-end">
                    <div className="absolute -right-4 sm:-right-6 top-0 bottom-0 w-1 bg-[#c45c2c] shadow-[0_0_15px_rgba(196,92,44,0.4)]" />
                    <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl text-[#1a365d] mb-4 italic leading-none text-right [text-shadow:1px_1px_0_rgba(255,255,255,0.8),-1px_-1px_0_rgba(255,255,255,0.8)] md:[text-shadow:2px_2px_0_rgba(255,255,255,0.8),-1px_-1px_0_rgba(255,255,255,0.8)] font-black">
                        Architectural Approach
                    </h2>
                </div>
                <div className="relative flex flex-col items-end mt-2">
                    <div className="absolute -inset-x-4 sm:-inset-x-6 -inset-y-3 bg-white/40 blur-xl rounded-2xl -z-10" />
                    <p className="font-sans text-base sm:text-xl md:text-2xl text-[#1a365d] max-w-sm sm:max-w-md leading-tight font-black uppercase tracking-tight text-right">
                        Function. Form. Impact.
                    </p>
                    <p className="font-sans text-xs sm:text-sm md:text-base text-[#1a365d]/80 max-w-sm sm:max-w-md leading-relaxed mt-2 sm:mt-3 text-right font-semibold">
                        A digital showcase of technical proficiency and solution-driven architecture.
                    </p>
                </div>
            </motion.div>

        </div>
    );
};

export default ArchitectureScroll;
