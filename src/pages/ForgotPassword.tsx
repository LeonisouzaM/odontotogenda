
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { sendPasswordReset } from "@/lib/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);
    
    // Validate email field
    if (!email.trim()) {
      setError("Por favor, preencha o campo de email.");
      setIsLoading(false);
      return;
    }
    
    try {
      // Send password reset email
      await sendPasswordReset(email);
      setSuccess(true);
    } catch (error) {
      // Display the error message
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro ao enviar email de redefinição de senha.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 border">
        <div className="flex flex-col items-center mb-8">
          <Calendar className="h-12 w-12 text-odonto-blue mb-2" />
          <h2 className="text-center text-2xl font-bold">
            Odonto<span className="text-odonto-blue">Agenda</span>
          </h2>
          <p className="mt-2 text-center text-gray-500">
            Recuperação de senha
          </p>
        </div>
        
        {success ? (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              Email de redefinição de senha enviado com sucesso. Verifique sua caixa de entrada.
            </div>
            <Link to="/login" className="block text-center">
              <Button className="w-full bg-odonto-blue hover:bg-odonto-blue-dark">
                Voltar para o login
              </Button>
            </Link>
          </div>
        ) : (
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
              <p className="text-xs text-gray-500">
                Digite o email associado à sua conta para receber um link de redefinição de senha.
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-odonto-blue hover:bg-odonto-blue-dark"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Enviando...
                </>
              ) : (
                "Enviar link de redefinição"
              )}
            </Button>
          </form>
        )}
        
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Lembrou sua senha?</span>{" "}
          <Link to="/login" className="text-odonto-blue hover:underline">
            Volte para o login
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
