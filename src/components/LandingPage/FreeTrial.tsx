
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function FreeTrial() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="odonto-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
            Experimente o OdontoGenda Gratuitamente por 7 Dias!
          </h2>
          <p className="text-xl text-gray-600 mb-8 font-inter">
            Descubra na prática como o OdontoGenda pode transformar a gestão da sua clínica. 
            Explore todas as funcionalidades e benefícios sem compromisso e sinta a diferença 
            de um software que realmente entende suas necessidades.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto font-inter font-semibold">
              Iniciar Teste Gratuito por 7 Dias
            </Button>
          </Link>
          
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
              <span>Sem Fidelidade: Liberdade para decidir.</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
              <span>Capacitação Completa: Treinamento gratuito e descomplicado.</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
              <span>Evolução Contínua: Inspirada em você, profissional.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
