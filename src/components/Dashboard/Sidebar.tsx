
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  FileText, 
  CreditCard, 
  BarChart3,
  MessageCircle, 
  Settings,
  LayoutDashboard,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isMobileOpen?: boolean;
  onMobileItemClick?: () => void;
}

function NavItem({ to, icon: Icon, label, isMobileOpen, onMobileItemClick }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      onClick={onMobileItemClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-odonto-blue text-white font-medium" 
          : "text-gray-700 hover:bg-odonto-mint hover:text-odonto-blue-dark"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/appointments", icon: Calendar, label: "Agenda" },
    { to: "/patients", icon: Users, label: "Pacientes" },
    { to: "/records", icon: FileText, label: "Prontuários" },
    { to: "/finance", icon: CreditCard, label: "Financeiro" },
    { to: "/reports", icon: BarChart3, label: "Relatórios" },
    { to: "/crm", icon: MessageCircle, label: "CRM" },
    { to: "/settings", icon: Settings, label: "Configurações" },
  ];

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden flex items-center p-4 border-b">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center justify-center flex-1">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-odonto-blue" />
            <span className="text-lg font-display font-bold">
              Odonto<span className="text-odonto-blue">Genda</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 bg-black/80 lg:hidden transition-opacity",
        isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white transition-transform",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/dashboard" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <Calendar className="h-6 w-6 text-odonto-blue" />
              <span className="text-lg font-display font-bold">
                Odonto<span className="text-odonto-blue">Genda</span>
              </span>
            </Link>
            <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-4 space-y-1">
            {navItems.map((item) => (
              <NavItem 
                key={item.to} 
                {...item} 
                isMobileOpen={isMobileOpen}
                onMobileItemClick={closeMobileMenu}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <Link to="/" className="w-full">
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2"
                onClick={closeMobileMenu}
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r bg-white">
        <div className="p-4 border-b">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-odonto-blue" />
            <span className="text-lg font-display font-bold">
              Odonto<span className="text-odonto-blue">Genda</span>
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
        <div className="p-4 border-t">
          <Link to="/" className="w-full">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
