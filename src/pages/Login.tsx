
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { signInWithEmail } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Validate input fields
    if (!email.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }
    
    try {
      // Attempt to sign in
      await signInWithEmail(email, password);
      toast.success("Login bem-sucedido!");
      // AuthContext will handle the navigation
    } catch (error) {
      // Display the error message
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError("Erro ao fazer login");
        toast.error("Erro ao fazer login");
      }
    } finally {
      setIsLoading(false);
    }
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
            Entre na sua conta para acessar o sistema
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="seu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link to="/forgot-password" className="text-sm text-odonto-blue hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-odonto-blue hover:bg-odonto-blue-dark"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Não tem uma conta?</span>{" "}
          <Link to="/register" className="text-odonto-blue hover:underline">
            Registre-se aqui
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
