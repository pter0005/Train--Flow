// This file uses server-side code.
'use server';
import { genkit } from '@/ai/genkit';
import { nextHandler } from '@genkit-ai/next';

export const POST = nextHandler(genkit);
