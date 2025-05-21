
import Sidebar from "@/components/Dashboard/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, PieChartIcon, TrendingUp, Download, Users, Calendar, CreditCard, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Reports() {
  const { toast } = useToast();
  
  const handleDownload = (reportType: string) => {
    toast({
      title: "Download iniciado",
      description: `O relatório ${reportType} será baixado em breve.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-1">Relatórios</h1>
          <p className="text-gray-500 mb-6">Acompanhe o desempenho da sua clínica</p>
          
          <Tabs defaultValue="financial" className="space-y-4">
            <TabsList>
              <TabsTrigger value="financial">Financeiro</TabsTrigger>
              <TabsTrigger value="patients">Pacientes</TabsTrigger>
              <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
              <TabsTrigger value="performance">Desempenho</TabsTrigger>
            </TabsList>
            
            <TabsContent value="financial" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Receitas vs. Despesas</CardTitle>
                    <CardDescription>Comparativo anual</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[300px] flex items-center justify-center border rounded-md bg-background">
                      <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                      <span className="ml-2 text-muted-foreground">Gráfico de Receitas e Despesas</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição de Serviços</CardTitle>
                    <CardDescription>Procedimentos mais realizados</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[300px] flex items-center justify-center border rounded-md bg-background">
                      <PieChartIcon className="h-16 w-16 text-muted-foreground/50" />
                      <span className="ml-2 text-muted-foreground">Gráfico de Distribuição</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Relatórios Financeiros</CardTitle>
                    <CardDescription>Documentos e análises disponíveis</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => handleDownload("todos-financeiros")}
                  >
                    <Download className="h-4 w-4" />
                    Exportar Todos
                  </Button>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { title: "Balanço Financeiro Anual", icon: CreditCard, date: "15/05/2025" },
                      { title: "Análise de Lucratividade por Procedimentos", icon: TrendingUp, date: "10/05/2025" },
                      { title: "Projeção Financeira Anual", icon: FileSpreadsheet, date: "05/05/2025" },
                      { title: "Indicadores de Desempenho Financeiro", icon: BarChart3, date: "01/05/2025" }
                    ].map((report, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <report.icon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{report.title}</p>
                            <p className="text-xs text-muted-foreground">Gerado em {report.date}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDownload(report.title)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="patients" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Relatórios de Pacientes</CardTitle>
                    <CardDescription>Análise demográfica e comportamental</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => handleDownload("todos-pacientes")}
                  >
                    <Download className="h-4 w-4" />
                    Exportar Todos
                  </Button>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { title: "Distribuição Demográfica", icon: Users, date: "12/05/2025" },
                      { title: "Análise de Novos Pacientes", icon: TrendingUp, date: "08/05/2025" },
                      { title: "Taxa de Retenção", icon: FileSpreadsheet, date: "03/05/2025" }
                    ].map((report, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <report.icon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{report.title}</p>
                            <p className="text-xs text-muted-foreground">Gerado em {report.date}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDownload(report.title)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appointments" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Relatórios de Agendamentos</CardTitle>
                    <CardDescription>Análise de horários e ocupação</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => handleDownload("todos-agendamentos")}
                  >
                    <Download className="h-4 w-4" />
                    Exportar Todos
                  </Button>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { title: "Taxa de Ocupação por Período", icon: Calendar, date: "14/05/2025" },
                      { title: "Análise de Cancelamentos", icon: FileSpreadsheet, date: "09/05/2025" },
                      { title: "Horários de Pico", icon: TrendingUp, date: "04/05/2025" }
                    ].map((report, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <report.icon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{report.title}</p>
                            <p className="text-xs text-muted-foreground">Gerado em {report.date}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDownload(report.title)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Relatórios em desenvolvimento</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Os relatórios de desempenho estarão disponíveis em breve.
                    </p>
                  </div>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
