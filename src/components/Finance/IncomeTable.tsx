import { useState, useEffect } from "react";
import { PlusCircle, Download, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import AddIncomeModal from "./AddIncomeModal";
import { exportToCSV } from "@/utils/exportData";

export interface IncomeEntry {
  id: number;
  patient: string;
  description: string;
  date: string;
  value: number;
  status: "Pago" | "Pendente";
}

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

export default function IncomeTable() {
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>(() => 
    loadFromLocalStorage('incomeEntries', [])
  );

  // Salvar no localStorage quando os dados mudarem
  useEffect(() => {
    saveToLocalStorage('incomeEntries', incomeEntries);
  }, [incomeEntries]);

  const handleAddIncome = (income: Omit<IncomeEntry, "id">) => {
    const newId = Math.max(0, ...incomeEntries.map(item => item.id), 0) + 1;
    setIncomeEntries([
      { id: newId, ...income },
      ...incomeEntries
    ]);
  };

  const handleExport = () => {
    try {
      exportToCSV(incomeEntries, "receitas");
      toast({
        title: "Exportação concluída",
        description: "Os dados foram exportados com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro na exportação",
        description: "Ocorreu um erro ao exportar os dados.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Receitas</CardTitle>
          <CardDescription>Gerencie todas as entradas financeiras</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={handleExport}
            disabled={incomeEntries.length === 0}
          >
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="flex items-center gap-2" onClick={() => setIsAddModalOpen(true)}>
            <PlusCircle className="h-4 w-4" />
            Nova Receita
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {incomeEntries.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.patient}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell className="text-right">
                    {entry.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      entry.status === 'Pago' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {entry.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center h-[200px] text-center">
            <Receipt className="h-12 w-12 text-muted-foreground/50 mb-2" />
            <p className="text-muted-foreground">Nenhuma receita registrada</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => setIsAddModalOpen(true)}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Receita
            </Button>
          </div>
        )}
      </CardContent>
      {incomeEntries.length > 0 && (
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {incomeEntries.length} de {incomeEntries.length} entradas
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="outline" size="sm" disabled>Próximo</Button>
          </div>
        </CardFooter>
      )}
      
      <AddIncomeModal 
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddIncome={handleAddIncome}
      />
    </Card>
  );
}
