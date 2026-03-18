import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ hidden = false }) => {
  if (hidden) return null;

  const [active, setActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 150);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const getNavLink = (id) => (location.pathname === "/" ? `#${id}` : `/#${id}`);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { label: "Home", href: "/", isLink: true },
    { label: "About", href: "#about", isLink: false },
    { label: "Project", href: "#project", isLink: false },
    { label: "Certificates", href: "/certificates", isLink: true },
    { label: "Contact", href: "#contact", isLink: false },
  ];

  return (
    <>
      <nav className="navbar sticky top-0 z-40 py-5 flex items-center justify-between px-6 md:px-12 bg-black/40 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        
        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeMobileMenu();
          }}>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent hover:from-violet-300 hover:to-purple-400 transition-all cursor-pointer">
              Rafi
            </h1>
          </Link>
        </div>

        {/* Menu Navigasi - Desktop */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.isLink ? (
                <Link 
                  to={item.href}
                  className={`text-lg font-medium transition relative group ${
                    (item.href === "/" && location.pathname === "/") || 
                    (item.href === "/certificates" && location.pathname === "/certificates")
                      ? 'text-violet-400' 
                      : 'text-white hover:text-violet-400'
                  }`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <a 
                  href={getNavLink(item.href.replace('#', ''))}
                  className="text-lg font-medium text-white hover:text-violet-400 transition relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative z-50 group"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 transform ${
            mobileMenuOpen ? "rotate-45 translate-y-2" : "group-hover:bg-violet-400"
          }`} />
          <span className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${
            mobileMenuOpen ? "opacity-0" : "group-hover:bg-violet-400"
          }`} />
          <span className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 transform ${
            mobileMenuOpen ? "-rotate-45 -translate-y-2" : "group-hover:bg-violet-400"
          }`} />
        </button>
      </nav>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu - Drawer from Right */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-zinc-900/95 via-black/80 to-zinc-950/95 backdrop-blur-xl border-l border-violet-500/30 z-40 md:hidden transition-transform duration-300 ease-out ${
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        
        {/* Close Button */}
        <button
          onClick={closeMobileMenu}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-white hover:text-violet-400 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Menu Items */}
        <div className="mt-16 px-6 space-y-2">
          <div className="text-xs font-semibold text-violet-400/60 uppercase tracking-wider mb-6 block">Navigation</div>
          {navItems.map((item, index) => (
            <div key={item.label} className="overflow-hidden">
              {item.isLink ? (
                <Link 
                  to={item.href}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    (item.href === "/" && location.pathname === "/") || 
                    (item.href === "/certificates" && location.pathname === "/certificates")
                      ? 'bg-violet-500/20 text-violet-400' 
                      : 'text-white hover:bg-white/5 hover:text-violet-400'
                  }`}
                  style={{
                    animation: mobileMenuOpen ? `slideInUp 0.3s ease-out ${index * 0.05}s forwards` : 'none',
                    opacity: mobileMenuOpen ? 1 : 0,
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <a 
                  href={getNavLink(item.href.replace('#', ''))}
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-lg font-medium text-white hover:bg-white/5 hover:text-violet-400 transition-all duration-300"
                  style={{
                    animation: mobileMenuOpen ? `slideInUp 0.3s ease-out ${index * 0.05}s forwards` : 'none',
                    opacity: mobileMenuOpen ? 1 : 0,
                  }}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;