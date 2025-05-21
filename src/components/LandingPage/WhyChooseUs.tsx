
import { Check, Shield, Globe, Headset, BarChart3 } from "lucide-react";

const reasons = [
  {
    icon: Check,
    title: "Intuitivo e Fácil de Usar",
    description: "Nossa plataforma possui uma interface amigável e de fácil aprendizado, permitindo que você e sua equipe utilizem todos os recursos sem necessidade de conhecimento técnico avançado."
  },
  {
    icon: Shield,
    title: "Segurança de Dados Incomparável",
    description: "Com servidores de ponta e protocolos de segurança avançados, seus dados e os de seus pacientes estão protegidos 24/7, acessíveis de qualquer dispositivo com total tranquilidade."
  },
  {
    icon: Globe,
    title: "Gestão Flexível, Onde Você Estiver",
    description: "Acesse e gerencie todas as informações da sua clínica de qualquer lugar, a qualquer hora, seja no computador, tablet ou smartphone, garantindo total mobilidade."
  },
  {
    icon: Headset,
    title: "Suporte Dedicado e Humanizado",
    description: "Conte com uma equipe de especialistas reais, prontos para oferecer um atendimento ágil, personalizado e eficiente, tornando sua jornada tecnológica mais fácil e agradável."
  },
  {
    icon: BarChart3,
    title: "Resultados Comprovados Rapidamente",
    description: "Veja o impacto positivo na sua rotina desde o início: otimização do tempo, melhor organização, maior engajamento dos pacientes e uma gestão financeira mais eficiente."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="odonto-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
            Por Que o OdontoGenda é a Escolha Certa para Sua Clínica?
          </h2>
          <p className="text-lg text-gray-600 font-inter">
            O OdontoGenda é construído sobre pilares de excelência, segurança e parceria, pensando em cada detalhe para facilitar sua rotina e impulsionar seus resultados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="flex gap-4 items-start p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="bg-blue-100 p-3 rounded-full">
                <reason.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 font-poppins">{reason.title}</h3>
                <p className="text-gray-600 font-inter">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
