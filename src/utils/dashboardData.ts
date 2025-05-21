import { addDays, format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

// Generate random number within a range
// Esta função é mantida para compatibilidade com componentes existentes
export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Format date in Brazilian format
export const formatBrazilianDate = (date: Date) => {
  return format(date, "dd/MM/yyyy", { locale: ptBR });
};

// Generate past date within range
// Esta função é mantida para compatibilidade com componentes existentes
export const generatePastDate = (minDays: number, maxDays: number) => {
  const daysAgo = randomNumber(minDays, maxDays);
  return formatBrazilianDate(subDays(new Date(), daysAgo));
};

// Generate future date within range
// Esta função é mantida para compatibilidade com componentes existentes
export const generateFutureDate = (minDays: number, maxDays: number) => {
  const daysAhead = randomNumber(minDays, maxDays);
  return formatBrazilianDate(addDays(new Date(), daysAhead));
};

// Generate percentage change with trend direction
// Esta função é mantida para compatibilidade com componentes existentes
export const generateChange = () => {
  const isPositive = Math.random() > 0.3; // 70% chance of positive change
  return {
    value: randomNumber(1, 20),
    trend: isPositive ? "up" : "down"
  };
};

// Generate dashboard statistics with empty initial values
export const generateDashboardStats = () => {
  return {
    patientsServed: {
      value: 0,
      change: { value: 0, trend: "up" }
    },
    scheduledAppointments: {
      value: 0,
      nextDays: 7
    },
    revenue: {
      value: 0,
      change: { value: 0, trend: "up" }
    },
    occupancyRate: {
      value: 0,
      change: { value: 0, trend: "up" }
    }
  };
};

// Generate empty notifications list
export const generateNotifications = () => {
  return [];
};
