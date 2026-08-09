import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import PageTransition from './components/layout/PageTransition';
import NewsletterPopup from './components/ui/NewsletterPopup';
import Home from './pages/Home';
import About from './pages/About';
import Rhinoplasty from './pages/Rhinoplasty';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Booking from './pages/Booking';
import Contact from './pages/Contact';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition keyProp="/"><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition keyProp="/about"><About /></PageTransition>} />
        <Route path="/rhinoplasty" element={<PageTransition keyProp="/rhinoplasty"><Rhinoplasty /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition keyProp="/gallery"><Gallery /></PageTransition>} />
        <Route path="/testimonials" element={<PageTransition keyProp="/testimonials"><Testimonials /></PageTransition>} />
        <Route path="/booking" element={<PageTransition keyProp="/booking"><Booking /></PageTransition>} />
        <Route path="/contact" element={<PageTransition keyProp="/contact"><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-ivory">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <WhatsAppButton />
        <NewsletterPopup />
      </div>
    </BrowserRouter>
  );
}
