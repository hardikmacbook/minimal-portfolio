import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaHome } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#home", icon: <FaHome className="inline-block mr-1 mb-0.5" size={18} /> },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/",
    icon: <FaGithub size={22} />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/",
    icon: <FaLinkedin size={22} />,
  },
];

const linkVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.1, type: "spring", stiffness: 100 } },
  hover: {
    scale: 1.15,
    color: "#fff",
    textShadow: "0px 0px 16px #38bdf8, 0px 0px 8px #fff",
    transition: { type: "spring", stiffness: 300 },
  },
  active: {
    scale: 1.18,
    color: "#38bdf8",
    textShadow: "0px 0px 24px #38bdf8, 0px 0px 8px #fff",
    transition: { type: "spring", stiffness: 400 },
  },
};

const socialVariants = {
  hover: {
    scale: 1.2,
    boxShadow: "0px 0px 12px #38bdf8, 0px 0px 4px #fff",
    color: "#38bdf8",
    transition: { type: "spring", stiffness: 300 },
  },
};

const menuVariants = {
  closed: { x: "100%", opacity: 0 },
  open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 80 } },
};

const overlayVariants = {
  closed: { opacity: 0, pointerEvents: "none" },
  open: { opacity: 1, pointerEvents: "auto" },
};

const getCurrentSection = () => {
  const offsets = navLinks.map((link) => {
    const el = document.querySelector(link.href);
    if (!el) return { name: link.name, top: Infinity };
    const rect = el.getBoundingClientRect();
    return { name: link.name, top: Math.abs(rect.top) };
  });
  offsets.sort((a, b) => a.top - b.top);
  return offsets[0]?.name || "Home";
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => {
      setActive(getCurrentSection());
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href, name) => {
    setMenuOpen(false);
    setActive(name);
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 flex justify-center items-center w-full h-16 pointer-events-none bg-transparent">
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="pointer-events-auto w-[96vw] max-w-3xl mx-auto rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-between px-4 sm:px-8 py-2 mt-2"
        style={{ backdropFilter: "blur(18px)" }}
      >
        {/* Logo or Brand */}
        <a
          href="#home"
          className="font-extrabold text-lg sm:text-xl text-white tracking-widest select-none drop-shadow-lg flex items-center gap-1"
          onClick={() => handleNavClick("#home", "Home")}
        >
          <FaHome className="text-cyan-400 drop-shadow-md" size={22} />
          MyPortfolio
        </a>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <motion.li
              key={link.name}
              variants={linkVariants}
              initial="initial"
              animate={active === link.name ? "active" : "animate"}
              whileHover="hover"
              className="relative"
            >
              <button
                onClick={() => handleNavClick(link.href, link.name)}
                className={`font-medium px-2 py-1 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 relative group text-white/90 ${active === link.name ? "text-cyan-400" : "hover:text-cyan-300"}`}
              >
                {link.icon ? (
                  <span className="inline-block align-middle mr-1 text-cyan-400 group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </span>
                ) : null}
                {link.name}
                <span className={`absolute left-0 -bottom-1 w-full h-0.5 rounded bg-cyan-400 transition-all duration-300 ${active === link.name ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}></span>
              </button>
            </motion.li>
          ))}
        </ul>
        {/* Social Links (always visible) */}
        <div className="flex gap-3 items-center ml-2">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-cyan-400 transition-colors duration-200 p-1 rounded-full bg-white/0 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              aria-label={social.name}
              whileHover="hover"
              variants={socialVariants}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-50 relative ml-2"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="overlay"
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-end md:hidden z-40"
              onClick={() => setMenuOpen(false)}
            >
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="w-full max-w-xs h-full bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-2xl shadow-2xl border-l border-white/20 flex flex-col items-center justify-center gap-8 relative px-6 py-10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-6 w-full items-center">
                  {navLinks.map((link) => (
                    <motion.button
                      key={link.name}
                      onClick={() => handleNavClick(link.href, link.name)}
                      whileHover={{ scale: 1.12, color: "#38bdf8", textShadow: "0px 0px 16px #38bdf8, 0px 0px 8px #fff" }}
                      animate={active === link.name ? { scale: 1.15, color: "#38bdf8", textShadow: "0px 0px 24px #38bdf8, 0px 0px 8px #fff" } : {}}
                      className={`text-white/90 text-xl font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400/30 w-full text-center bg-white/5 hover:bg-white/10 transition-colors relative group ${active === link.name ? "text-cyan-400" : "hover:text-cyan-300"}`}
                    >
                      {link.icon ? (
                        <span className="inline-block align-middle mr-1 text-cyan-400 group-hover:scale-110 transition-transform duration-200">
                          {link.icon}
                        </span>
                      ) : null}
                      {link.name}
                      <span className={`absolute left-0 -bottom-1 w-full h-0.5 rounded bg-cyan-400 transition-all duration-300 ${active === link.name ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}></span>
                    </motion.button>
                  ))}
                </div>
                <div className="flex gap-6 mt-10">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-cyan-400 transition-colors duration-200 p-2 rounded-full bg-white/0 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                      aria-label={social.name}
                      whileHover="hover"
                      variants={socialVariants}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;
