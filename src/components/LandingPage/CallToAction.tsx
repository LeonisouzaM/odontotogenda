
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="odonto-container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
            Pronto para Elevar a Gestão da Sua Clínica Odontológica?
          </h2>
          <p className="text-xl opacity-90 mb-8 font-inter">
            Junte-se a milhares de dentistas que transformaram suas clínicas com o OdontoGenda. 
            Inicie seu teste gratuito de 7 dias agora mesmo e descubra um novo nível de eficiência e organização.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-inter font-semibold">
                Iniciar Teste Gratuito por 7 Dias
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700 font-inter">
                Agendar Demonstração Personalizada
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
