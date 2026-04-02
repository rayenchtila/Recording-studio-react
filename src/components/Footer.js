import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/IMAGE/21 21.jpg";

export default function Footer() {
  const location = useLocation();
  
  // Check if the current path is exactly the home page
  const isHomePage = location.pathname === "/";

  return (
    <footer className="w-full bg-black border-t border-white/10">

      {/* ── MAIN CONTENT ── */}
      <div className="w-full px-16 py-20 flex flex-col md:flex-row justify-between items-center gap-16">

        {/* LEFT: Logo + text */}
        <div className="flex flex-col gap-6 max-w-sm items-center md:items-start text-center md:text-left">
          <NavLink to="/" className="flex items-center gap-5">
            <img
              src={logo}
              alt="21 Records"
              className="w-24 h-24 rounded-2xl object-cover shadow-2xl"
            />
            {/* Show "21 RECORDS" only on Home Page */}
            {isHomePage && (
              <span className="text-3xl font-bold text-white tracking-tight">
                21 RECORDS
              </span>
            )}
          </NavLink>

          {/* Show Description only on Home Page */}
          {isHomePage && (
            <p className="text-gray-500 text-base leading-relaxed">
              The next generation platform for music creators and industry professionals. Built for 2026 and beyond.
            </p>
          )}

          {/* Social icons - ALWAYS VISIBLE */}
          <div className="flex items-center gap-3 mt-2">
            <a 
              href="https://www.instagram.com/21_records_label?igsh=MW43N29lZHlpdHF5aw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-2xl border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>

            <a 
              href="https://m.youtube.com/playlist?list=PL75s8vJKhKr6QD5jdf68HuKeNQJvD00RK" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-2xl border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a> 

            <a 
              href="https://www.tiktok.com/@21records.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-2xl border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.417 6.417 0 0 1-1.87-1.56v7.37c-.03 2.44-.71 4.96-2.5 6.63-1.6 1.51-3.9 2.21-6.04 1.93-2.11-.25-4.14-1.48-5.18-3.34-1.12-1.96-1.14-4.52-.08-6.5 1.02-1.92 3.09-3.23 5.24-3.41.25-.03.5-.03.75-.02v4.02c-.17-.02-.34-.02-.52.01-1.07.13-2.12.8-2.61 1.77-.49.97-.4 2.19.23 3.06.63.88 1.75 1.34 2.83 1.13 1.08-.22 1.98-1.15 2.19-2.23.06-.3.07-.61.07-.91V0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── BOTTOM: Copyright Section (Visible ONLY on Home Page) ── */}
      {isHomePage && (
        <>
          <div className="w-full px-16">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="w-full px-16 py-8 flex justify-center">
            <p className="text-gray-600 text-sm">
              © 2026 21 Records. All rights reserved.
            </p>
          </div>
        </>
      )}

    </footer>
  );
}