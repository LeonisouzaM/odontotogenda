
import Sidebar from "@/components/Dashboard/Sidebar";
import MedicalRecord from "@/components/PatientManagement/MedicalRecord";

export default function PatientDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="p-6">
          <MedicalRecord />
        </div>
      </div>
    </div>
  );
}
