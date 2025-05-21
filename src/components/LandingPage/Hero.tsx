
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

export default function Hero() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <div className="odonto-container py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 mb-4">
              <span className="animate-pulse-gentle">✨ Gestão Odontológica Elevada à Excelência</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-poppins">
              OdontoGenda: Simplificando a gestão do seu consultório com um sorriso.
            </h1>
            <p className="text-lg text-gray-600 md:text-xl max-w-lg font-inter">
              Transforme a administração da sua clínica com uma solução intuitiva, completa e desenvolvida para o sucesso do seu dia a dia profissional. O OdontoGenda simplifica processos complexos, permitindo que você foque no mais importante: o cuidado com seus pacientes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-inter font-semibold">
                  Teste grátis por 7 dias
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="font-inter">
                  Ver demonstração
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-50 p-1.5">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-inter">Agendamento fácil</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-50 p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
                </div>
                <span className="text-sm font-inter">Prontuários digitais</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-50 p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
                </div>
                <span className="text-sm font-inter">Gestão completa</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?q=80&w=1470&auto=format&fit=crop" 
                alt="Consultório odontológico moderno" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold font-poppins">Interface Intuitiva e Completa</h3>
                  <p className="text-white/90 font-inter">Tudo o que você precisa, ao seu alcance</p>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -top-6 -left-6 w-72 h-72 bg-blue-50 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

