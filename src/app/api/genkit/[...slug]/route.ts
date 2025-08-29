// This file uses server-side code.
'use server';
import { ai } from '@/ai/genkit';
import { nextHandler } from '@genkit-ai/next';

export const POST = nextHandler({ ai });
