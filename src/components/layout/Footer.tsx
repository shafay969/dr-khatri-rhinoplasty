import { Link } from 'react-router-dom';

// PLACEHOLDER — replace address, phone, email with verified clinic details before launch
const WHATSAPP_NUMBER = '+923332572052';
const WHATSAPP_MSG = encodeURIComponent("Hi, I'd like to book a rhinoplasty consultation.");
const INSTAGRAM = 'https://instagram.com/vijay.k.khatri';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Dr. Khatri' },
  { to: '/rhinoplasty', label: 'Rhinoplasty' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/booking', label: 'Book Consultation' },
  { to: '/contact', label: 'Contact' },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl font-semibold mb-1">Dr. Vijay Khatri</p>
            <p className="text-gold text-xs tracking-[0.18em] uppercase font-sans mb-5">
              Rhinoplasty · Karachi
            </p>
            <p className="font-sans text-white/50 text-sm leading-relaxed max-w-xs">
              {/* PLACEHOLDER — replace with verified clinic tagline before launch */}
              Turkish-trained rhinoplasty expertise — natural results that respect your face.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                id="footer-instagram-link"
                className="text-white/50 hover:text-gold transition-colors duration-200"
              >
                <InstagramIcon />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                id="footer-whatsapp-link"
                className="text-white/50 hover:text-green-400 transition-colors duration-200"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold mb-5 font-semibold">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-sans text-sm text-white/50 hover:text-gold transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold mb-5 font-semibold">
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                {/* PLACEHOLDER — replace with verified clinic address before launch */}
                <p className="font-sans text-sm text-white/50 leading-relaxed">
                  Clinic Address Placeholder,<br />
                  Clifton, Karachi, Pakistan
                </p>
              </li>
              <li>
                {/* PLACEHOLDER — replace with verified phone number before launch */}
                <a href="tel:+923332572052" className="font-sans text-sm text-white/50 hover:text-gold transition-colors duration-200">
                  +92 333 2572052
                </a>
              </li>
              <li>
                {/* PLACEHOLDER — replace with verified email before launch */}
                <a href="mailto:info@drkhatri.pk" className="font-sans text-sm text-white/50 hover:text-gold transition-colors duration-200">
                  info@drkhatri.pk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-white/30">
            © {new Date().getFullYear()} Dr. Vijay Khatri. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/20">
            {/* PLACEHOLDER — update disclaimer with real medical/legal text before launch */}
            Results may vary. All testimonials and statistics are for demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
