import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatient } from '@/context/PatientContext';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, FileText, Phone, Mail, Edit, Save, User, UserRound } from 'lucide-react';

export default function MedicalRecord() {
  const { id } = useParams<{ id: string }>();
  const { getPatientById, updatePatient, getAppointmentsByPatientId } = usePatient();
  const navigate = useNavigate();
  
  const [patient, setPatient] = useState(id ? getPatientById(parseInt(id)) : null);
  const [appointments, setAppointments] = useState([]);
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    if (id) {
      const patientData = getPatientById(parseInt(id));
      setPatient(patientData);
      
      if (patientData) {
        setNotes(patientData.medical_notes || "");
        setAppointments(getAppointmentsByPatientId(patientData.id));
      }
    }
  }, [id, getPatientById, getAppointmentsByPatientId]);
  
  // Se não encontrar paciente ou não tiver ID, mostrar mensagem
  if (!patient || !id) {
    return (
      <div className="text-center py-12">
        <UserRound className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold mb-2">
          {id ? `Paciente não encontrado` : `Selecione um paciente`}
        </h2>
        <p className="text-gray-500 mb-4">
          {id ? `O paciente com ID ${id} não foi encontrado no sistema.` : `Nenhum paciente selecionado para visualização do prontuário.`}
        </p>
        <Button onClick={() => navigate('/patients')}>
          {id ? `Voltar para Lista de Pacientes` : `Ver Lista de Pacientes`}
        </Button>
      </div>
    );
  }
  
  const handleSaveNotes = () => {
    if (id) {
      updatePatient(parseInt(id), { medical_notes: notes });
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{patient.name}</h1>
          <p className="text-gray-500">ID: {patient.id} | CPF: {patient.cpf || "Não informado"}</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => window.open(`tel:${patient.phone?.replace(/\D/g, '')}`)}
          >
            <Phone className="h-4 w-4" />
            Ligar
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => window.open(`mailto:${patient.email}`)}
          >
            <Mail className="h-4 w-4" />
            Email
          </Button>
          <Button 
            variant="default"
            size="sm" 
            className="flex items-center gap-2 bg-odonto-blue hover:bg-odonto-blue-dark"
            onClick={() => navigate(`/appointments`, { state: { patientId: patient.id } })}
          >
            <Calendar className="h-4 w-4" />
            Agendar
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="records">Prontuário</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Dados do Paciente</CardTitle>
              <CardDescription>Informações pessoais e de contato</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Dados Pessoais</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <div className="text-sm text-gray-500">Data de Nascimento:</div>
                        <div>{patient.birthdate || "Não informado"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Gênero:</div>
                        <div>{patient.gender === 'male' ? 'Masculino' : patient.gender === 'female' ? 'Feminino' : 'Outro'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contato</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <div className="text-sm text-gray-500">Telefone:</div>
                        <div>{patient.phone || "Não informado"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Email:</div>
                        <div>{patient.email || "Não informado"}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Convênio</h3>
                    <div className="mt-2">
                      {patient.health_insurance || "Particular"}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Endereço</h3>
                    <div className="mt-2">
                      <div>{patient.address || "Não informado"}</div>
                      <div>
                        {patient.city && `${patient.city}`}
                        {patient.state && `, ${patient.state}`}
                        {patient.zipcode && ` - ${patient.zipcode}`}
                        {!patient.city && !patient.state && !patient.zipcode && "Não informado"}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Consultas</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <div className="text-sm text-gray-500">Última Consulta:</div>
                        <div>{patient.lastVisit || "Nenhuma"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Próxima Consulta:</div>
                        <div className={patient.status === "active" ? "text-green-600" : ""}>
                          {patient.nextVisit || "Nenhuma agendada"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Atendimentos</CardTitle>
              <CardDescription>Registro de consultas e procedimentos</CardDescription>
            </CardHeader>
            <CardContent>
              {appointments && appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{appointment.procedure}</h4>
                          <div className="text-sm text-gray-500">{format(appointment.date, "dd/MM/yyyy")}</div>
                        </div>
                        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Realizada' : 'Pendente'}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {appointment.startTime} - {appointment.endTime}
                        </div>
                        <div className="flex items-center">
                          <User className="mr-1 h-3 w-3" />
                          {appointment.doctor}
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="mt-2 p-2 bg-gray-50 text-sm rounded text-gray-600">
                          {appointment.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-10 w-10 text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium">Nenhum histórico disponível</h3>
                  <p className="text-gray-500 mt-1">
                    Este paciente ainda não possui consultas registradas
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="records">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Prontuário Médico</CardTitle>
                  <CardDescription>Observações médicas e histórico clínico</CardDescription>
                </div>
                {isEditing ? (
                  <Button 
                    variant="default" 
                    size="sm"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    onClick={handleSaveNotes}
                  >
                    <Save className="h-4 w-4" />
                    Salvar
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Digite as observações médicas..."
                  rows={10}
                />
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap min-h-[200px]">
                  {notes || "Nenhuma observação médica registrada."}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
