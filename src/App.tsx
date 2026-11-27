import { lazy, Suspense, useEffect, type ComponentType } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import PageTransition from './components/layout/PageTransition';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
const LazyAbout = lazy(() => import('./pages/About'));
const LazyRhinoplasty = lazy(() => import('./pages/Rhinoplasty'));
const LazyGallery = lazy(() => import('./pages/Gallery'));
const LazyTestimonials = lazy(() => import('./pages/Testimonials'));
const LazyBooking = lazy(() => import('./pages/Booking'));
const LazyContact = lazy(() => import('./pages/Contact'));
const LazyBlog = lazy(() => import('./pages/Blog'));
const LazyBlogPost = lazy(() => import('./pages/BlogPost'));
const LazyFAQ = lazy(() => import('./pages/FAQ'));

// Keep the prerendered document visible while the initial route chunk loads.
// Mount its resolved component directly, so Suspense cannot collapse the page
// to a small loading placeholder and move the footer during startup.
const initialPages: Partial<Record<string, ComponentType>> = {};
export async function prepareInitialRoute(path: string) {
  const loaders: Record<string, () => Promise<{ default: ComponentType }>> = {
    '/about': () => import('./pages/About'),
    '/rhinoplasty': () => import('./pages/Rhinoplasty'),
    '/gallery': () => import('./pages/Gallery'),
    '/testimonials': () => import('./pages/Testimonials'),
    '/booking': () => import('./pages/Booking'),
    '/contact': () => import('./pages/Contact'),
    '/blog': () => import('./pages/Blog'),
    '/faq': () => import('./pages/FAQ'),
  };
  const key = path.replace(/\/$/, '') || '/';
  if (key.startsWith('/blog/')) initialPages.BlogPost = (await import('./pages/BlogPost')).default;
  else if (loaders[key]) initialPages[key] = (await loaders[key]()).default;
}

function AnimatedRoutes() {
  const location = useLocation();
  const About = initialPages['/about'] || LazyAbout;
  const Rhinoplasty = initialPages['/rhinoplasty'] || LazyRhinoplasty;
  const Gallery = initialPages['/gallery'] || LazyGallery;
  const Testimonials = initialPages['/testimonials'] || LazyTestimonials;
  const Booking = initialPages['/booking'] || LazyBooking;
  const Contact = initialPages['/contact'] || LazyContact;
  const Blog = initialPages['/blog'] || LazyBlog;
  const FAQ = initialPages['/faq'] || LazyFAQ;
  const BlogPost = initialPages.BlogPost || LazyBlogPost;

  return (
    <AnimatePresence mode="wait" initial={false}>
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
  useEffect(() => { document.getElementById('root')?.setAttribute('data-app-ready', 'true'); }, []);
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-paper">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <Navbar />
            <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 overflow-x-clip">
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
