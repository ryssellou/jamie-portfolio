"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Linkedin, X, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
    {
        id: 1,
        title: "The Chan Residence",
        category: "residential",
        type: "Two-Storey Residential",
        location: "Dasmariñas City, Cavite",
        specs: "170 sqm Corner Lot",
        year: "2024",
        img: "/project-1.png",
        description: "This project is a modern, four-bedroom home designed for a newlywed couple starting their journey together. The goal was to create a comfortable, minimalist space that fits a limited budget while making the most of an inherited 170 sqm corner lot. The design focuses on spatial efficiency, maximizing the available floor area to create an open and flexible interior. The layout is built for the future, providing enough rooms for a growing family and a dedicated space for household help. By using simple lines and a practical floor plan, the residence proves that a high-quality, beautiful home can be achieved through smart and straightforward design.",
        gallery: ["/project-1.png", "/project-1-2.png"]
    },
    {
        id: 2,
        title: "Tropical Sanctuary",
        category: "residential",
        type: "Residential Landscape Design",
        location: "Manila, Philippines",
        specs: "3,072 sqm Estate",
        year: "2023",
        img: "/project-2.png",
        description: "This landscape design creates a smooth transition between a modern, geometric home and the lush Philippine outdoors. Designed for a Fil-Am couple, the project transforms a large 3,072 sqm property into a private and relaxing retreat. The goal was to balance clean, modern structures with the natural beauty of tropical plants. The yard is divided into functional zones, featuring a rectangular swimming pool for a modern look and a natural koi pond for a target atmosphere. Large wooden decks connect the house to the outdoors, providing plenty of shaded space to lounge under mature palms. By using a mix of flowering trees and greenery, the design offers a cool, functional sanctuary that is perfectly suited for the tropical climate.",
        gallery: ["/project-2.png", "/project-2-2.png", "/project-2-3.png"]
    },
    {
        id: 3,
        title: "Almanza Commerce",
        category: "commercial",
        type: "3-Storey Mixed-Use Building",
        location: "Almanza Dos, Las Piñas City",
        specs: "300 sqm Corner Lot",
        year: "2024",
        img: "/project-3.png",
        description: "This project is a 3-storey modern building designed to support the growing commercial needs of Almanza Dos. Located on a high-visibility corner lot, the design aims to attract diverse tenants by offering a sleek, professional environment that stands out in the neighborhood. The building features a double-skin facade, specifically designed to shield the interior from direct sunlight and reduce heat, while maintaining a striking modern aesthetic. To ensure the building is future-proof, the leasable areas use an open-plan layout. This provides maximum flexibility, allowing tenants to easily customize and divide the space according to their specific business requirements. By combining ground-floor retail with versatile upper-level spaces, the design creates a functional and profitable hub for the local community.",
        gallery: ["/project-3.png", "/project-3-2.png", "/project-3-3.png"]
    },
    {
        id: 4,
        title: "Vireo",
        category: "commercial",
        type: "Mixed-Use Development (Class A Office & 4-Star Hotel)",
        location: "High Street, Bonifacio Global City (BGC)",
        specs: "High-Performance Mixed-Use",
        year: "2023",
        img: "/project-4.png",
        description: "Vireo is a premier mixed-use landmark designed to meet the modern shift toward 'Bleisure'—the blend of professional business and personal leisure. Located in the heart of BGC, the project combines high-end office spaces with a 4-star hotel to create a high-performance environment that also prioritizes wellness. The design is centered on biophilic principles, which aim to reconnect people with nature to improve health and productivity. This is achieved through lush green walls and integrated greenery that soften the urban experience. A key architectural feature is the sawtooth facade, designed to act as a natural sunshade. By angling the windows, the building reduces heat from the sun while providing occupants with framed views of the vertical gardens. The result is a sustainable, iconic tower where professional success and personal well-being flourish together.",
        gallery: ["/project-4.png", "/project-4-2.png"]
    },
    {
        id: 5,
        title: "Prisma Walk Mall",
        category: "commercial",
        type: "Retail Strip Mall & Commercial Annex",
        location: "Atelier District | Pampanga, Philippines",
        specs: "Provincial Retail Landmark",
        year: "2022",
        img: "/project-5.png",
        description: "Prisma Walk is a vibrant retail landmark designed to serve as a gateway feature within the Atelier District. The architecture is deeply inspired by Pampanga's iconic parol (lantern) industry, translating the craft's energy into a rhythmic and colorful building design. By using a provincial color palette and distinctive geometric shapes, the mall stands out as a celebration of local culture and modern commerce. The development consists of a main commercial building and a retail annex, known as the Arcade Mall, which work together to create a cohesive shopping experience. Beyond its aesthetic appeal, the design focuses on visibility and flow, ensuring that it attracts visitors while providing a functional, high-energy environment for local businesses and global brands alike.",
        gallery: ["/project-5.png", "/project-5-2.png"]
    },
    {
        id: 6,
        title: "Atelier District",
        category: "commercial",
        type: "Mixed-Use Development (Residential, Office, and Retail)",
        location: "Intersection of JASA and NLEX | Pampanga, Philippines",
        specs: "Walkable, Self-Sustaining Community",
        year: "2024",
        img: "/project-6.png",
        description: "Atelier District is a premier mixed-use development designed to serve as a symbolic gateway to Pampanga. Inspired by the province's world-class craftsmanship, the project blends local artistry with modern architectural identity. It is envisioned as a walkable, self-sustaining community that integrates residential condominiums, office towers, and a curated strip mall. The design is also a solution-driven response to the site's specific environmental challenges. To ensure stability on sloping terrain and soft soil, the project utilizes pile-raft foundations and structural fill. To manage flood risks and noise from the busy NLEX and JASA intersection, the masterplan incorporates elevated levels, bioswales, and landscaped buffers. By combining cultural pride with technical resilience, Atelier District provides a secure, sustainable, and elevated quality of life for its residents and tenants.",
        gallery: ["/project-6.png", "/project-6-2.png"]
    }
];

