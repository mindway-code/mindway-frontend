// src/api/interfaces/appointment.ts

import { Child, Child1 } from './child';

/** Tipo de guia ou sessão */
export interface AppointmentType {
  id: number;
  name: string;
}

/** Compromisso agendado para uma criança */
export interface Appointment {
  id: number;
  date: string;           // YYYY-MM-DD
  time: string;           // HH:mm
  description: string;
  type: AppointmentType;
  child: Child1;
  //therapist_id: number;
}

export interface AppointmentsGrouped {
  [year: string]: {
    [month: string]: {
      [week: string]: {
        [date: string]: Appointment[];
      };
    };
  };
}

/** Dados de exemplo */
export const appointments: Appointment[] = [
  // Janeiro
  {
    id: 1,
    date: '2025-01-',
    time: '09:00',
    child: { id: 1, name: 'João Silva', user_id: 10 },
    type: { id: 1, name: 'Terapia Cognitiva' },
    description: 'Foco em linguagem'
  },
  {
    id: 2,
    date: '2025-01-15',
    time: '11:00',
    child: { id: 2, name: 'Ana Santos', user_id: 10 },
    type: { id: 2, name: 'Terapia Ocupacional' },
    description: 'Exercícios sensoriais'
  },
  {
    id: 3,
    date: '2025-01-01',
    time: '09:00',
    child: { id: 3, name: 'Carlos Souza', user_id: 12 },
    type: { id: 3, name: 'Intervenção Precoce' },
    description: 'Atividades motoras'
  },
  {
    id: 4,
    date: '2025-01-01',
    time: '10:00',
    child: { id: 4, name: 'Mariana Costa', user_id: 13 },
    type: { id: 4, name: 'Comunicação Alternativa' },
    description: 'Uso de pictogramas'
  },
  {
    id: 5,
    date: '2025-01-01',
    time: '11:00',
    child: { id: 5, name: 'Pedro Almeida', user_id: 14 },
    type: { id: 5, name: 'Terapia Cognitiva' },
    description: 'Desenvolvimento motor'
  },
  {
    id: 6,
    date: '2025-01-01',
    time: '12:00',
    child: { id: 6, name: 'Carla Dias', user_id: 15 },
    type: { id: 6, name: 'Terapia Ocupacional' },
    description: 'Coordenação motora'
  },
  {
    id: 7,
    date: '2025-01-01',
    time: '13:00',
    child: { id: 7, name: 'Lucas Oliveira', user_id: 16 },
    type: { id: 7, name: 'Intervenção Precoce' },
    description: 'Estimulação sensorial'
  },
  {
    id: 8,
    date: '2025-01-04',
    time: '14:00',
    child: { id: 8, name: 'Fernanda Lima', user_id: 17 },
    type: { id: 8, name: 'Comunicação Alternativa' },
    description: 'Treino de linguagem'
  },
  {
    id: 9,
    date: '2025-01-06',
    time: '15:00',
    child: { id: 9, name: 'José Pereira', user_id: 18 },
    type: { id: 9, name: 'Terapia Cognitiva' },
    description: 'Memória e atenção'
  },
  {
    id: 10,
    date: '2025-01-03',
    time: '16:00',
    child: { id: 10, name: 'Mariana Alves', user_id: 19 },
    type: { id: 10, name: 'Terapia Ocupacional' },
    description: 'Exercícios de vida diária'
  },
  // Fevereiro
  {
    id: 3,
    date: '2025-02-05',
    time: '09:30',
    child: { id: 3, name: 'Carlos Souza', user_id: 11 },
    type: { id: 3, name: 'Intervenção Precoce' },
    description: 'Atividades motoras'
  },
  {
    id: 4,
    date: '2025-02-12',
    time: '13:00',
    child: { id: 4, name: 'Mariana Costa', user_id: 12 },
    type: { id: 4, name: 'Comunicação Alternativa' },
    description: 'Uso de pictogramas'
  },
  // Março
  {
    id: 5,
    date: '2025-03-08',
    time: '14:00',
    child: { id: 5, name: 'Lucas Silva', user_id: 13 },
    type: { id: 5, name: 'Terapia Cognitiva' },
    description: 'Desenvolvimento motor'
  },
  {
    id: 6,
    date: '2025-03-20',
    time: '15:30',
    child: { id: 6, name: 'Maria Oliveira', user_id: 14 },
    type: { id: 6, name: 'Terapia Ocupacional' },
    description: 'Coordenação motora'
  },
  // Abril
  {
    id: 7,
    date: '2025-04-05',
    time: '10:00',
    child: { id: 7, name: 'Pedro Almeida', user_id: 15 },
    type: { id: 7, name: 'Terapia Cognitiva' },
    description: 'Foco em linguagem'
  },
  {
    id: 8,
    date: '2025-04-25',
    time: '11:00',
    child: { id: 8, name: 'Carla Dias', user_id: 16 },
    type: { id: 8, name: 'Terapia Ocupacional' },
    description: 'Exercícios motoros'
  },
  // Maio
  {
    id: 9,
    date: '2025-05-01',
    time: '09:00',
    child: { id: 9, name: 'João Silva', user_id: 17 },
    type: { id: 9, name: 'Terapia Cognitiva' },
    description: 'Foco em linguagem'
  },
  {
    id: 10,
    date: '2025-05-10',
    time: '11:00',
    child: { id: 10, name: 'Ana Santos', user_id: 18 },
    type: { id: 10, name: 'Terapia Ocupacional' },
    description: 'Exercícios sensoriais'
  },
  // Junho
  {
    id: 11,
    date: '2025-06-03',
    time: '08:30',
    child: { id: 11, name: 'Pedro Costa', user_id: 19 },
    type: { id: 11, name: 'Intervenção Precoce' },
    description: 'Atividades motoras'
  },
  {
    id: 12,
    date: '2025-06-17',
    time: '10:30',
    child: { id: 12, name: 'Fernanda Lima', user_id: 20 },
    type: { id: 12, name: 'Comunicação Alternativa' },
    description: 'Uso de pictogramas'
  },
  // Julho
  {
    id: 13,
    date: '2025-07-04',
    time: '14:00',
    child: { id: 13, name: 'Carlos Souza', user_id: 21 },
    type: { id: 13, name: 'Terapia Cognitiva' },
    description: 'Desenvolvimento motor'
  },
  {
    id: 14,
    date: '2025-07-19',
    time: '16:00',
    child: { id: 14, name: 'Mariana Costa', user_id: 22 },
    type: { id: 14, name: 'Terapia Ocupacional' },
    description: 'Exercícios sensoriais'
  },
  // Agosto
  {
    id: 15,
    date: '2025-08-05',
    time: '09:00',
    child: { id: 15, name: 'Lucas Oliveira', user_id: 23 },
    type: { id: 15, name: 'Intervenção Precoce' },
    description: 'Atividades motoras'
  },
  {
    id: 16,
    date: '2025-08-22',
    time: '11:30',
    child: { id: 16, name: 'Carla Santos', user_id: 24 },
    type: { id: 16, name: 'Comunicação Alternativa' },
    description: 'Uso de pictogramas'
  },
  // Setembro
  {
    id: 17,
    date: '2025-09-01',
    time: '10:00',
    child: { id: 17, name: 'João Silva', user_id: 25 },
    type: { id: 17, name: 'Terapia Cognitiva' },
    description: 'Foco em linguagem'
  },
  {
    id: 18,
    date: '2025-09-10',
    time: '13:00',
    child: { id: 18, name: 'Ana Santos', user_id: 26 },
    type: { id: 18, name: 'Terapia Ocupacional' },
    description: 'Exercícios sensoriais'
  },
  // Outubro
  {
    id: 19,
    date: '2025-10-15',
    time: '09:30',
    child: { id: 19, name: 'Carlos Souza', user_id: 27 },
    type: { id: 19, name: 'Intervenção Precoce' },
    description: 'Atividades motoras'
  },
  {
    id: 20,
    date: '2025-10-20',
    time: '14:30',
    child: { id: 20, name: 'Mariana Costa', user_id: 28 },
    type: { id: 20, name: 'Comunicação Alternativa' },
    description: 'Uso de pictogramas'
  },
  // Novembro
  {
    id: 21,
    date: '2025-11-02',
    time: '10:00',
    child: { id: 21, name: 'João Silva', user_id: 29 },
    type: { id: 21, name: 'Terapia Cognitiva' },
    description: 'Foco em linguagem'
  },
  {
    id: 22,
    date: '2025-11-07',
    time: '11:00',
    child: { id: 22, name: 'Ana Santos', user_id: 30 },
    type: { id: 22, name: 'Terapia Ocupacional' },
    description: 'Exercícios sensoriais'
  },
  // Dezembro
  {
    id: 23,
    date: '2025-12-12',
    time: '09:00',
    child: { id: 23, name: 'Carlos Souza', user_id: 31 },
    type: { id: 23, name: 'Intervenção Precoce' },
    description: 'Atividades motoras'
  },
  {
    id: 24,
    date: '2025-12-18',
    time: '14:00',
    child: { id: 24, name: 'Mariana Costa', user_id: 32 },
    type: { id: 24, name: 'Comunicação Alternativa' },
    description: 'Uso de pictogramas'
  }
];

