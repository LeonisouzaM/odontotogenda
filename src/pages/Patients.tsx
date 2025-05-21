
import Sidebar from "@/components/Dashboard/Sidebar";
import PatientList from "@/components/PatientManagement/PatientList";

export default function Patients() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-1">Pacientes</h1>
          <p className="text-gray-500 mb-6">Gerenciamento de pacientes da clínica</p>
          
          <PatientList />
        </div>
      </div>
    </div>
  );
}
