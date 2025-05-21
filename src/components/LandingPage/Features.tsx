
import { 
  Calendar, FileText, Shield, Lock, Headset, FileSignature
} from "lucide-react";

const benefits = [
  {
    icon: Calendar,
    title: "Agendamento Inteligente e Otimizado",
    description: "Visualize sua agenda diária de forma clara e completa. Com o OdontoGenda, você gerencia seus compromissos, acompanha o status de cada consulta e identifica horários disponíveis com agilidade, permitindo um planejamento eficiente e produtivo do seu tempo."
  },
  {
    icon: FileText,
    title: "Acesso Imediato ao Histórico Completo do Paciente",
    description: "Tenha todas as informações cruciais dos seus pacientes ao alcance de um clique. Registre evoluções de tratamento, gerencie informações financeiras, consulte históricos detalhados e acesse dados relevantes de forma segura e organizada, diretamente no seu dispositivo preferido."
  },
  {
    icon: FileSignature,
    title: "Documentação Visual Integrada e Prática",
    description: "Agilize o registro clínico utilizando a câmera do seu smartphone ou tablet para capturar e anexar imagens diretamente ao prontuário digital do paciente. Ideal para acompanhamento preciso e comunicação visual com pacientes."
  },
  {
    icon: Shield,
    title: "Segurança de Nível Internacional para Seus Dados",
    description: "A proteção das informações dos seus pacientes é nosso compromisso. Utilizamos infraestrutura de ponta e protocolos de segurança avançados, similares aos de grandes bancos, para garantir a integridade e confidencialidade dos seus dados."
  },
  {
    icon: Headset,
    title: "Suporte Humanizado e Especializado ao Seu Dispor",
    description: "Valorizamos o atendimento personalizado. Nossa equipe de especialistas está pronta para auxiliar em cada etapa, garantindo uma experiência tranquila e produtiva com nossa plataforma."
  },
  {
    icon: FileText,
    title: "Migração de Dados Simplificada e Gratuita",
    description: "Transfira seus dados de outros softwares ou planilhas para o OdontoGenda sem complicações e sem custos adicionais. Nossa equipe cuida de todo o processo para uma transição suave."
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="odonto-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
            Descubra os Diferenciais que Elevam a Gestão da Sua Clínica:
          </h2>
          <p className="text-lg text-gray-600 font-inter">
            O OdontoGenda foi meticulosamente desenvolvido para oferecer uma experiência de gestão superior, 
            integrando todas as funcionalidades essenciais para otimizar cada aspecto da sua prática odontológica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="odonto-card flex flex-col items-start">
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <benefit.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-poppins">{benefit.title}</h3>
              <p className="text-gray-600 font-inter">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
