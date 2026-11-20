import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import PageTransition from './components/layout/PageTransition';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Rhinoplasty = lazy(() => import('./pages/Rhinoplasty'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Booking = lazy(() => import('./pages/Booking'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const FAQ = lazy(() => import('./pages/FAQ'));

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
        <Route path="/blog" element={<PageTransition keyProp="/blog"><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition keyProp="/blog/:slug"><BlogPost /></PageTransition>} />
        <Route path="/faq" element={<PageTransition keyProp="/faq"><FAQ /></PageTransition>} />
        <Route path="/booking" element={<PageTransition keyProp="/booking"><Booking /></PageTransition>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contact" element={<PageTransition keyProp="/contact"><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-paper">
            <Navbar />
            <main className="flex-1 min-w-0 overflow-x-clip">
              <Suspense fallback={<div className="pt-40 pb-24 text-center" role="status">Loading page…</div>}>
                <AnimatedRoutes />
              </Suspense>
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </BrowserRouter>
      </MotionConfig>
    </HelmetProvider>
  );
}
