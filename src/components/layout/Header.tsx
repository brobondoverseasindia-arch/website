import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b",
        isScrolled
          ? "border-gray-200 shadow-lg shadow-black/5 py-2"
          : "border-gray-100 py-3"
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-10 flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E0323C] text-white shadow-lg shadow-[#E0323C]/20 transition-transform group-hover:scale-105">
              <span className="text-xl font-black font-heading">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black font-heading leading-none tracking-tight text-[#212529]">
                BROBOND
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-gray-400 font-sans">
                Overseas
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — Pill Style */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-gray-50 border border-gray-100">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-300 relative font-sans tracking-wide",
                    location.pathname === link.href
                      ? "bg-white text-[#E0323C] shadow-sm ring-1 ring-gray-200"
                      : "text-gray-600 hover:text-[#E0323C] hover:bg-white/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center">
              <Button
                asChild
                className="font-sans font-bold tracking-wider rounded-full px-7 h-11 bg-[#E0323C] text-white hover:bg-[#c92a34] shadow-lg shadow-[#E0323C]/20 hover:-translate-y-0.5 transition-all text-sm"
              >
                <Link to="/contact">
                  Enquire Now
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-xl text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-[68px] z-40 bg-white md:hidden overflow-hidden"
          >
            <nav className="container-wide py-8 flex flex-col gap-2 h-full">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "flex items-center justify-between text-2xl font-heading font-bold py-4 border-b border-gray-100",
                      location.pathname === link.href
                        ? "text-[#E0323C]"
                        : "text-gray-900"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                    <ArrowRight className={cn(
                      "w-5 h-5 transition-transform",
                      location.pathname === link.href ? "opacity-100" : "opacity-0"
                    )} />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Button asChild size="lg" className="w-full bg-[#E0323C] text-white rounded-2xl h-14 text-lg font-bold shadow-xl shadow-[#E0323C]/20">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Enquire Now
                  </Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
