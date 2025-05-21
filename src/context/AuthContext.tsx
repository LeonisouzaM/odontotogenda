import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, signOutUser } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Tipo simplificado de usuário para modo local
type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  getIdToken?: () => Promise<string>;
};

type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Logout function
  const logout = async () => {
    try {
      await signOutUser();
      toast.success("Logout realizado com sucesso");
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Erro ao fazer logout");
    }
  };

  useEffect(() => {
    // Set up auth state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", user);
      setCurrentUser(user);
      setLoading(false);
      
      // Redirect based on auth status
      if (user && window.location.pathname === '/login') {
        navigate('/dashboard');
        toast.success(`Bem-vindo de volta, ${user.email?.split('@')[0] || ''}!`);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const value = {
    currentUser,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
