
import { useState, useEffect } from "react";
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { pt } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User, MapPin, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePatient, Appointment } from "@/context/PatientContext";
import { useLocation } from "react-router-dom";

// Lista de horários disponíveis para agendamento
const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

// Lista de dentistas
const doctors = [
  { id: 1, name: "Dr. Rodrigo Santos", specialty: "Clínica Geral" },
  { id: 2, name: "Dra. Camila Mendes", specialty: "Ortodontia" },
  { id: 3, name: "Dr. André Lima", specialty: "Endodontia" }
];

export default function Appointments() {
  // Context e state
  const { appointments, patients, addAppointment, updateAppointment, deleteAppointment } = usePatient();
  const location = useLocation();
  const patientIdFromLocation = location.state?.patientId;
  
  // State para a visualização da agenda
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week" | "calendar">("day");
  const [weekStartDate, setWeekStartDate] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newAppointmentOpen, setNewAppointmentOpen] = useState(false);
  const [filterDoctor, setFilterDoctor] = useState<string | null>(null);
  
  // State para o formulário de nova consulta
  const [newAppointment, setNewAppointment] = useState({
    patientId: patientIdFromLocation || "",
    procedure: "",
    doctor: "",
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "09:45",
    room: "Sala 1",
    notes: "",
    status: "pending" as const
  });
  
  // Effect para definir o paciente baseado na navegação
  useEffect(() => {
    if (patientIdFromLocation) {
      setNewAppointment(prev => ({
        ...prev,
        patientId: patientIdFromLocation
      }));
    }
  }, [patientIdFromLocation]);
  
  // Formatação da data selecionada
  const formattedSelectedDate = format(selectedDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: pt });
  const capitalizedDate = formattedSelectedDate.charAt(0).toUpperCase() + formattedSelectedDate.slice(1);
  
  // Funções de navegação
  const goToPreviousDay = () => {
    setSelectedDate(prevDate => subDays(prevDate, 1));
  };
  
  const goToNextDay = () => {
    setSelectedDate(prevDate => addDays(prevDate, 1));
  };
  
  const goToPreviousWeek = () => {
    setWeekStartDate(prevWeek => subDays(prevWeek, 7));
  };
  
  const goToNextWeek = () => {
    setWeekStartDate(prevWeek => addDays(prevWeek, 7));
  };
  
  // Filtragem de consultas
  const filteredAppointments = appointments.filter(appointment => {
    if (filterDoctor && appointment.doctor !== filterDoctor) return false;
    return isSameDay(appointment.date, selectedDate);
  });
  
  // Cálculo dos dias da semana
  const weekDays = eachDayOfInterval({
    start: weekStartDate,
    end: endOfWeek(weekStartDate, { weekStartsOn: 0 })
  });
  
  // Consultas por dia na visão semanal
  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(appointment => 
      isSameDay(appointment.date, date) && (!filterDoctor || appointment.doctor === filterDoctor)
    );
  };
  
  // Manipuladores de eventos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveAppointment = () => {
    // Encontrar o nome do paciente com base no ID
    const patient = patients.find(p => p.id === parseInt(newAppointment.patientId.toString()));
    
    if (!patient) {
      alert("Por favor, selecione um paciente válido.");
      return;
    }
    
    // Criar novo objeto de consulta
    const appointmentToAdd = {
      patientId: parseInt(newAppointment.patientId.toString()),
      patientName: patient.name,
      procedure: newAppointment.procedure,
      date: new Date(newAppointment.date),
      startTime: newAppointment.startTime,
      endTime: newAppointment.endTime,
      doctor: newAppointment.doctor,
      status: newAppointment.status,
      room: newAppointment.room,
      notes: newAppointment.notes
    };
    
    // Adicionar consulta
    addAppointment(appointmentToAdd);
    
    // Fechar o diálogo
    setNewAppointmentOpen(false);
    
    // Resetar o formulário
    setNewAppointment({
      patientId: "",
      procedure: "",
      doctor: "",
      date: format(new Date(), "yyyy-MM-dd"),
      startTime: "09:00",
      endTime: "09:45",
      room: "Sala 1",
      notes: "",
      status: "pending"
    });
    
    // Atualizar a data selecionada para a data da nova consulta
    setSelectedDate(new Date(newAppointment.date));
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-bold">Agenda de Consultas</h1>
            <div className="flex gap-2 mt-3 sm:mt-0">
              <Dialog open={newAppointmentOpen} onOpenChange={setNewAppointmentOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-odonto-blue hover:bg-odonto-blue-dark">
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Consulta
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Agendar Nova Consulta</DialogTitle>
                    <DialogDescription>
                      Preencha as informações para agendar uma nova consulta.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium col-span-1">Paciente</label>
                      <select 
                        className="border rounded px-3 py-2 w-full col-span-3"
                        name="patientId"
                        value={newAppointment.patientId}
                        onChange={handleInputChange}
                      >
                        <option value="">Selecione um paciente</option>
                        {patients.map(patient => (
                          <option key={patient.id} value={patient.id}>
                            {patient.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium col-span-1">Procedimento</label>
                      <select 
                        className="border rounded px-3 py-2 w-full col-span-3"
                        name="procedure"
                        value={newAppointment.procedure}
                        onChange={handleInputChange}
                      >
                        <option value="">Selecione um procedimento</option>
                        <option value="Limpeza e Avaliação">Limpeza e Avaliação</option>
                        <option value="Extração">Extração</option>
                        <option value="Aplicação de Resina">Aplicação de Resina</option>
                        <option value="Ajuste de Aparelho">Ajuste de Aparelho</option>
                        <option value="Clareamento Dental">Clareamento Dental</option>
                        <option value="Restauração">Restauração</option>
                        <option value="Consulta de Revisão">Consulta de Revisão</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium col-span-1">Dentista</label>
                      <select 
                        className="border rounded px-3 py-2 w-full col-span-3"
                        name="doctor"
                        value={newAppointment.doctor}
                        onChange={handleInputChange}
                      >
                        <option value="">Selecione um dentista</option>
                        {doctors.map(doctor => (
                          <option key={doctor.id} value={doctor.name}>
                            {doctor.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium col-span-1">Data</label>
                      <input 
                        type="date" 
                        className="border rounded px-3 py-2 w-full col-span-3"
                        name="date"
                        value={newAppointment.date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium col-span-1">Horário</label>
                      <div className="col-span-3 grid grid-cols-2 gap-2">
                        <select 
                          className="border rounded px-3 py-2"
                          name="startTime"
                          value={newAppointment.startTime}
                          onChange={handleInputChange}
                        >
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                        <select 
                          className="border rounded px-3 py-2"
                          name="endTime"
                          value={newAppointment.endTime}
                          onChange={handleInputChange}
                        >
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium col-span-1">Sala</label>
                      <select 
                        className="border rounded px-3 py-2 w-full col-span-3"
                        name="room"
                        value={newAppointment.room}
                        onChange={handleInputChange}
                      >
                        <option value="Sala 1">Sala 1</option>
                        <option value="Sala 2">Sala 2</option>
                        <option value="Sala 3">Sala 3</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium col-span-1">Observações</label>
                      <textarea 
                        className="border rounded px-3 py-2 w-full col-span-3" 
                        rows={3}
                        name="notes"
                        value={newAppointment.notes}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setNewAppointmentOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleSaveAppointment}
                      className="bg-odonto-blue hover:bg-odonto-blue-dark"
                      disabled={!newAppointment.patientId || !newAppointment.doctor || !newAppointment.procedure}
                    >
                      Agendar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white">
                  <DropdownMenuItem 
                    onClick={() => setFilterDoctor(null)}
                    className={!filterDoctor ? "bg-gray-100" : ""}
                  >
                    Todos os dentistas
                  </DropdownMenuItem>
                  {doctors.map(doctor => (
                    <DropdownMenuItem 
                      key={doctor.id}
                      onClick={() => setFilterDoctor(doctor.name)}
                      className={filterDoctor === doctor.name ? "bg-gray-100" : ""}
                    >
                      {doctor.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm mb-6">
            <div className="p-4">
              <Tabs defaultValue="day" onValueChange={(value) => setView(value as "day" | "week" | "calendar")}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="day">Dia</TabsTrigger>
                  <TabsTrigger value="week">Semana</TabsTrigger>
                  <TabsTrigger value="calendar">Calendário</TabsTrigger>
                </TabsList>
                
                <TabsContent value="day" className="py-4">
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="outline" size="icon" onClick={goToPreviousDay}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="font-medium">{capitalizedDate}</div>
                    <Button variant="outline" size="icon" onClick={goToNextDay}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <Card 
                          key={appointment.id} 
                          className={`border-l-4 ${
                            appointment.status === 'confirmed' 
                              ? 'border-l-green-500' 
                              : 'border-l-amber-500'
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-lg">{appointment.patientName}</h3>
                                <p className="text-gray-500">{appointment.procedure}</p>
                              </div>
                              <div 
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  appointment.status === 'confirmed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                              </div>
                            </div>
                            
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="mr-2 h-4 w-4" />
                                {appointment.startTime} - {appointment.endTime}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <User className="mr-2 h-4 w-4" />
                                {appointment.doctor}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="mr-2 h-4 w-4" />
                                {appointment.room}
                              </div>
                            </div>
                            
                            <div className="mt-3 flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => {
                                updateAppointment(appointment.id, { status: appointment.status === 'confirmed' ? 'pending' : 'confirmed' });
                              }}>
                                {appointment.status === 'confirmed' ? 'Marcar como Pendente' : 'Confirmar'}
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => setSelectedAppointment(appointment)}
                                className="bg-odonto-blue hover:bg-odonto-blue-dark"
                              >
                                Detalhes
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Nenhuma consulta agendada para este dia
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="week" className="py-4">
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="font-medium">
                      {format(weekStartDate, "dd/MM/yyyy")} - {format(endOfWeek(weekStartDate, { weekStartsOn: 0 }), "dd/MM/yyyy")}
                    </div>
                    <Button variant="outline" size="icon" onClick={goToNextWeek}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {weekDays.map((day) => (
                      <div 
                        key={day.toString()} 
                        className={`text-center font-medium text-sm p-2 rounded-t-md ${
                          isSameDay(day, new Date()) ? 'bg-odonto-blue text-white' : 'bg-gray-100'
                        }`}
                      >
                        {format(day, "EEE", { locale: pt }).toUpperCase()}
                        <br />
                        {format(day, "dd")}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((day) => {
                      const dayAppointments = getAppointmentsForDay(day);
                      return (
                        <div 
                          key={day.toString()} 
                          className="min-h-[120px] bg-white border rounded-md p-2"
                          onClick={() => setSelectedDate(day)}
                        >
                          {dayAppointments.length > 0 ? (
                            dayAppointments.map((appointment) => (
                              <div 
                                key={appointment.id}
                                className={`text-xs p-1 mb-1 rounded ${
                                  appointment.status === 'confirmed'
                                    ? 'bg-green-50 border-l-2 border-l-green-500' 
                                    : 'bg-amber-50 border-l-2 border-l-amber-500'
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAppointment(appointment);
                                }}
                              >
                                <div className="font-medium truncate">{appointment.patientName}</div>
                                <div className="text-gray-500">{appointment.startTime}</div>
                              </div>
                            ))
                          ) : (
                            <div className="h-full flex items-center justify-center text-xs text-gray-400">
                              Sem consultas
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
                
                <TabsContent value="calendar" className="py-4">
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      className="rounded-md border pointer-events-auto"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Appointment Details Dialog */}
          <Dialog open={!!selectedAppointment} onOpenChange={(open) => !open && setSelectedAppointment(null)}>
            <DialogContent className="sm:max-w-[500px] bg-white">
              <DialogHeader>
                <DialogTitle>Detalhes da Consulta</DialogTitle>
                <DialogDescription>
                  Informações completas sobre a consulta agendada.
                </DialogDescription>
              </DialogHeader>
              
              {selectedAppointment && (
                <div className="py-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Paciente:</div>
                      <div className="font-medium">{selectedAppointment.patientName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">ID do Paciente:</div>
                      <div className="font-medium">{selectedAppointment.patientId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Procedimento:</div>
                      <div className="font-medium">{selectedAppointment.procedure}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Status:</div>
                      <div className={`font-medium ${
                        selectedAppointment.status === 'confirmed' 
                          ? 'text-green-600' 
                          : 'text-amber-600'
                      }`}>
                        {selectedAppointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Data:</div>
                      <div className="font-medium">{format(selectedAppointment.date, "dd/MM/yyyy")}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Horário:</div>
                      <div className="font-medium">{selectedAppointment.startTime} - {selectedAppointment.endTime}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Dentista:</div>
                      <div className="font-medium">{selectedAppointment.doctor}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Sala:</div>
                      <div className="font-medium">{selectedAppointment.room}</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-500">Observações:</div>
                    <div className="mt-1 p-2 bg-gray-50 rounded">
                      {selectedAppointment.notes || "Sem observações"}
                    </div>
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    if (window.confirm('Tem certeza que deseja cancelar esta consulta?')) {
                      deleteAppointment(selectedAppointment!.id);
                      setSelectedAppointment(null);
                    }
                  }}
                >
                  Cancelar Consulta
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedAppointment(null)}
                >
                  Fechar
                </Button>
                <Button 
                  className="bg-odonto-blue hover:bg-odonto-blue-dark text-white"
                  onClick={() => {
                    updateAppointment(selectedAppointment!.id, { 
                      status: selectedAppointment!.status === 'confirmed' ? 'pending' : 'confirmed' 
                    });
                    setSelectedAppointment(null);
                  }}
                >
                  {selectedAppointment?.status === 'confirmed' ? 'Marcar como Pendente' : 'Confirmar Consulta'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
