import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart3, PieChartIcon, FileSpreadsheet, Download, FileBarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Report {
  title: string;
  date: string;
  icon: any;
  data?: any[];
}

export default function FinancialReports() {
  const { toast } = useToast();
  const [reports] = useState<Report[]>([]);
  
  const handleDownload = (reportType: string) => {
    toast({
      title: "Download iniciado",
      description: `O relatório ${reportType} será baixado em breve.`,
    });
  };

  const handleExportAll = () => {
    if (reports.length === 0) {
      toast({
        title: "Nenhum relatório disponível",
        description: "Não há relatórios para exportar no momento.",
      });
      return;
    }
    
    toast({
      title: "Exportação iniciada",
      description: "Todos os relatórios serão exportados em um único arquivo.",
    });
    
    // Simulate download timing
    setTimeout(() => {
      toast({
        title: "Exportação concluída",
        description: "Todos os relatórios foram exportados com sucesso.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="monthly">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="monthly">Mensal</TabsTrigger>
            <TabsTrigger value="quarterly">Trimestral</TabsTrigger>
            <TabsTrigger value="annual">Anual</TabsTrigger>
          </TabsList>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleExportAll}
            disabled={reports.length === 0}
          >
            <Download className="h-4 w-4" />
            Exportar Tudo
          </Button>
        </div>
        
        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Receitas vs. Despesas</CardTitle>
                <CardDescription>Comparativo do último mês</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px] flex flex-col items-center justify-center border rounded-md bg-background">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/50 mb-2" />
                  <span className="text-muted-foreground">Nenhum dado disponível</span>
                  <span className="text-xs text-muted-foreground mt-1">Adicione receitas e despesas para gerar gráficos</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-auto flex items-center gap-1"
                  onClick={() => handleDownload("receitas-despesas")}
                  disabled={true}
                >
                  <Download className="h-3 w-3" />
                  Exportar dados
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Receitas</CardTitle>
                <CardDescription>Por categoria de serviço</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px] flex flex-col items-center justify-center border rounded-md bg-background">
                  <PieChartIcon className="h-16 w-16 text-muted-foreground/50 mb-2" />
                  <span className="text-muted-foreground">Nenhum dado disponível</span>
                  <span className="text-xs text-muted-foreground mt-1">Adicione receitas para gerar gráficos</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-auto flex items-center gap-1"
                  onClick={() => handleDownload("distribuicao-receitas")}
                  disabled={true}
                >
                  <Download className="h-3 w-3" />
                  Exportar dados
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Análise Financeira Detalhada</CardTitle>
              <CardDescription>Métricas-chave do desempenho financeiro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-2">Lucratividade</h3>
                  <div className="text-2xl font-bold">0%</div>
                  <p className="text-xs text-muted-foreground mt-1">Nenhum dado disponível</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-2">Taxa de Inadimplência</h3>
                  <div className="text-2xl font-bold">0%</div>
                  <p className="text-xs text-muted-foreground mt-1">Nenhum dado disponível</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-2">Valor por Procedimento</h3>
                  <div className="text-2xl font-bold">R$ 0,00</div>
                  <p className="text-xs text-muted-foreground mt-1">Nenhum dado disponível</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Relatórios Disponíveis</CardTitle>
                <CardDescription>Acesse relatórios financeiros detalhados</CardDescription>
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => handleDownload("todos-os-relatorios")}
                disabled={reports.length === 0}
              >
                <Download className="h-4 w-4" />
                Exportar Todos
              </Button>
            </CardHeader>
            <CardContent>
              {reports.length > 0 ? (
                <div className="space-y-2">
                  {reports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
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
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                  <FileBarChart className="h-12 w-12 text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground">Nenhum relatório disponível</p>
                  <p className="text-xs text-muted-foreground mt-1">Os relatórios serão gerados automaticamente com base nos dados financeiros</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quarterly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Trimestrais</CardTitle>
              <CardDescription>Dados financeiros do trimestre</CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex flex-col items-center justify-center h-[300px]">
              <FileBarChart className="h-12 w-12 text-muted-foreground/50 mb-2" />
              <p className="text-muted-foreground">Nenhum dado disponível</p>
              <p className="text-xs text-muted-foreground mt-1">Os relatórios trimestrais serão gerados automaticamente</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="annual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Anuais</CardTitle>
              <CardDescription>Dados financeiros do ano</CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex flex-col items-center justify-center h-[300px]">
              <FileBarChart className="h-12 w-12 text-muted-foreground/50 mb-2" />
              <p className="text-muted-foreground">Nenhum dado disponível</p>
              <p className="text-xs text-muted-foreground mt-1">Os relatórios anuais serão gerados automaticamente</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
