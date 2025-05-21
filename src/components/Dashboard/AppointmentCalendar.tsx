import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Clock, 
  User, 
  MapPin, 
  CalendarPlus, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw,
  Calendar as CalendarIcon 
} from "lucide-react";
import { format, isSameDay } from "date-fns";
import { toast } from "sonner";

type Appointment = {
  id: number;
  patientName: string;
  procedure: string;
  date: Date;
  startTime: string;
  endTime: string;
  doctor: string;
  status: "confirmed" | "pending" | "cancelled";
  room: string;
};

export default function AppointmentCalendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("list");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Format the date for display
  const formattedDate = date?.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Capitalize the first letter of the formatted date
  const capitalizedDate = formattedDate?.charAt(0).toUpperCase() + formattedDate?.slice(1);

  // Navigate dates
  const goToNextDay = () => {
    if (date) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setDate(nextDay);
    }
  };

  const goToPrevDay = () => {
    if (date) {
      const prevDay = new Date(date);
      prevDay.setDate(prevDay.getDate() - 1);
      setDate(prevDay);
    }
  };

  const handleRefreshAppointments = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      toast.info("Agenda atualizada com sucesso");
    }, 300);
  };

  // Navigate to appointments page
  const navigateToAppointments = () => {
    navigate('/appointments');
  };

  // Filter appointments for selected date
  const filteredAppointments = appointments.filter(appointment => 
    date && isSameDay(appointment.date, date)
  );

  // Helper to toggle view
  const toggleView = () => {
    setView(view === "list" ? "calendar" : "list");
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Agenda de Consultas</CardTitle>
            <CardDescription>
              Gerencie suas consultas e atendimentos
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 lg:hidden"
              title={view === "list" ? "Ver calendário" : "Ver lista"}
              onClick={toggleView}
            >
              {view === "list" ? <CalendarIcon className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              title="Atualizar agenda"
              onClick={handleRefreshAppointments}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-7 gap-4">
          {/* Calendar View - Hidden on mobile unless selected */}
          <div className={`${view === "calendar" ? "block" : "hidden lg:block"} col-span-7 lg:col-span-3`}>
            <div className="rounded-md border overflow-hidden">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border-0 shadow-none w-full"
              />
            </div>
            <div className="mt-4">
              <Button 
                className="w-full bg-odonto-blue hover:bg-odonto-blue-dark"
                onClick={navigateToAppointments}
              >
                <CalendarPlus className="mr-2 h-4 w-4" />
                Nova Consulta
              </Button>
            </div>
          </div>
          
          {/* List View - Hidden on mobile unless selected */}
          <div className={`${view === "list" ? "block" : "hidden lg:block"} col-span-7 lg:col-span-4`}>
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="icon" onClick={goToPrevDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="font-medium text-sm md:text-base truncate max-w-[180px] md:max-w-xs text-center">
                {capitalizedDate}
              </div>
              <Button variant="outline" size="icon" onClick={goToNextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            {loading ? (
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="p-3 rounded-md border bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                    <div className="h-3 w-48 bg-gray-200 rounded animate-pulse mt-2"></div>
                    <div className="mt-2 flex items-center gap-6">
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200 flex flex-col items-center">
                <CalendarIcon className="h-10 w-10 text-gray-400 mb-2" />
                <div className="text-gray-500 mb-2">Nenhuma consulta agendada para este dia</div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/appointments')}
                >
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Agendar Consulta
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
