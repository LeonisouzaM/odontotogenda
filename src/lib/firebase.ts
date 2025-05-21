// Mock Firebase para modo local sem autenticação
// Este arquivo substitui a integração real com o Firebase para permitir testes locais

// Usuário simulado para modo local
const mockUser = {
  uid: 'local-user-id',
  email: 'usuario.teste@local.com',
  displayName: 'Usuário Teste',
  emailVerified: true,
  getIdToken: () => Promise.resolve('mock-token'),
};

// Auth simulado
export const auth = {
  currentUser: mockUser,
  onAuthStateChanged: (callback) => {
    // Simula um usuário já autenticado
    setTimeout(() => {
      callback(mockUser);
    }, 100);
    
    // Retorna uma função de limpeza simulada
    return () => {};
  }
};

// Login simulado - sempre retorna sucesso
export const signInWithEmail = async (email, password) => {
  console.log('Login simulado com:', email);
  return { user: mockUser };
};

// Registro simulado - sempre retorna sucesso
export const createUserWithEmail = async (email, password, displayName) => {
  console.log('Registro simulado com:', email, displayName);
  return { user: { ...mockUser, displayName: displayName || mockUser.displayName } };
};

// Reset de senha simulado
export const sendPasswordReset = async (email) => {
  console.log('Reset de senha simulado para:', email);
  return Promise.resolve();
};

// Logout simulado
export const signOutUser = async () => {
  console.log('Logout simulado');
  return Promise.resolve();
};
