// This file uses server-side code.
'use server';
import { ai } from '@/ai/genkit';
import { createHandler } from '@genkit-ai/next';

export const { GET, POST } = createHandler({ ai });
