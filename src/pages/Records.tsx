
import Sidebar from "@/components/Dashboard/Sidebar";
import MedicalRecord from "@/components/PatientManagement/MedicalRecord";

export default function Records() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-1">Prontuários</h1>
          <p className="text-gray-500 mb-6">Registros médicos dos pacientes</p>
          
          <MedicalRecord />
        </div>
      </div>
    </div>
  );
}
