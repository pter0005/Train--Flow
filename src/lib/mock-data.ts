import type { Student, Exercise } from './types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '123-456-7890',
    avatarUrl: 'https://picsum.photos/200/200',
    goals: 'Lose 10kg, increase muscle mass',
    restrictions: 'Slight knee pain on left leg',
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
        name: 'Full Body Workout - Phase 1',
        createdAt: '2024-05-01',
        exercises: [
          { exerciseId: 'ex1', sets: '3', reps: '12', load: '20kg', rest: '60s' },
          { exerciseId: 'ex2', sets: '3', reps: '10', load: '50kg', rest: '90s' },
          { exerciseId: 'ex3', sets: '3', reps: '15', load: 'Bodyweight', rest: '60s' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '098-765-4321',
    avatarUrl: 'https://picsum.photos/200/200',
    goals: 'Improve cardiovascular health',
    restrictions: 'None',
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
    name: 'Goblet Squat',
    muscleGroup: 'Legs',
    instructions: 'Hold a dumbbell vertically against your chest. Squat down until your hips are parallel to the ground.',
    imageUrl: 'https://picsum.photos/600/400',
  },
  {
    id: 'ex2',
    name: 'Bench Press',
    muscleGroup: 'Chest',
    instructions: 'Lie on a flat bench, grab the barbell with a medium grip width. Lower the bar to your mid-chest and push it back up.',
    imageUrl: 'https://picsum.photos/600/400',
  },
  {
    id: 'ex3',
    name: 'Plank',
    muscleGroup: 'Core',
    instructions: 'Hold a push-up position with your body forming a straight line from head to heels. Engage your core.',
    imageUrl: 'https://picsum.photos/600/400',
  },
  {
    id: 'ex4',
    name: 'Bicep Curl',
    muscleGroup: 'Arms',
    instructions: 'Stand up straight, holding a dumbbell in each hand at arm\'s length. Curl the weights up to shoulder level.',
    imageUrl: 'https://picsum.photos/600/400',
  },
   {
    id: 'ex5',
    name: 'Deadlift',
    muscleGroup: 'Back',
    instructions: 'Stand with your mid-foot under the barbell. Hinge at the hips and grab the bar. Lift the chest and straighten your lower back. Pull.',
    imageUrl: 'https://picsum.photos/600/400',
  },
   {
    id: 'ex6',
    name: 'Overhead Press',
    muscleGroup: 'Shoulders',
    instructions: 'Stand with the bar on your front shoulders. Press the bar over your head until your arms are fully extended.',
    imageUrl: 'https://picsum.photos/600/400',
  },
];
