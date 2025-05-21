import { 
  CircleDollarSign, 
  Wallet, 
  Receipt, 
  BarChart3,
  BadgePercent,
  ArrowUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { loadFromLocalStorage } from "@/utils/localStorage";

export default function FinanceOverview() {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [averageTicket, setAverageTicket] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    // Carregar dados do localStorage
    const incomeEntries = loadFromLocalStorage('incomeEntries', []);
    const expenseEntries = loadFromLocalStorage('expenseEntries', []);
    
    // Calcular receita mensal (soma de todos os valores de receitas)
    const totalIncome = incomeEntries.reduce((sum: number, entry: any) => sum + entry.value, 0);
    setMonthlyIncome(totalIncome);
    
    // Calcular despesas mensais (soma de todos os valores de despesas)
    const totalExpenses = expenseEntries.reduce((sum: number, entry: any) => sum + entry.value, 0);
    setMonthlyExpenses(totalExpenses);
    
    // Calcular ticket médio (receita total / número de receitas)
    if (incomeEntries.length > 0) {
      setAverageTicket(totalIncome / incomeEntries.length);
    }
    
    // Calcular taxa de conversão simulada (para demonstração)
    if (totalIncome > 0 && totalExpenses > 0) {
      // Simulação simples: lucro como percentual da receita
      const profit = totalIncome - totalExpenses;
      const conversionRate = (profit / totalIncome) * 100;
      setConversionRate(Math.max(0, conversionRate)); // Garantir que não seja negativo para demonstração
    }
  }, []);

  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Total
            </CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(monthlyIncome)}</div>
            <p className="text-xs text-muted-foreground">
              {monthlyIncome > 0 
                ? "Valor total de receitas cadastradas" 
                : "Nenhuma receita cadastrada"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Despesas Totais
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(monthlyExpenses)}</div>
            <p className="text-xs text-muted-foreground">
              {monthlyExpenses > 0 
                ? "Valor total de despesas cadastradas" 
                : "Nenhuma despesa cadastrada"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ticket Médio
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageTicket)}</div>
            <p className="text-xs text-muted-foreground">
              {averageTicket > 0 
                ? "Valor médio por receita" 
                : "Nenhuma receita cadastrada"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Conversão
            </CardTitle>
            <BadgePercent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {conversionRate > 0 
                ? "Baseado no lucro atual" 
                : "Cadastre receitas e despesas"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Fluxo de Caixa</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {monthlyIncome > 0 || monthlyExpenses > 0 ? (
              <div className="h-[300px] flex flex-col items-center justify-center">
                <div className="w-full h-[200px] flex items-end justify-center gap-16 mb-4">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-24 bg-green-500 rounded-t-md" 
                      style={{ height: `${Math.min(180, monthlyIncome / 100)}px` }}
                    ></div>
                    <span className="mt-2 text-sm font-medium">Receitas</span>
                    <span className="text-xs text-muted-foreground">{formatCurrency(monthlyIncome)}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-24 bg-red-500 rounded-t-md" 
                      style={{ height: `${Math.min(180, monthlyExpenses / 100)}px` }}
                    ></div>
                    <span className="mt-2 text-sm font-medium">Despesas</span>
                    <span className="text-xs text-muted-foreground">{formatCurrency(monthlyExpenses)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Saldo:</span>
                  <span className={`text-sm font-bold ${monthlyIncome - monthlyExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(monthlyIncome - monthlyExpenses)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-background">
                <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                <span className="ml-2 text-muted-foreground">Nenhum dado disponível</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pagamentos Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-[200px] text-center">
              <Receipt className="h-12 w-12 text-muted-foreground/50 mb-2" />
              <p className="text-muted-foreground">Nenhum pagamento pendente</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
