import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'subscribed'>('idle');

  useEffect(() => {
    // Check if the user has already subscribed or closed the modal
    const dismissed = localStorage.getItem('dr_khatri_newsletter_dismissed');
    if (!dismissed) {
      // Open the popup with a 2.5 second delay for a premium feel
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('dr_khatri_newsletter_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // PLACEHOLDER — replace with newsletter integration API (e.g. Mailchimp, ConvertKit) before launch
    console.log('Newsletter subscription:', { name, email });
    setStatus('subscribed');

    // Auto close after 2 seconds on success
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-md">
          {/* Backdrop Click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative w-full max-w-lg overflow-hidden bg-charcoal border border-gold/20 rounded-2xl p-8 md:p-10 shadow-gold"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Elegant Background Gradients */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gold/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-gold/5 blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close popup"
              className="absolute top-4 right-4 text-white/40 hover:text-gold transition-colors duration-200"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>

            {status === 'subscribed' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-white font-medium mb-2">Thank You</h3>
                <p className="font-sans text-sm text-white/60">
                  {/* PLACEHOLDER — replace before launch */}
                  You are now subscribed to Dr. Khatri's updates and priority announcements.
                </p>
              </motion.div>
            ) : (
              <div className="relative">
                {/* Header */}
                <span className="section-label block mb-2 text-center md:text-left">Exclusive Insights</span>
                <h3 className="font-serif text-2xl md:text-3xl text-white font-semibold leading-tight text-center md:text-left mb-3">
                  Join the Rhinoplasty Circle
                </h3>
                <p className="font-sans text-sm text-white/60 leading-relaxed text-center md:text-left mb-6">
                  {/* PLACEHOLDER — newsletter info copy. Replace with verified copy before launch */}
                  Receive clinical case studies, updates on Dr. Khatri's Turkish technique research, and priority booking notifications in Karachi.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="newsletter-name" className="sr-only">First Name</label>
                    <input
                      id="newsletter-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your First Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email Address"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center text-sm py-3.5 mt-2"
                  >
                    Subscribe for Updates
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="font-sans text-[11px] text-white/30 hover:text-white/60 text-center tracking-wider uppercase transition-colors mt-2"
                  >
                    No thanks, I prefer generic updates
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
