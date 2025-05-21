import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  MessageCircle, 
  Users, 
  Calendar, 
  PlusCircle, 
  Mail,
  MessageSquare,
  UserPlus
} from "lucide-react";
import NewLeadDialog from "@/components/CRM/NewLeadDialog";
import NewCampaignDialog from "@/components/CRM/NewCampaignDialog";
import NewMessageDialog from "@/components/CRM/NewMessageDialog";

// Função para carregar dados do localStorage
const loadFromLocalStorage = (key: string, defaultValue: any) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  } catch (error) {
    console.error(`Erro ao carregar dados do localStorage (${key}):`, error);
    return defaultValue;
  }
};

// Função para salvar dados no localStorage
const saveToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Erro ao salvar dados no localStorage (${key}):`, error);
  }
};

export default function CRM() {
  const navigate = useNavigate();
  
  const [messageCampaigns, setMessageCampaigns] = useState(() => 
    loadFromLocalStorage('messageCampaigns', [])
  );
  
  const [leads, setLeads] = useState(() => 
    loadFromLocalStorage('leads', [])
  );

  // Salvar no localStorage quando os dados mudarem
  useEffect(() => {
    saveToLocalStorage('messageCampaigns', messageCampaigns);
  }, [messageCampaigns]);

  useEffect(() => {
    saveToLocalStorage('leads', leads);
  }, [leads]);

  // Manage dialog states
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);

  // Add new lead
  const handleAddLead = (newLead: any) => {
    const newId = leads.length > 0 ? Math.max(...leads.map((lead: any) => lead.id), 0) + 1 : 1;
    const leadWithId = { ...newLead, id: newId };
    setLeads([leadWithId, ...leads]);
  };

  // Add new campaign
  const handleAddCampaign = (newCampaign: any) => {
    const newId = messageCampaigns.length > 0 ? Math.max(...messageCampaigns.map((campaign: any) => campaign.id), 0) + 1 : 1;
    const campaignWithId = { ...newCampaign, id: newId };
    setMessageCampaigns([campaignWithId, ...messageCampaigns]);
  };
  
  // Navigate to appointments page
  const navigateToAppointments = () => {
    navigate('/appointments');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-1">CRM</h1>
          <p className="text-gray-500 mb-6">Gerenciamento de relacionamento com pacientes</p>
          
          <Tabs defaultValue="leads" className="space-y-4">
            <TabsList>
              <TabsTrigger value="leads" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Leads
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Campanhas
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Mensagens
              </TabsTrigger>
              <TabsTrigger value="scheduler" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Agendamentos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="leads" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Leads</CardTitle>
                    <CardDescription>Gerenciamento de potenciais clientes</CardDescription>
                  </div>
                  <Button className="flex items-center gap-2" onClick={() => setIsNewLeadOpen(true)}>
                    <PlusCircle className="h-4 w-4" />
                    Novo Lead
                  </Button>
                </CardHeader>
                <CardContent>
                  {leads.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Fonte</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead className="hidden md:table-cell">Telefone</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leads.map((lead: any) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.name}</TableCell>
                            <TableCell>{lead.source}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                lead.status === 'Novo' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : lead.status === 'Em contato'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {lead.status}
                              </span>
                            </TableCell>
                            <TableCell>{lead.date}</TableCell>
                            <TableCell className="hidden md:table-cell">{lead.phone}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[200px] text-center">
                      <UserPlus className="h-12 w-12 text-muted-foreground/50 mb-2" />
                      <p className="text-muted-foreground">Nenhum lead cadastrado</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={() => setIsNewLeadOpen(true)}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Adicionar Lead
                      </Button>
                    </div>
                  )}
                </CardContent>
                {leads.length > 0 && (
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Mostrando {leads.length} de {leads.length} leads
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>Anterior</Button>
                      <Button variant="outline" size="sm" disabled>Próximo</Button>
                    </div>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="campaigns" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Campanhas de Marketing</CardTitle>
                    <CardDescription>Gerenciamento de campanhas de marketing</CardDescription>
                  </div>
                  <Button className="flex items-center gap-2" onClick={() => setIsNewCampaignOpen(true)}>
                    <PlusCircle className="h-4 w-4" />
                    Nova Campanha
                  </Button>
                </CardHeader>
                <CardContent>
                  {messageCampaigns.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Público-alvo</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">Enviados/Abertos</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {messageCampaigns.map((campaign: any) => (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">{campaign.name}</TableCell>
                            <TableCell>{campaign.target}</TableCell>
                            <TableCell>{campaign.date}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                campaign.status === 'Ativo' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {campaign.status}
                              </span>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {campaign.sent}/{campaign.opened}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[200px] text-center">
                      <Mail className="h-12 w-12 text-muted-foreground/50 mb-2" />
                      <p className="text-muted-foreground">Nenhuma campanha cadastrada</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={() => setIsNewCampaignOpen(true)}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Criar Campanha
                      </Button>
                    </div>
                  )}
                </CardContent>
                {messageCampaigns.length > 0 && (
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Mostrando {messageCampaigns.length} de {messageCampaigns.length} campanhas
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>Anterior</Button>
                      <Button variant="outline" size="sm" disabled>Próximo</Button>
                    </div>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="messages" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Mensagens</CardTitle>
                    <CardDescription>Comunicação com pacientes</CardDescription>
                  </div>
                  <Button className="flex items-center gap-2" onClick={() => setIsNewMessageOpen(true)}>
                    <MessageSquare className="h-4 w-4" />
                    Nova Mensagem
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">Não há mensagens recentes</h3>
                    <p className="text-gray-500 mb-4">
                      Inicie uma nova conversa com um paciente
                    </p>
                    <Button onClick={() => setIsNewMessageOpen(true)}>Enviar Mensagem</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="scheduler" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Agendamentos</CardTitle>
                  <CardDescription>Gestão de consultas e acompanhamentos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">Integração com Agenda</h3>
                    <p className="text-gray-500 mb-4">
                      Gerencie agendamentos vinculados ao CRM
                    </p>
                    <Button onClick={navigateToAppointments}>Acessar Agenda</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Dialogs */}
      <NewLeadDialog 
        open={isNewLeadOpen} 
        onOpenChange={setIsNewLeadOpen} 
        onAddLead={handleAddLead}
      />
      <NewCampaignDialog 
        open={isNewCampaignOpen} 
        onOpenChange={setIsNewCampaignOpen} 
        onAddCampaign={handleAddCampaign}
      />
      <NewMessageDialog 
        open={isNewMessageOpen} 
        onOpenChange={setIsNewMessageOpen} 
      />
    </div>
  );
}
