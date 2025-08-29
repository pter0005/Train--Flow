'use server';
import { nextApp } from '@genkit-ai/next';
import { ai } from '@/ai/genkit';

export const { GET, POST } = nextApp({ ai });
