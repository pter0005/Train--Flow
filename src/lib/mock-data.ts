import type { Student, Exercise } from './types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@example.com',
    phone: '123-456-7890',
    avatarUrl: 'https://picsum.photos/id/1/200/200',
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
    avatarUrl: 'https://picsum.photos/id/2/200/200',
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
  {
    id: '3',
    name: 'Beatriz Lima',
    email: 'beatriz.lima@example.com',
    phone: '111-222-3333',
    avatarUrl: 'https://picsum.photos/id/3/200/200',
    goals: 'Ganhar força e resistência',
    restrictions: 'Asma, evitar exercícios de alta intensidade',
    measurements: [
      { id: 'm4', date: '2024-04-20', weight: 62, bodyFat: 22, measurements: { waist: 68 } }
    ],
    trainingSheets: []
  },
  {
    id: '4',
    name: 'Daniel Almeida',
    email: 'daniel.almeida@example.com',
    phone: '444-555-6666',
    avatarUrl: 'https://picsum.photos/id/4/200/200',
    goals: 'Correr uma maratona de 10km',
    restrictions: 'Nenhuma',
    measurements: [
      { id: 'm5', date: '2024-05-10', weight: 78, bodyFat: 18, measurements: { waist: 85 } }
    ],
    trainingSheets: []
  },
  {
    id: '5',
    name: 'Eduarda Costa',
    email: 'eduarda.costa@example.com',
    phone: '777-888-9999',
    avatarUrl: 'https://picsum.photos/id/5/200/200',
    goals: 'Definição muscular e flexibilidade',
    restrictions: 'Nenhuma',
    measurements: [
      { id: 'm6', date: '2024-05-01', weight: 58, bodyFat: 19, measurements: { waist: 65 } }
    ],
    trainingSheets: []
  },
  {
    id: '6',
    name: 'Felipe Pereira',
    email: 'felipe.pereira@example.com',
    phone: '123-123-1234',
    avatarUrl: 'https://picsum.photos/id/6/200/200',
    goals: 'Aumentar a massa muscular (hipertrofia)',
    restrictions: 'Histórico de lesão no ombro',
    measurements: [
      { id: 'm7', date: '2024-04-15', weight: 90, bodyFat: 15, measurements: { chest: 110 } }
    ],
    trainingSheets: []
  },
  {
    id: '7',
    name: 'Gabriela Martins',
    email: 'gabriela.martins@example.com',
    phone: '456-456-4567',
    avatarUrl: 'https://picsum.photos/id/7/200/200',
    goals: 'Perder peso e melhorar a postura',
    restrictions: 'Nenhuma',
    measurements: [
      { id: 'm8', date: '2024-05-05', weight: 75, bodyFat: 28, measurements: { waist: 80 } }
    ],
    trainingSheets: []
  },
  {
    id: '8',
    name: 'Heitor Santos',
    email: 'heitor.santos@example.com',
    phone: '789-789-7890',
    avatarUrl: 'https://picsum.photos/id/8/200/200',
    goals: 'Manter a forma e aliviar o estresse',
    restrictions: 'Nenhuma',
    measurements: [
      { id: 'm9', date: '2024-03-30', weight: 82, bodyFat: 21, measurements: { waist: 88 } }
    ],
    trainingSheets: []
  },
  {
    id: '9',
    name: 'Isabela Ribeiro',
    email: 'isabela.ribeiro@example.com',
    phone: '101-112-1314',
    avatarUrl: 'https://picsum.photos/id/9/200/200',
    goals: 'Recuperação pós-parto',
    restrictions: 'Liberada para exercícios de baixo impacto',
    measurements: [
      { id: 'm10', date: '2024-05-12', weight: 68, bodyFat: 26, measurements: { waist: 78 } }
    ],
    trainingSheets: []
  },
  {
    id: '10',
    name: 'João Mendes',
    email: 'joao.mendes@example.com',
    phone: '151-617-1819',
    avatarUrl: 'https://picsum.photos/id/10/200/200',
    goals: 'Melhorar o condicionamento para o futebol',
    restrictions: 'Nenhuma',
    measurements: [
      { id: 'm11', date: '2024-04-25', weight: 76, bodyFat: 16, measurements: { waist: 82 } }
    ],
    trainingSheets: []
  },
  {
    id: '11',
    name: 'Larissa Nunes',
    email: 'larissa.nunes@example.com',
    phone: '202-122-2324',
    avatarUrl: 'https://picsum.photos/id/11/200/200',
    goals: 'Tonificar o corpo',
    restrictions: 'Nenhuma',
    measurements: [
      { id: 'm12', date: '2024-05-08', weight: 63, bodyFat: 23, measurements: { waist: 70 } }
    ],
    trainingSheets: []
  },
  {
    id: '12',
    name: 'Marcos Ferreira',
    email: 'marcos.ferreira@example.com',
    phone: '252-627-2829',
    avatarUrl: 'https://picsum.photos/id/12/200/200',
    goals: 'Aumentar a explosão e agilidade',
    restrictions: 'Leve desconforto no tornozelo',
    measurements: [
      { id: 'm13', date: '2024-04-18', weight: 88, bodyFat: 19, measurements: { waist: 92 } }
    ],
    trainingSheets: []
  }
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
