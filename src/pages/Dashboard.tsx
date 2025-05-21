
import Sidebar from "@/components/Dashboard/Sidebar";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import AppointmentCalendar from "@/components/Dashboard/AppointmentCalendar";
import RecentPatients from "@/components/Dashboard/RecentPatients";
import NotificationsList from "@/components/Dashboard/NotificationsList";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-gray-500 mb-6">Bem-vindo de volta, Dr. Santos!</p>
          
          <DashboardStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <AppointmentCalendar />
            <NotificationsList />
          </div>
          
          <div className="mt-6">
            <RecentPatients />
          </div>
        </div>
      </div>
    </div>
  );
}
