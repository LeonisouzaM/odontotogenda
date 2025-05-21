
import Sidebar from "@/components/Dashboard/Sidebar";
import PatientForm from "@/components/PatientManagement/PatientForm";

export default function NewPatient() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-1">Novo Paciente</h1>
          <p className="text-gray-500 mb-6">Cadastre um novo paciente no sistema</p>
          
          <PatientForm />
        </div>
      </div>
    </div>
  );
}
