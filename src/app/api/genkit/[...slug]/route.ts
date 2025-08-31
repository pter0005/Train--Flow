'use server';
import { defineNextHandler } from '@genkit-ai/next';
import { ai } from '@/ai/genkit';

export const { GET, POST } = defineNextHandler({ ai });
