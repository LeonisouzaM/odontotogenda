
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "R$ 99",
    description: "Ideal para dentistas autônomos que estão começando",
    features: [
      "Agenda online para 1 profissional",
      "Prontuário digital básico",
      "Controle financeiro simples",
      "Lembretes por SMS/Email",
      "Site básico integrado",
      "Suporte por email"
    ],
    cta: "Teste grátis 7 dias",
    highlight: false
  },
  {
    name: "Profissional",
    price: "R$ 249",
    description: "Perfeito para clínicas em crescimento",
    features: [
      "Agenda online para 5 profissionais",
      "Prontuário digital completo",
      "Gestão financeira completa",
      "Lembretes por WhatsApp",
      "Site personalizado integrado",
      "Aplicativo para pacientes",
      "Suporte prioritário"
    ],
    cta: "Teste grátis 7 dias",
    highlight: true
  },
  {
    name: "Master",
    price: "R$ 499",
    description: "Para redes de clínicas e franquias",
    features: [
      "Agenda online ilimitada",
      "Prontuário digital completo",
      "Gestão financeira completa",
      "Lembretes personalizados",
      "Marketing digital integrado",
      "Aplicativos personalizados",
      "Gestão de múltiplas unidades",
      "Suporte 24/7 dedicado"
    ],
    cta: "Entre em contato",
    highlight: false
  }
];

export default function Pricing() {
  return (
    <section className="py-20 bg-white">
      <div className="odonto-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
            Planos Flexíveis para Impulsionar o Crescimento da Sua Clínica
          </h2>
          <p className="text-lg text-gray-600 font-inter">
            Escolha o plano ideal para o tamanho da sua clínica e cresça com o OdontoGenda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-md p-8 border transition-all ${
                plan.highlight 
                  ? "border-blue-600 relative transform md:-translate-y-4 md:scale-105" 
                  : "border-gray-100"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium font-inter">
                  Mais popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 font-poppins">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold font-poppins">{plan.price}</span>
                <span className="text-gray-500 font-inter">/mês</span>
              </div>
              <p className="text-gray-600 mb-6 font-inter">{plan.description}</p>
              <div className="mb-8">
                <p className="font-semibold mb-3 font-poppins">O que está incluído:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-600 shrink-0 mr-2" />
                      <span className="text-gray-600 text-sm font-inter">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/register" className="block">
                <Button 
                  className={`w-full font-inter font-semibold ${
                    plan.highlight 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
