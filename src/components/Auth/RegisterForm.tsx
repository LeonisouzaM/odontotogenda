
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createUserWithEmail } from "@/lib/firebase";
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  clinicName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    clinicName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  
  const [validations, setValidations] = useState({
    email: true,
    phone: true,
    password: true,
    confirmPassword: true,
    passwordStrength: 0
  });

  // Email validation effect
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidations(prev => ({
      ...prev,
      email: formData.email === "" || emailRegex.test(formData.email)
    }));
  }, [formData.email]);
  
  // Phone validation effect
  useEffect(() => {
    const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$|^$|^\d+$/;
    setValidations(prev => ({
      ...prev,
      phone: formData.phone === "" || phoneRegex.test(formData.phone)
    }));
  }, [formData.phone]);
  
  // Password validation effect
  useEffect(() => {
    // Password strength: 0-weak, 1-medium, 2-strong
    let strength = 0;
    if (formData.password.length >= 8) strength++;
    if (/[A-Z]/.test(formData.password) && /[0-9]/.test(formData.password)) strength++;
    
    setValidations(prev => ({
      ...prev,
      passwordStrength: strength,
      password: formData.password === "" || formData.password.length >= 6,
      confirmPassword: formData.confirmPassword === "" || formData.password === formData.confirmPassword
    }));
  }, [formData.password, formData.confirmPassword]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    // Format phone number as user types
    if (id === "phone") {
      let formattedPhone = value.replace(/\D/g, "");
      if (formattedPhone.length <= 11) {
        if (formattedPhone.length > 2) {
          formattedPhone = `(${formattedPhone.slice(0, 2)}) ${formattedPhone.slice(2)}`;
        }
        if (formattedPhone.length > 10) {
          formattedPhone = `${formattedPhone.slice(0, 10)}-${formattedPhone.slice(10)}`;
        }
        setFormData(prev => ({ ...prev, [id]: formattedPhone }));
      }
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
    
    const newValidations = {
      email: emailRegex.test(formData.email),
      phone: phoneRegex.test(formData.phone),
      password: formData.password.length >= 6,
      confirmPassword: formData.password === formData.confirmPassword,
      passwordStrength: validations.passwordStrength
    };
    
    setValidations(newValidations);
    
    return (
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.clinicName !== "" &&
      newValidations.email &&
      newValidations.phone &&
      newValidations.password &&
      newValidations.confirmPassword
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create user with Firebase
      await createUserWithEmail(formData.email, formData.password);
      toast.success("Conta criada com sucesso!");
      onRegisterSuccess();
      navigate("/dashboard");
    } catch (error) {
      // Handle registration errors
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError("Erro ao criar a conta");
        toast.error("Erro ao criar a conta");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nome</Label>
          <Input 
            id="firstName" 
            placeholder="Seu nome" 
            required 
            value={formData.firstName}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input 
            id="lastName" 
            placeholder="Seu sobrenome" 
            required 
            value={formData.lastName}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="clinicName">Nome da Clínica</Label>
        <Input 
          id="clinicName" 
          placeholder="Nome da sua clínica" 
          required 
          value={formData.clinicName}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="flex justify-between">
          <span>Email</span>
          {formData.email && !validations.email && (
            <span className="text-xs text-red-500 flex items-center">
              <X className="h-3 w-3 mr-1" /> Email inválido
            </span>
          )}
          {formData.email && validations.email && (
            <span className="text-xs text-green-500 flex items-center">
              <Check className="h-3 w-3 mr-1" /> Email válido
            </span>
          )}
        </Label>
        <Input 
          id="email" 
          type="text" 
          placeholder="seu@email.com" 
          required 
          className={!validations.email ? "border-red-500" : ""}
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="flex justify-between">
          <span>Telefone</span>
          {formData.phone && !validations.phone && (
            <span className="text-xs text-red-500 flex items-center">
              <X className="h-3 w-3 mr-1" /> Formato: (00) 00000-0000
            </span>
          )}
        </Label>
        <Input 
          id="phone" 
          placeholder="(00) 00000-0000" 
          required 
          className={!validations.phone ? "border-red-500" : ""}
          value={formData.phone}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="flex justify-between">
          <span>Senha</span>
          {formData.password && !validations.password && (
            <span className="text-xs text-red-500 flex items-center">
              <X className="h-3 w-3 mr-1" /> Mínimo 6 caracteres
            </span>
          )}
        </Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="••••••••" 
          required 
          className={!validations.password ? "border-red-500" : ""}
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />
        {formData.password && (
          <PasswordStrengthIndicator passwordStrength={validations.passwordStrength} />
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="flex justify-between">
          <span>Confirme a Senha</span>
          {formData.confirmPassword && !validations.confirmPassword && (
            <span className="text-xs text-red-500 flex items-center">
              <X className="h-3 w-3 mr-1" /> Senhas não coincidem
            </span>
          )}
          {formData.confirmPassword && validations.confirmPassword && formData.password && (
            <span className="text-xs text-green-500 flex items-center">
              <Check className="h-3 w-3 mr-1" /> Senhas coincidem
            </span>
          )}
        </Label>
        <Input 
          id="confirmPassword" 
          type="password" 
          placeholder="••••••••" 
          required 
          className={!validations.confirmPassword ? "border-red-500" : ""}
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      
      <div className="text-sm text-gray-500">
        Ao se registrar, você concorda com nossos{" "}
        <Link to="/terms" className="text-odonto-blue hover:underline">
          Termos de Serviço
        </Link>{" "}
        e{" "}
        <Link to="/privacy" className="text-odonto-blue hover:underline">
          Política de Privacidade
        </Link>
        .
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-odonto-blue hover:bg-odonto-blue-dark"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
            Criando conta...
          </>
        ) : (
          "Criar Conta"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
