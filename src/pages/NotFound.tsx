import { Link } from 'react-router-dom';
import SEO from '../components/layout/SEO';

export default function NotFound() {
  return (
    <section className="pt-40 pb-24 px-6 text-center bg-paper">
      <SEO title="Page Not Found | Dr. Vijay Khatri" description="This page could not be found. Browse the website or contact the practice." path="/404" noindex />
      <p className="section-label">404</p>
      <h1 className="font-serif text-4xl text-charcoal mt-4 mb-6">Page not found</h1>
      <p className="font-sans text-muted mb-8">The page may have moved, or the address may be incorrect.</p>
      <Link to="/" className="btn-primary">Return to Home</Link>
    </section>
  );
}
