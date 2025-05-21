/**
 * Utilitários para gerenciamento de localStorage
 * 
 * Este arquivo contém funções reutilizáveis para carregar e salvar dados no localStorage,
 * facilitando a persistência de dados entre recarregamentos de página.
 */

/**
 * Carrega dados do localStorage
 * @param key Chave para buscar no localStorage
 * @param defaultValue Valor padrão caso não exista dados ou ocorra erro
 * @returns Dados armazenados ou valor padrão
 */
export const loadFromLocalStorage = (key: string, defaultValue: any) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      // Caso especial para datas em agendamentos
      if (key === 'appointments') {
        const parsed = JSON.parse(storedValue);
        return parsed.map((appointment: any) => ({
          ...appointment,
          date: new Date(appointment.date)
        }));
      }
      return JSON.parse(storedValue);
    }
    return defaultValue;
  } catch (error) {
    console.error(`Erro ao carregar dados do localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Salva dados no localStorage
 * @param key Chave para armazenar no localStorage
 * @param value Valor a ser armazenado
 */
export const saveToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Erro ao salvar dados no localStorage (${key}):`, error);
  }
};

/**
 * Limpa todos os dados do localStorage relacionados à aplicação
 * @param keysToPreserve Array opcional de chaves que não devem ser removidas
 */
export const clearAllLocalStorage = (keysToPreserve: string[] = []) => {
  try {
    // Lista de todas as chaves usadas pela aplicação
    const appKeys = [
      'patients',
      'appointments',
      'incomeEntries',
      'expenseEntries',
      'leads',
      'messageCampaigns'
    ];
    
    // Remove apenas as chaves que não estão na lista de preservação
    appKeys.forEach(key => {
      if (!keysToPreserve.includes(key)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Erro ao limpar localStorage:', error);
  }
};
