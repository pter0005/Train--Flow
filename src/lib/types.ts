export type Measurement = {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    armL?: number;
    armR?: number;
    thighL?: number;
    thighR?: number;
  };
};

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  instructions: string;
  videoUrl?: string;
  imageUrl?: string;
};

export type TrainingExercise = {
  exerciseId: string;
  sets: string;
  reps: string;
  load: string;
  rest: string;
  notes?: string;
};

export type TrainingSheet = {
  id: string;
  name: string;
  createdAt: string;
  exercises: TrainingExercise[];
};

export type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  goals: string;
  restrictions: string;
  measurements: Measurement[];
  trainingSheets: TrainingSheet[];
};
