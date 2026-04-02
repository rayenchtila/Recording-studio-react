import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/IMAGE/21 21.jpg";

const navLinks = [
  { label: "Home", href: "/", sectionId: "home" },
  { label: "Features", href: "/features", sectionId: "features" },
  { label: "Pricing", href: "/pricing", sectionId: "pricing" },
  { label: "Book", href: "/book", sectionId: "book" },
];

function DarkModeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300"
    >
      {dark ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const sections = ["home", "features", "pricing", "book"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const handleNavClick = (link) => {
    if (isHome) {
      const el = document.getElementById(link.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(link.sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    setMenuOpen(false);
  };

  const isActive = (link) => {
    if (isHome) {
      return activeSection === link.sectionId;
    }
    return location.pathname === link.href;
  };

  const linkClass = (link) =>
    `text-base px-4 py-2 sm:text-lg sm:px-6 sm:py-3 rounded-2xl transition-all duration-200 font-medium tracking-wide cursor-pointer ${
      isActive(link)
        ? "text-black bg-white shadow-lg"
        : "text-gray-400 hover:text-white hover:bg-white/10"
    }`;

  return (
    <header className="w-full bg-black border-b border-white/10 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-8 md:px-16 h-20 sm:h-24 md:h-28 flex items-center justify-between">

        {/* ── FAR LEFT: Logo + 21 RECORDS ── */}
        <div
          className="flex items-center gap-2 sm:gap-4 cursor-pointer"
          onClick={() => handleNavClick({ sectionId: "home", href: "/" })}
        >
          <img
            src={logo}
            alt="21 Records"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-2xl object-cover"
          />
          <span className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight">21 RECORDS</span>
        </div>

        {/* ── CENTER: Nav ── */}
        <nav className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className={linkClass(link)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* ── FAR RIGHT: Dark Mode Toggle ── */}
        <div className="hidden md:flex items-center">
          <DarkModeToggle />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 sm:p-3 rounded-2xl border border-white/20 hover:bg-white/10 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-6 py-6 flex flex-col gap-2 bg-black">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className={`${linkClass(link)} w-full text-left`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-white/10">
            <div className="flex justify-center mb-2">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}