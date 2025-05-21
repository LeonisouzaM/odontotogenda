
import { useEffect, useState } from "react";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  ArrowUp, 
  ArrowDown,
  BarChart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateDashboardStats } from "@/utils/dashboardData";

type DashboardStatsData = {
  patientsServed: {
    value: number;
    change: {
      value: number;
      trend: string;
    };
  };
  scheduledAppointments: {
    value: number;
    nextDays: number;
  };
  revenue: {
    value: number;
    change: {
      value: number;
      trend: string;
    };
  };
  occupancyRate: {
    value: number;
    change: {
      value: number;
      trend: string;
    };
  };
};

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatsData | null>(null);
  
  useEffect(() => {
    setStats(generateDashboardStats());
  }, []);

  // Format currency to BRL
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (!stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Carregando...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pacientes Atendidos
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.patientsServed.value}</div>
          <p className="text-xs text-muted-foreground">
            <span className={`${stats.patientsServed.change.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {stats.patientsServed.change.trend === 'up' ? (
                <ArrowUp className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3" />
              )}
              {stats.patientsServed.change.value}% este mês
            </span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Consultas Agendadas
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.scheduledAppointments.value}</div>
          <div className="text-xs text-muted-foreground">
            Para os próximos {stats.scheduledAppointments.nextDays} dias
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Faturamento
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.revenue.value)}</div>
          <p className="text-xs text-muted-foreground">
            <span className={`${stats.revenue.change.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {stats.revenue.change.trend === 'up' ? (
                <ArrowUp className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3" />
              )}
              {stats.revenue.change.value}% em relação ao mês anterior
            </span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Taxa de Ocupação
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.occupancyRate.value}%</div>
          <p className="text-xs text-muted-foreground">
            <span className={`${stats.occupancyRate.change.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {stats.occupancyRate.change.trend === 'up' ? (
                <ArrowUp className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3" />
              )}
              {stats.occupancyRate.change.value}% em relação ao mês anterior
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
