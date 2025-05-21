
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText, Users, CreditCard, MessageCircle, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const DemoPage = () => {
  const [activeTab, setActiveTab] = useState("agenda");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="odonto-container py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Calendar className="h-8 w-8 text-odonto-blue" />
            <span className="text-xl font-display font-bold text-gray-800">
              Odonto<span className="text-odonto-blue">Genda</span>
            </span>
          </Link>
          
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              Voltar para o site
            </Button>
          </Link>
        </div>
      </header>

      <div className="odonto-container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Demonstração do OdontoGenda</h1>
          <p className="text-gray-600 mb-8">
            Explore as principais funcionalidades do nosso sistema para clínicas odontológicas
          </p>

          <Tabs defaultValue="agenda" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
              <TabsTrigger value="agenda" className="flex flex-col items-center gap-1 py-2">
                <Calendar size={16} />
                <span>Agenda</span>
              </TabsTrigger>
              <TabsTrigger value="prontuario" className="flex flex-col items-center gap-1 py-2">
                <FileText size={16} />
                <span>Prontuário</span>
              </TabsTrigger>
              <TabsTrigger value="pacientes" className="flex flex-col items-center gap-1 py-2">
                <Users size={16} />
                <span>Pacientes</span>
              </TabsTrigger>
              <TabsTrigger value="financeiro" className="flex flex-col items-center gap-1 py-2">
                <CreditCard size={16} />
                <span>Financeiro</span>
              </TabsTrigger>
              <TabsTrigger value="crm" className="flex flex-col items-center gap-1 py-2">
                <MessageCircle size={16} />
                <span>CRM</span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex flex-col items-center gap-1 py-2">
                <Smartphone size={16} />
                <span>Mobile</span>
              </TabsTrigger>
            </TabsList>

            <div className="bg-white border rounded-lg shadow-sm p-6">
              <TabsContent value="agenda" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Agenda Inteligente</h2>
                  <p>
                    Gerencie sua agenda de forma eficiente com nossa solução completa de agendamento.
                    Visualize compromissos por dia, semana ou mês, com lembretes automáticos e integração com Google Calendar.
                  </p>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1470&auto=format&fit=crop" 
                        alt="Sistema de agendamento" 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Agendamento simplificado com arrastar e soltar</li>
                    <li>Visualização por profissional, sala ou equipamento</li>
                    <li>Confirmação automática por WhatsApp</li>
                    <li>Análise de produtividade e ocupação</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="prontuario" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Prontuário Digital</h2>
                  <p>
                    Mantenha todo o histórico clínico dos seus pacientes em um só lugar,
                    com odontogramas digitais, anexo de radiografias e documentos.
                  </p>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1470&auto=format&fit=crop" 
                        alt="Prontuário digital" 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Odontograma interativo com histórico</li>
                    <li>Controle completo de tratamentos</li>
                    <li>Anexo de documentos e imagens</li>
                    <li>Assinatura digital de documentos</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="pacientes" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Gestão de Pacientes</h2>
                  <p>
                    Cadastro completo de pacientes com informações de contato, histórico médico,
                    documentos e integração com o sistema de agendamento.
                  </p>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop" 
                        alt="Gestão de pacientes" 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Cadastro completo e personalizado</li>
                    <li>Visualização de histórico de consultas</li>
                    <li>Controle de documentos e anamnese</li>
                    <li>Notificações de retorno e manutenção</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="financeiro" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Controle Financeiro</h2>
                  <p>
                    Gerencie receitas, despesas, comissões e convênios de forma intuitiva.
                    Acompanhe indicadores financeiros em tempo real.
                  </p>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop" 
                        alt="Sistema financeiro" 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Fluxo de caixa com categorização</li>
                    <li>Controle de comissões por profissional</li>
                    <li>Gestão de convênios e tabelas de preço</li>
                    <li>Relatórios gerenciais personalizados</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="crm" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Marketing e CRM</h2>
                  <p>
                    Ferramentas para atrair e fidelizar pacientes, gerenciar campanhas
                    e acompanhar resultados de marketing.
                  </p>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1474&auto=format&fit=crop" 
                        alt="Marketing e CRM" 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Gestão de leads e funis de conversão</li>
                    <li>Campanhas de marketing automatizadas</li>
                    <li>Mensagens personalizadas via WhatsApp</li>
                    <li>Indicadores de perfomance de marketing</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="mobile" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Aplicativos Nativos</h2>
                  <p>
                    Aplicativos para Android e iOS para profissionais e pacientes,
                    com acesso à agenda, prontuários e comunicação direta.
                  </p>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1374&auto=format&fit=crop" 
                        alt="Aplicativos mobile" 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                  
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>App para dentistas com agenda e prontuários</li>
                    <li>App para pacientes com agendamento online</li>
                    <li>Notificações push para lembretes</li>
                    <li>Chat direto entre paciente e clínica</li>
                  </ul>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <div className="mt-8 bg-odonto-mint/20 rounded-lg p-6 border border-odonto-mint">
            <h3 className="text-lg font-semibold mb-4">Quer experimentar todas as funcionalidades?</h3>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-odonto-blue hover:bg-odonto-blue-dark">
                  Teste grátis por 14 dias
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Agendar demonstração guiada
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
