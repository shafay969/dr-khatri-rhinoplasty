import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/rhinoplasty', label: 'Rhinoplasty' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/blog', label: 'Journal' },
  { to: '/faq', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-500 ${
          scrolled || !isHomePage
            ? 'glass-surface shadow-card scroll-edge'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col leading-none group">
              <span className={`font-serif text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                scrolled || !isHomePage ? 'text-charcoal' : 'text-white'
              }`}>
                Dr. Vijay Khatri
              </span>
              <span className={`font-sans text-[10px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                scrolled || !isHomePage ? 'text-clay' : 'text-clay-light'
              }`}>
                Rhinoplasty · Karachi
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `font-sans text-[13px] xl:text-sm tracking-wide transition-colors duration-200 relative group whitespace-nowrap ${
                      isActive
                        ? 'text-clay font-medium'
                        : scrolled || !isHomePage
                        ? 'text-charcoal hover:text-clay'
                        : 'text-white/80 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={`absolute -bottom-1 left-0 h-px bg-clay transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </>
                  )}
                </NavLink>
              ))}
              <Link
                to="/booking"
                id="nav-book-cta"
                className="btn-primary !py-2.5 !px-5 !text-xs"
              >
                Book Consultation
              </Link>
            </nav>

            {/* Mobile Hamburger */}
            <motion.button
              id="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className={`lg:hidden flex flex-col gap-1.5 p-2 transition-colors duration-200 ${
                scrolled || !isHomePage ? 'text-charcoal' : 'text-white'
              }`}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-current origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block w-6 h-px bg-current"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-current origin-center"
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-charcoal flex flex-col pt-24 px-8 pb-12 lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block font-serif text-3xl py-3 border-b border-white/10 transition-colors duration-200 ${
                        isActive ? 'text-clay' : 'text-white hover:text-clay'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10"
            >
              <Link to="/booking" className="btn-primary w-full justify-center text-base py-4">
                Book a Consultation
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto"
            >
              <p className="font-sans text-white/40 text-xs tracking-widest uppercase">
                Rhinoplasty · Karachi
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
