
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { Search, MoreHorizontal, UserPlus, FileText, Calendar, Phone, Mail } from "lucide-react";
import { usePatient } from "@/context/PatientContext";
import { toast } from "sonner";

export default function PatientList() {
  const { patients, deletePatient } = usePatient();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery)
  );

  const handleDeletePatient = (id: number) => {
    if (window.confirm("Tem certeza que deseja remover este paciente?")) {
      deletePatient(id);
    }
  };

  const handleViewPatient = (id: number) => {
    navigate(`/patients/${id}`);
  };

  const handleScheduleAppointment = (id: number, name: string) => {
    navigate('/appointments', { state: { patientId: id, patientName: name } });
    toast.info(`Agendar consulta para ${name}`);
  };

  const handleCallPatient = (phone: string) => {
    window.open(`tel:${phone.replace(/\D/g, '')}`);
    toast.info("Iniciando chamada telefônica...");
  };

  const handleEmailPatient = (email: string) => {
    window.open(`mailto:${email}`);
    toast.info("Abrindo cliente de email...");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar paciente..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link to="/patients/new">
          <Button className="bg-odonto-blue hover:bg-odonto-blue-dark w-full sm:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Paciente
          </Button>
        </Link>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nome</TableHead>
              <TableHead className="hidden md:table-cell">Contato</TableHead>
              <TableHead className="hidden lg:table-cell">Nascimento</TableHead>
              <TableHead className="hidden md:table-cell">Última Consulta</TableHead>
              <TableHead>Próxima Consulta</TableHead>
              <TableHead className="w-[90px] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-gray-500 md:hidden">{patient.phone}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>{patient.phone}</div>
                    <div className="text-sm text-gray-500">{patient.email}</div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{patient.birthdate}</TableCell>
                  <TableCell className="hidden md:table-cell">{patient.lastVisit}</TableCell>
                  <TableCell>
                    <div 
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        patient.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {patient.nextVisit}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center cursor-pointer" 
                          onClick={() => handleViewPatient(patient.id)}>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Ver Prontuário</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center cursor-pointer"
                          onClick={() => handleScheduleAppointment(patient.id, patient.name)}>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Agendar Consulta</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center cursor-pointer"
                          onClick={() => handleCallPatient(patient.phone)}>
                          <Phone className="mr-2 h-4 w-4" />
                          <span>Ligar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center cursor-pointer"
                          onClick={() => handleEmailPatient(patient.email)}>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Enviar Email</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  Nenhum paciente encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
