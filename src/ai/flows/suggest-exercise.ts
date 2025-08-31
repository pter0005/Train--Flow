
// This file uses server-side code.
'use server';

/**
 * @fileOverview Provides AI-driven exercise suggestions based on student data.
 *
 * - suggestExercise - A function that suggests exercises tailored to a student's profile.
 * - SuggestExerciseInput - The input type for the suggestExercise function.
 * - SuggestExerciseOutput - The return type for the suggestExercise function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const SuggestExerciseInputSchema = z.object({
  goals: z.string().describe('Os objetivos de fitness do aluno.'),
  restrictions: z.string().describe('Quaisquer restrições físicas ou limitações do aluno.'),
  performanceData: z.string().describe('Dados históricos de desempenho de treinos do aluno.'),
  exerciseLibrary: z.string().describe('Uma lista de exercícios possíveis')
});
export type SuggestExerciseInput = z.infer<typeof SuggestExerciseInputSchema>;

const SuggestedExerciseSchema = z.object({
  exerciseName: z.string().describe('O nome do exercício da biblioteca.'),
  sets: z.string().describe('O número de séries. Ex: 3'),
  reps: z.string().describe('O número de repetições. Ex: 10-12'),
});

const SuggestExerciseOutputSchema = z.object({
  trainingSheetName: z.string().describe('Um nome criativo e adequado para a ficha de treino. Ex: "Força Total - Fase 1"'),
  suggestedExercises: z.array(SuggestedExerciseSchema).describe('Uma lista de 5-7 sugestões de exercícios adaptados ao aluno, retirados da biblioteca.'),
  reasoning: z.string().describe('Uma explicação concisa (2-3 frases) do porquê esta ficha de treino é adequada para o aluno.'),
});
export type SuggestExerciseOutput = z.infer<typeof SuggestExerciseOutputSchema>;

export async function suggestExercise(input: SuggestExerciseInput): Promise<SuggestExerciseOutput> {
  return suggestExerciseFlow(input);
}

const suggestExercisePrompt = ai.definePrompt(
  {
    name: 'suggestExercisePrompt',
    input: { schema: SuggestExerciseInputSchema },
    output: { schema: SuggestExerciseOutputSchema },
    prompt: `Você é um personal trainer especialista em criar fichas de treino.

Sua tarefa é criar uma ficha de treino completa com 5 a 7 exercícios para um aluno, com base nos seus dados e na lista de exercícios disponíveis. Para cada exercício, defina o número de séries e repetições.

Considere as seguintes informações sobre o aluno:

- Objetivos: {{{goals}}}
- Restrições: {{{restrictions}}}
- Dados de Desempenho Anteriores: {{{performanceData}}}

Use **exclusivamente** os exercícios da seguinte lista para montar o treino. Não invente exercícios.
- Biblioteca de Exercícios Disponíveis: {{{exerciseLibrary}}}

Crie um nome para a ficha de treino e forneça uma breve justificativa para suas escolhas.`,
  },
);

const suggestExerciseFlow = ai.defineFlow(
  {
    name: 'suggestExerciseFlow',
    inputSchema: SuggestExerciseInputSchema,
    outputSchema: SuggestExerciseOutputSchema,
  },
  async (input) => {
    const { output } = await suggestExercisePrompt(input, { model: googleAI.model('gemini-1.5-pro-latest') });
    if (!output) {
      throw new Error('A IA não conseguiu gerar uma sugestão de exercício.');
    }
    return output;
  }
);
