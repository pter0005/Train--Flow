'use server';
import { ai } from '@/ai/genkit';
import { nextHandler } from '@genkit-ai/next';

// This is the correct way to export the handler for Genkit v1.x
export const { GET, POST } = nextHandler({ ai });
