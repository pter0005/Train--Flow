import type { Student, Exercise } from './types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@example.com',
    phone: '123-456-7890',
    avatarUrl: 'https://picsum.photos/200/200',
    goals: 'Perder 10kg, aumentar massa muscular',
    restrictions: 'Leve dor no joelho esquerdo',
    measurements: [
      {
        id: 'm1',
        date: '2024-01-15',
        weight: 70,
        bodyFat: 25,
        measurements: { chest: 90, waist: 75, hips: 100 },
      },
      {
        id: 'm2',
        date: '2024-03-15',
        weight: 68,
        bodyFat: 23,
        measurements: { chest: 88, waist: 72, hips: 98 },
      },
       {
        id: 'm3',
        date: '2024-05-15',
        weight: 66,
        bodyFat: 21,
        measurements: { chest: 87, waist: 70, hips: 97 },
      },
    ],
    trainingSheets: [
      {
        id: 'ts1',
        name: 'Treino Full Body - Fase 1',
        createdAt: '2024-05-01',
        exercises: [
          { exerciseId: 'ex1', sets: '3', reps: '12', load: '20kg', rest: '60s' },
          { exerciseId: 'ex2', sets: '3', reps: '10', load: '50kg', rest: '90s' },
          { exerciseId: 'ex3', sets: '3', reps: '15', load: 'Peso Corporal', rest: '60s' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Carlos Souza',
    email: 'carlos.souza@example.com',
    phone: '098-765-4321',
    avatarUrl: 'https://picsum.photos/200/200',
    goals: 'Melhorar a saúde cardiovascular',
    restrictions: 'Nenhuma',
    measurements: [
      {
        id: 'm3',
        date: '2024-02-01',
        weight: 85,
        bodyFat: 20,
        measurements: { chest: 105, waist: 90, hips: 102 },
      },
    ],
    trainingSheets: [],
  },
];

export const mockExercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Agachamento Goblet',
    muscleGroup: 'Pernas',
    instructions: 'Segure um halter verticalmente contra o peito. Agache até que seus quadris fiquem paralelos ao chão.',
    imageUrl: 'https://picsum.photos/600/400',
  },
  {
    id: 'ex2',
    name: 'Supino',
    muscleGroup: 'Peito',
    instructions: 'Deite-se em um banco plano, pegue a barra com uma pegada de largura média. Abaixe a barra até o meio do peito e empurre-a de volta para cima.',
    imageUrl: 'https://picsum.photos/600/400',
  },
  {
    id: 'ex3',
    name: 'Prancha',
    muscleGroup: 'Core',
    instructions: 'Mantenha a posição de flexão com o corpo formando uma linha reta da cabeça aos calcanhares. Contraia o core.',
    imageUrl: 'https://picsum.photos/600/400',
  },
  {
    id: 'ex4',
    name: 'Rosca Bíceps',
    muscleGroup: 'Braços',
    instructions: 'Fique em pé, segurando um halter em cada mão com os braços estendidos. Flexione os cotovelos, levando os pesos até o nível dos ombros.',
    imageUrl: 'https://picsum.photos/600/400',
  },
   {
    id: 'ex5',
    name: 'Levantamento Terra',
    muscleGroup: 'Costas',
    instructions: 'Posicione-se com o meio do pé sob a barra. Incline o quadril e segure a barra. Levante o peito e endireite a parte inferior das costas. Puxe.',
    imageUrl: 'https://picsum.photos/600/400',
  },
   {
    id: 'ex6',
    name: 'Desenvolvimento de Ombros',
    muscleGroup: 'Ombros',
    instructions: 'Fique em pé com a barra nos ombros da frente. Pressione a barra acima da cabeça até que seus braços estejam totalmente estendidos.',
    imageUrl: 'https://picsum.photos/600/400',
  },
];
