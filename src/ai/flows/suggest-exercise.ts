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
  goals: z.string().describe('The fitness goals of the student.'),
  restrictions: z.string().describe('Any physical restrictions or limitations of the student.'),
  performanceData: z.string().describe('Historical workout performance data of the student.'),
  exerciseLibrary: z.string().describe('A list of possible exercises')
});
export type SuggestExerciseInput = z.infer<typeof SuggestExerciseInputSchema>;

const SuggestExerciseOutputSchema = z.object({
  suggestedExercises: z.string().describe('A list of exercise suggestions tailored to the student.'),
  reasoning: z.string().describe('The AI reasoning behind the exercise suggestions.'),
});
export type SuggestExerciseOutput = z.infer<typeof SuggestExerciseOutputSchema>;

export async function suggestExercise(input: SuggestExerciseInput): Promise<SuggestExerciseOutput> {
  return suggestExerciseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestExercisePrompt',
  input: {schema: SuggestExerciseInputSchema},
  output: {schema: SuggestExerciseOutputSchema},
  prompt: `You are a personal trainer AI assistant.

You will suggest exercises based on the student's goals, restrictions, and past performance.

Consider the following information about the student:

Goals: {{{goals}}}
Restrictions: {{{restrictions}}}
Performance Data: {{{performanceData}}}
Exercise Library: {{{exerciseLibrary}}}

Suggest exercises tailored to the student and explain your reasoning.`,
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
