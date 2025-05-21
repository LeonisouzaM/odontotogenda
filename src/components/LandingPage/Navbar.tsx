
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="odonto-container py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Calendar className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-poppins font-bold text-gray-800">
            Odonto<span className="text-blue-600">Genda</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-inter">
          <Link to="/" className="font-medium hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/features" className="font-medium hover:text-blue-600 transition-colors">
            Recursos
          </Link>
          <Link to="/pricing" className="font-medium hover:text-blue-600 transition-colors">
            Planos
          </Link>
          <Link to="/contact" className="font-medium hover:text-blue-600 transition-colors">
            Contato
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 font-inter">
          <Link to="/login">
            <Button variant="outline">Entrar</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Teste Grátis
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-3 font-inter">
            <Link 
              to="/" 
              className="font-medium px-3 py-2 hover:bg-blue-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="font-medium px-3 py-2 hover:bg-blue-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Recursos
            </Link>
            <Link 
              to="/pricing" 
              className="font-medium px-3 py-2 hover:bg-blue-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Planos
            </Link>
            <Link 
              to="/contact" 
              className="font-medium px-3 py-2 hover:bg-blue-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contato
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Teste Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
