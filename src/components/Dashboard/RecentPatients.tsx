import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Phone, Mail, FileText, RefreshCw, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Patient = {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  nextVisit: string;
};

export default function RecentPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Inicializa com lista vazia, sem dados falsos
    setLoading(false);
  }, []);

  const handleRefreshPatients = () => {
    setLoading(true);
    // Simula atualização sem gerar dados falsos
    setTimeout(() => {
      setLoading(false);
      toast.info("Lista de pacientes atualizada");
    }, 300);
  };

  const handleViewPatient = (id: number) => {
    navigate(`/patients/${id}`);
  };

  const handleCallPatient = (phone: string) => {
    window.open(`tel:${phone.replace(/\D/g, '')}`);
    toast.info("Iniciando chamada telefônica...");
  };

  const handleEmailPatient = (email: string) => {
    window.open(`mailto:${email}`);
    toast.info("Abrindo cliente de email...");
  };

  if (loading) {
    return (
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Pacientes Recentes</CardTitle>
          <CardDescription>
            Últimos pacientes atendidos e próximas consultas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse mr-4"></div>
                  <div>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-48 bg-gray-200 rounded animate-pulse mt-2"></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded bg-gray-200 animate-pulse"></div>
                  <div className="h-8 w-8 rounded bg-gray-200 animate-pulse"></div>
                  <div className="h-8 w-8 rounded bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Pacientes Recentes</CardTitle>
            <CardDescription>
              Últimos pacientes atendidos e próximas consultas
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            title="Atualizar lista"
            onClick={handleRefreshPatients}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {patients.length > 0 ? (
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src="" alt={patient.name} />
                    <AvatarFallback className="bg-odonto-blue text-white">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="flex gap-6 mt-1">
                      <div className="text-xs text-gray-500">
                        Última consulta: {patient.lastVisit}
                      </div>
                      <div className="text-xs font-medium text-odonto-blue-dark">
                        Próxima: {patient.nextVisit}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Ligar" 
                    onClick={() => handleCallPatient(patient.phone)}
                  >
                    <Phone className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Email"
                    onClick={() => handleEmailPatient(patient.email)}
                  >
                    <Mail className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Prontuário"
                    onClick={() => handleViewPatient(patient.id)}
                  >
                    <FileText className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/patients')}
            >
              Ver todos os pacientes
            </Button>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200 flex flex-col items-center">
            <UserPlus className="h-10 w-10 text-gray-400 mb-2" />
            <div className="text-gray-500 mb-2">Nenhum paciente cadastrado</div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/patients/new')}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Cadastrar Paciente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
