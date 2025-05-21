
import { Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import RegisterForm from "@/components/Auth/RegisterForm";
import { useEffect } from "react";

export default function Register() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);
  
  const handleRegisterSuccess = () => {
    // This will be handled by the AuthContext which will redirect to dashboard
  };

  // If already logged in, show nothing during redirect
  if (currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 border">
        <div className="flex flex-col items-center mb-8">
          <Calendar className="h-12 w-12 text-odonto-blue mb-2" />
          <h2 className="text-center text-2xl font-bold">
            Odonto<span className="text-odonto-blue">Agenda</span>
          </h2>
          <p className="mt-2 text-center text-gray-500">
            Crie sua conta e teste gratuitamente por 14 dias
          </p>
        </div>
        
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Já tem uma conta?</span>{" "}
          <Link to="/login" className="text-odonto-blue hover:underline">
            Entre aqui
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center">
          <Link to="/" className="text-gray-500 hover:text-odonto-blue text-sm">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