const services = [
    { id: "01", title: "AutoCAD", desc: "Proficient in <strong>AutoCAD</strong> for high-precision technical drafting and the development of detailed construction drawings." },
    { id: "02", title: "Revit", desc: "Expertly utilizing <strong>Revit</strong> for comprehensive Building Information Modeling (BIM) and technical documentation workflows." },
    { id: "03", title: "D5 Render", desc: "Specializing in <strong>D5 Render</strong> to produce high-fidelity 3D models and photorealistic design presentations." },
    { id: "04", title: "Administrative Coordination", desc: "Familiar with <strong>Microsoft Office</strong> and <strong>Google Workspace</strong> for efficient project documentation and administrative coordination." },
    { id: "05", title: "Project Workflow Management", desc: "Disciplined organizational and time management skills tailored for managing rigorous project-based workflows and deadlines." },
    { id: "06", title: "Collaborative Leadership", desc: "Active listener and collaborative team member capable of leading initiatives and providing thoughtful, evidence-based opinions." },
];

const PortfolioContent = () => {
    const [filter, setFilter] = useState("all");
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    const filteredProjects = filter === "all"
        ? projects
        : projects.filter(p => p.category === filter);

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedProject]);

    return (
        <>
            {/* Services Section */}
            <section id="services" className="services py-16 md:py-24 bg-white">
                <div className="container">
                    <div className="section-header mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Design & Technical Capabilities</h2>
                        <p className="text-gray-500 text-sm sm:text-base">Providing specialized architectural solutions for modern needs.</p>
                    </div>
                    <div className="services-grid">
                        {services.map((service) => (
                            <div key={service.id} className="service-card">
                                <div className="service-icon">{service.id}</div>
                                <h3 className="text-xl font-bold mb-4 text-[var(--primary-color)]">{service.title}</h3>
                                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: service.desc }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="projects py-16 md:py-24">
                <div className="container">
                    <div className="section-header mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Selected Works</h2>
                        <div className="filter-btns mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-4">
                            {["all", "residential", "commercial"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-gray-200 text-xs sm:text-sm font-medium transition-all ${filter === f ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]" : "bg-transparent text-gray-600 hover:border-[var(--primary-color)]"
                                        }`}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)} {f !== "all" ? "" : "Projects"}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="projects-grid mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="project-item relative h-[500px] overflow-hidden rounded-lg group cursor-pointer"
                                onClick={() => {
                                    setSelectedProject(project);
                                    setActiveImageIdx(0);
                                }}
                            >
                                <div className="project-img h-full w-full">
                                    <img src={project.img} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                                        <p className="text-white/80 uppercase tracking-widest text-sm mt-2">{project.type} • {project.year}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                            onClick={() => setSelectedProject(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-6xl h-full md:h-[90vh] bg-[#f8f6f2] md:rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="fixed md:absolute top-4 right-4 md:top-6 md:right-6 z-[120] p-2 bg-black/10 md:bg-black/5 rounded-full hover:bg-black/20 transition-colors backdrop-blur-md"
                            >
                                <X size={20} className="text-[#1b2a4e] md:w-6 md:h-6" />
                            </button>

                            {/* Left Side: Magazine Style Content */}
                            <div className="flex-1 p-6 md:p-16 flex flex-col justify-between overflow-y-auto order-2 md:order-1">
                                <div className="mb-8 md:mb-12">
                                    <img src="/logo-navy-blue.png" alt="Logo" className="w-10 md:w-12 h-auto mb-8 md:mb-12 opacity-80" />


                                    <h2 className="font-serif italic text-4xl md:text-7xl text-[#4a7ba5] leading-[1.1] mb-6 md:mb-8 text-balance">
                                        {selectedProject.title}
                                    </h2>

                                    <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
                                        <p className="font-bold text-[#1b2a4e] uppercase tracking-wider text-xs md:text-sm">
                                            {selectedProject.type}
                                        </p>
                                        <p className="text-[#1b2a4e] font-sans text-xs md:text-sm tracking-wide opacity-80">
                                            {selectedProject.specs} | {selectedProject.location}
                                        </p>
                                    </div>

                                    <div className="max-w-md space-y-4 md:space-y-6">
                                        <p className="text-[#1b2a4e] text-sm md:text-base leading-relaxed opacity-90 whitespace-pre-wrap">
                                            {selectedProject.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center mt-auto pt-6 md:pt-8 border-t border-black/5">

                                    {/* Gallery Navigation at bottom */}
                                    <div className="flex gap-3 md:gap-4">
                                        {selectedProject.gallery.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveImageIdx(i)}
                                                className={`h-1.5 md:h-2 rounded-full transition-all ${activeImageIdx === i ? "bg-[#4a7ba5] w-6 md:w-8" : "bg-black/10 hover:bg-black/20 w-1.5 md:w-2"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Image Gallery */}
                            <div className="h-[40vh] min-h-[300px] md:h-full md:flex-[1.2] relative bg-[#1a1a1a] flex items-center justify-center order-1 md:order-2">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeImageIdx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        src={selectedProject.gallery[activeImageIdx]}
                                        className="max-w-full max-h-full object-contain p-4 md:p-8 shadow-2xl"
                                        alt={`${selectedProject.title} view ${activeImageIdx + 1}`}
                                    />
                                </AnimatePresence>

                                {/* Image Controls */}
                                {selectedProject.gallery.length > 1 && (
                                    <div className="absolute inset-x-0 bottom-4 md:bottom-8 flex justify-center gap-4 px-6 md:px-8 z-10">
                                        <button
                                            onClick={() => setActiveImageIdx(prev => (prev === 0 ? selectedProject.gallery.length - 1 : prev - 1))}
                                            className="p-2 md:p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/10"
                                        >
                                            <ChevronLeft size={20} className="md:w-6 md:h-6" />
                                        </button>
                                        <button
                                            onClick={() => setActiveImageIdx(prev => (prev === selectedProject.gallery.length - 1 ? 0 : prev + 1))}
                                            className="p-2 md:p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/10"
                                        >
                                            <ChevronRight size={20} className="md:w-6 md:h-6" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* About Section */}
            <section id="about" className="about py-20 sm:py-32 bg-gray-50 border-y border-gray-100">
                <div className="container about-wrapper grid md:grid-cols-[1fr,1.2fr] gap-10 sm:gap-16 items-center">
                    <div className="about-image relative">
                        <img
                            src="profile-pic.jpg"
                            alt="Jamie Rose P. Ardiente"
                            className="rounded-lg shadow-[10px_10px_0_var(--primary-color)] sm:shadow-[20px_20px_0_var(--primary-color)] w-full max-w-[400px] mx-auto md:max-w-none"
                        />
                    </div>
                    <div className="about-text text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-[var(--primary-color)]">About Jamie Rose P. Ardiente</h2>
                        <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">Current architecture student with a passion for sustainable design and structural honesty. I specialize in drafting detailed construction drawings and technical documentation that bridge the gap between concept and creation.</p>
                        <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-10">My workflow is powered by industry-standard tools including <strong>AutoCAD</strong>, <strong>Revit</strong>, and <strong>D5 Render</strong>, ensuring every project is delivered with technical precision and visual excellence.</p>
                        <div className="about-stats flex justify-center md:justify-start gap-12 sm:gap-16">
                            <div className="stat text-center md:text-left">
                                <span className="stat-num text-4xl sm:text-5xl font-bold text-[var(--primary-color)]">40+</span>
                                <span className="stat-label block uppercase tracking-widest text-[10px] sm:text-sm text-[var(--accent-color)] font-bold">Projects</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact py-20 sm:py-32">
                <div className="container">
                    <div className="section-header mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--primary-color)]">Let's Work Together</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">Ready to bring your architectural vision to life? Let's discuss how we can work together.</p>
                    </div>
                    <div className="contact-grid mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-24">
                        {[
                            { icon: Mail, label: "Email", sub: "Send me an email anytime", value: "ardiente.jamierose@gmail.com", href: "mailto:ardiente.jamierose@gmail.com" },
                            { icon: Phone, label: "Phone", sub: "Call or text me", value: "+63 961 597 9076", href: "tel:+639615979076" },
                            { icon: MapPin, label: "Location", sub: "Based in Cavite", value: "Dasmariñas City, Philippines", href: null },
                            { icon: Linkedin, label: "LinkedIn", sub: "Connect professionally", value: "jamie-ardiente", href: "https://www.linkedin.com/in/jamie-ardiente/" }
                        ].map((item, idx) => (
                            <div key={idx} className="contact-method-card bg-white p-8 rounded-xl text-center shadow-sm border border-gray-100 transition-all hover:-translate-y-2 hover:shadow-xl hover:border-[var(--accent-color)] group">
                                <div className="contact-icon w-16 h-16 bg-blue-50 text-[var(--primary-color)] flex items-center justify-center rounded-full mx-auto mb-6 transition-all group-hover:bg-[var(--primary-color)] group-hover:text-white">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-[var(--primary-color)]">{item.label}</h3>
                                <p className="text-gray-400 text-sm mb-4">{item.sub}</p>
                                {item.href ? (
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[var(--primary-color)] font-bold break-all hover:underline">{item.value}</a>
                                ) : (
                                    <span className="text-[var(--primary-color)] font-bold">{item.value}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="contact-footer-cta bg-white/40 backdrop-blur-md p-8 sm:p-16 rounded-2xl sm:rounded-3xl border border-white/30 text-center max-w-4xl mx-auto">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[var(--primary-color)]">Ready to Get Started?</h3>
                        <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
                            I'm always interested in discussing new opportunities and projects. Whether you need technical drafting, 3D visualization, or architectural design consultation, I'd love to hear about your challenges.
                        </p>
                        <a href="mailto:ardiente.jamierose@gmail.com" className="btn-touch inline-flex items-center gap-3 bg-[var(--primary-color)] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold hover:bg-[var(--accent-color)] hover:-translate-y-1 transition-all shadow-lg shadow-orange-500/10 text-sm sm:text-base">
                            <Mail size={20} /> Get In Touch
                        </a>
                    </div>
                </div>
            </section>

            <footer className="py-12 sm:py-16 border-t border-gray-100 bg-white">
                <div className="container flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
                    <p className="text-gray-500 text-sm sm:text-base text-center md:text-left">© 2026 Jamie Rose P. Ardiente. All rights reserved.</p>
                    <div className="social-links flex flex-wrap justify-center gap-6 sm:gap-8">
                        <a href="https://www.linkedin.com/in/jamie-ardiente/" target="_blank" className="text-[var(--primary-color)] text-sm sm:text-base font-bold hover:text-[var(--accent-color)]">LinkedIn</a>
                        <a href="https://heyzine.com/flip-book/05e9a6b374.html" target="_blank" className="text-[var(--primary-color)] text-sm sm:text-base font-bold hover:text-[var(--accent-color)]">Magazine Portfolio</a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default PortfolioContent;
