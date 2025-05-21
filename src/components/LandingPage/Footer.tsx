
import { Link } from "react-router-dom";
import { Calendar, Facebook, Instagram, Twitter, Youtube, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="odonto-container pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Calendar className="h-7 w-7 text-blue-600" />
              <span className="text-xl font-poppins font-bold text-gray-800">
                Odonto<span className="text-blue-600">Genda</span>
              </span>
            </Link>
            <p className="text-gray-600 mb-4 font-inter">
              Seu consultório na palma da mão. A plataforma completa para gestão de clínicas odontológicas.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 font-poppins">Empresa</h3>
            <ul className="space-y-3 font-inter">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Carreiras
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Parceiros
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 font-poppins">Produto</h3>
            <ul className="space-y-3 font-inter">
              <li>
                <Link to="/features" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Recursos
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Demonstração
                </Link>
              </li>
              <li>
                <Link to="/updates" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Atualizações
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 font-poppins">Contato</h3>
            <ul className="space-y-3 font-inter">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600">contato@odontogenda.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600">(11) 9999-9999</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-inter">
            © {new Date().getFullYear()} OdontoGenda. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 font-inter">
            <Link to="/terms" className="text-gray-500 text-sm hover:text-blue-600">
              Termos de Uso
            </Link>
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-blue-600">
              Política de Privacidade
            </Link>
            <Link to="/cookies" className="text-gray-500 text-sm hover:text-blue-600">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
