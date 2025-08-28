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
import {z} from 'genkit';

const SuggestExerciseInputSchema = z.object({
  goals: z.string().describe('Os objetivos de fitness do aluno.'),
  restrictions: z.string().describe('Quaisquer restrições físicas ou limitações do aluno.'),
  performanceData: z.string().describe('Dados históricos de desempenho de treinos do aluno.'),
  exerciseLibrary: z.string().describe('Uma lista de exercícios possíveis')
});
export type SuggestExerciseInput = z.infer<typeof SuggestExerciseInputSchema>;

const SuggestExerciseOutputSchema = z.object({
  suggestedExercises: z.string().describe('Uma lista de sugestões de exercícios adaptados ao aluno.'),
  reasoning: z.string().describe('O raciocínio da IA por trás das sugestões de exercícios.'),
});
export type SuggestExerciseOutput = z.infer<typeof SuggestExerciseOutputSchema>;

export async function suggestExercise(input: SuggestExerciseInput): Promise<SuggestExerciseOutput> {
  return suggestExerciseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestExercisePrompt',
  input: {schema: SuggestExerciseInputSchema},
  output: {schema: SuggestExerciseOutputSchema},
  prompt: `Você é um assistente de IA para personal trainer.

Você sugerirá exercícios com base nos objetivos, restrições e desempenho anterior do aluno.

Considere as seguintes informações sobre o aluno:

Objetivos: {{{goals}}}
Restrições: {{{restrictions}}}
Dados de Desempenho: {{{performanceData}}}
Biblioteca de Exercícios: {{{exerciseLibrary}}}

Sugira exercícios adaptados ao aluno e explique seu raciocínio.`,
});

const suggestExerciseFlow = ai.defineFlow(
  {
    name: 'suggestExerciseFlow',
    inputSchema: SuggestExerciseInputSchema,
    outputSchema: SuggestExerciseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
