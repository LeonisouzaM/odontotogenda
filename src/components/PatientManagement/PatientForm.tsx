
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { usePatient } from "@/context/PatientContext";

export default function PatientForm() {
  const navigate = useNavigate();
  const { addPatient } = usePatient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    cpf: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    health_insurance: "",
    medical_notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Criar novo paciente
    const newPatient = {
      ...formData,
      lastVisit: "-",
      nextVisit: "-",
      status: "active" as const
    };
    
    // Simular delay da API
    setTimeout(() => {
      addPatient(newPatient);
      setIsSubmitting(false);
      navigate("/patients");
    }, 1000);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Cadastro de Paciente</CardTitle>
        <CardDescription>
          Preencha os dados do novo paciente para cadastro no sistema
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Dados Pessoais</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input 
                  id="name" 
                  placeholder="Nome completo do paciente" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthdate">Data de Nascimento</Label>
                <Input 
                  id="birthdate" 
                  type="date" 
                  required
                  value={formData.birthdate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input 
                  id="cpf" 
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gênero</Label>
                <Select onValueChange={(value) => handleSelectChange("gender", value)}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contato</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="email@exemplo.com" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input 
                  id="phone" 
                  placeholder="(00) 00000-0000" 
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input 
                id="address" 
                placeholder="Rua, número, complemento"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input 
                  id="city" 
                  placeholder="Cidade"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Select onValueChange={(value) => handleSelectChange("state", value)}>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sp">SP</SelectItem>
                    <SelectItem value="rj">RJ</SelectItem>
                    <SelectItem value="mg">MG</SelectItem>
                    <SelectItem value="rs">RS</SelectItem>
                    <SelectItem value="pr">PR</SelectItem>
                    <SelectItem value="sc">SC</SelectItem>
                    <SelectItem value="ba">BA</SelectItem>
                    <SelectItem value="ce">CE</SelectItem>
                    <SelectItem value="go">GO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipcode">CEP</Label>
                <Input 
                  id="zipcode" 
                  placeholder="00000-000"
                  value={formData.zipcode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Médicas</h3>
            <div className="space-y-2">
              <Label htmlFor="health_insurance">Convênio</Label>
              <Select onValueChange={(value) => handleSelectChange("health_insurance", value)}>
                <SelectTrigger id="health_insurance">
                  <SelectValue placeholder="Selecione o convênio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Particular</SelectItem>
                  <SelectItem value="amil">Amil</SelectItem>
                  <SelectItem value="bradesco">Bradesco Saúde</SelectItem>
                  <SelectItem value="sulamerica">SulAmérica</SelectItem>
                  <SelectItem value="unimed">Unimed</SelectItem>
                  <SelectItem value="notredame">NotreDame Intermédica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="medical_notes">Observações Médicas</Label>
              <Textarea 
                id="medical_notes" 
                placeholder="Alergias, condições de saúde, medicamentos em uso, etc."
                rows={4}
                value={formData.medical_notes}
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => navigate("/patients")}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="bg-odonto-blue hover:bg-odonto-blue-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Salvar Paciente"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
