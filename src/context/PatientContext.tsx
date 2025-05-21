import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from "sonner";

export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  lastVisit: string;
  nextVisit: string;
  status: "active" | "inactive";
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  cpf?: string;
  gender?: string;
  health_insurance?: string;
  medical_notes?: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  procedure: string;
  date: Date;
  startTime: string;
  endTime: string;
  doctor: string;
  status: "confirmed" | "pending" | "cancelled";
  room: string;
  notes: string;
}

interface PatientContextType {
  patients: Patient[];
  appointments: Appointment[];
  addPatient: (patient: Omit<Patient, "id">) => void;
  updatePatient: (id: number, patient: Partial<Patient>) => void;
  deletePatient: (id: number) => void;
  getPatientById: (id: number) => Patient | undefined;
  addAppointment: (appointment: Omit<Appointment, "id">) => void;
  updateAppointment: (id: number, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: number) => void;
  getAppointmentsByPatientId: (patientId: number) => Appointment[];
  getAppointmentsByDate: (date: Date) => Appointment[];
}

// Função para carregar dados do localStorage
const loadFromLocalStorage = (key: string, defaultValue: any) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      
      // Converter strings de data para objetos Date para agendamentos
      if (key === 'appointments') {
        return parsedValue.map((appointment: any) => ({
          ...appointment,
          date: new Date(appointment.date)
        }));
      }
      
      return parsedValue;
    }
    return defaultValue;
  } catch (error) {
    console.error(`Erro ao carregar dados do localStorage (${key}):`, error);
    return defaultValue;
  }
};

// Função para salvar dados no localStorage
const saveToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Erro ao salvar dados no localStorage (${key}):`, error);
  }
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

// Create the context provider as a proper React functional component
export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializar estados com dados do localStorage ou arrays vazios
  const [patients, setPatients] = useState<Patient[]>(() => 
    loadFromLocalStorage('patients', [])
  );
  
  const [appointments, setAppointments] = useState<Appointment[]>(() => 
    loadFromLocalStorage('appointments', [])
  );

  // Salvar no localStorage quando os estados mudarem
  useEffect(() => {
    saveToLocalStorage('patients', patients);
  }, [patients]);

  useEffect(() => {
    saveToLocalStorage('appointments', appointments);
  }, [appointments]);

  // Patient management functions
  const addPatient = (patient: Omit<Patient, "id">) => {
    const newPatient = {
      ...patient,
      id: patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1,
    };
    setPatients([...patients, newPatient as Patient]);
    toast.success("Paciente adicionado com sucesso!");
  };

  const updatePatient = (id: number, patientData: Partial<Patient>) => {
    setPatients(
      patients.map((patient) =>
        patient.id === id ? { ...patient, ...patientData } : patient
      )
    );
    toast.success("Dados do paciente atualizados!");
  };

  const deletePatient = (id: number) => {
    setPatients(patients.filter((patient) => patient.id !== id));
    toast.success("Paciente removido com sucesso!");
  };

  const getPatientById = (id: number) => {
    return patients.find((patient) => patient.id === id);
  };

  // Appointment management functions
  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment = {
      ...appointment,
      id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
    };
    setAppointments([...appointments, newAppointment as Appointment]);
    toast.success("Consulta agendada com sucesso!");
  };

  const updateAppointment = (id: number, appointmentData: Partial<Appointment>) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, ...appointmentData } : appointment
      )
    );
    toast.success("Consulta atualizada!");
  };

  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
    toast.success("Consulta cancelada!");
  };

  const getAppointmentsByPatientId = (patientId: number) => {
    return appointments.filter((appointment) => appointment.patientId === patientId);
  };

  const getAppointmentsByDate = (date: Date) => {
    return appointments.filter(
      (appointment) => 
        appointment.date.getFullYear() === date.getFullYear() &&
        appointment.date.getMonth() === date.getMonth() &&
        appointment.date.getDate() === date.getDate()
    );
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        appointments,
        addPatient,
        updatePatient,
        deletePatient,
        getPatientById,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        getAppointmentsByPatientId,
        getAppointmentsByDate,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient deve ser usado dentro de um PatientProvider');
  }
  return context;
};
