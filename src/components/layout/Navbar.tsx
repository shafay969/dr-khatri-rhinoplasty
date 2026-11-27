import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' }, { to: '/about', label: 'About' },
  { to: '/rhinoplasty', label: 'Rhinoplasty' }, { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Testimonials' }, { to: '/blog', label: 'Journal' },
  { to: '/faq', label: 'FAQs' }, { to: '/contact', label: 'Contact' },
];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef=useRef<HTMLButtonElement>(null);
  const panelRef=useRef<HTMLDivElement>(null);
  const location=useLocation();
  useEffect(()=>{
    const handleScroll=()=>setScrolled(window.scrollY>40);
    handleScroll();window.addEventListener('scroll',handleScroll,{passive:true});
    return ()=>window.removeEventListener('scroll',handleScroll);
  },[]);
  useEffect(()=>setMenuOpen(false),[location]);
  useEffect(()=>{
    if(!menuOpen)return;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const blocked=[...document.querySelectorAll<HTMLElement>('main,footer,#floating-whatsapp-btn')];
    const previousInert=blocked.map(el=>el.inert);blocked.forEach(el=>el.inert=true);
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const keydown=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();setMenuOpen(false);toggleRef.current?.focus();}
      if(event.key==='Tab'){
        const links=[...panelRef.current!.querySelectorAll<HTMLElement>('a[href]')];
        const items=[toggleRef.current!,...links];
        const current=items.indexOf(document.activeElement as HTMLElement);
        const next=event.shiftKey?(current<=0?items.length-1:current-1):(current+1)%items.length;
        event.preventDefault();items[next]?.focus();
      }
    };
    const resize=()=>{if(window.matchMedia('(min-width:1024px)').matches)setMenuOpen(false);};
    document.addEventListener('keydown',keydown);window.addEventListener('resize',resize);
    return ()=>{document.body.style.overflow=previousOverflow;blocked.forEach((el,i)=>el.inert=previousInert[i]);document.removeEventListener('keydown',keydown);window.removeEventListener('resize',resize);};
  },[menuOpen]);
  const dark=menuOpen || (location.pathname==='/'&&!scrolled);
  return <>
    <header className={`site-navigation fixed top-0 left-0 right-0 z-50 ${menuOpen?'navigation-dark bg-charcoal':dark?'navigation-dark bg-transparent':'navigation-light'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <Link to="/" tabIndex={menuOpen?-1:undefined} className="flex flex-col leading-none shrink-0">
            <span className={`font-serif text-lg md:text-xl font-semibold tracking-tight ${dark?'text-white':'text-charcoal'}`}>Dr. Vijay Khatri</span>
            <span className={`font-sans text-[10px] tracking-[0.18em] uppercase mt-1 ${dark?'text-clay-light':'text-clay-dark'}`}>Rhinoplasty · Karachi</span>
          </Link>
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map(link=><NavLink key={link.to} to={link.to} end={link.to==='/'} className={({isActive})=>`nav-link font-sans text-[13px] xl:text-sm py-3 whitespace-nowrap ${isActive?(dark?'text-clay-light':'text-clay-dark'):(dark?'text-white/90':'text-charcoal')}`}>{link.label}</NavLink>)}
            <Link to="/booking" id="nav-book-cta" className="btn-primary !py-3 !px-5 !text-xs">Book Consultation</Link>
          </nav>
          <button ref={toggleRef} type="button" id="mobile-menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" className={`lg:hidden w-11 h-11 inline-flex flex-col items-center justify-center gap-1.5 shrink-0 ${dark?'text-white':'text-charcoal'}`}>
            <span className={`block w-6 h-px bg-current ${menuOpen?'rotate-45 translate-y-[7px]':''}`}/>
            <span className={`block w-6 h-px bg-current ${menuOpen?'opacity-0':''}`}/>
            <span className={`block w-6 h-px bg-current ${menuOpen?'-rotate-45 -translate-y-[7px]':''}`}/>
          </button>
        </div>
      </div>
    </header>
    {menuOpen&&<div ref={panelRef} className="navigation-dark fixed inset-0 z-40 bg-charcoal flex flex-col pt-20 md:pt-24 px-6 pb-8 lg:hidden overflow-y-auto">
      <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-col">
        {navLinks.map(link=><NavLink key={link.to} to={link.to} end={link.to==='/'} className={({isActive})=>`block font-serif text-2xl py-3 border-b border-white/15 ${isActive?'text-clay-light':'text-white'}`}>{link.label}</NavLink>)}
        <Link to="/booking" className="btn-primary w-full justify-center text-base py-4 mt-6">Book a Consultation</Link>
      </nav>
      <p className="font-sans text-white/80 text-xs tracking-widest uppercase mt-8">Rhinoplasty · Karachi</p>
    </div>}
  </>;
}
