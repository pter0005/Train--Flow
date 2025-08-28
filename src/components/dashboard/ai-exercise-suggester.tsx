'use client';

import { useState } from 'react';
import { suggestExercise } from '@/ai/flows/suggest-exercise';
import type { Student, Exercise } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type AIEngineProps = {
  student: Student;
  exercises: Exercise[];
};

type Suggestion = {
  suggestedExercises: string;
  reasoning: string;
};

export default function AiExerciseSuggester({ student, exercises }: AIEngineProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  const handleSuggestion = async () => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const exerciseLibrary = exercises.map(e => `${e.name} (${e.muscleGroup})`).join(', ');
      const performanceData = student.trainingSheets
        .flatMap(sheet => sheet.exercises.map(ex => `Completed ${ex.sets}x${ex.reps} of ${exercises.find(e => e.id === ex.exerciseId)?.name} with ${ex.load}`))
        .join('; ');

      const result = await suggestExercise({
        goals: student.goals,
        restrictions: student.restrictions,
        performanceData: performanceData || 'No performance data available.',
        exerciseLibrary: exerciseLibrary,
      });
      setSuggestion(result);
    } catch (error) {
      console.error('AI suggestion failed:', error);
      // Here you would use a toast to show an error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Wand2 className="mr-2 h-4 w-4" /> Create with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Wand2 className="text-primary" />
            AI Exercise Suggester
          </DialogTitle>
          <DialogDescription>
            Generate a personalized workout plan for {student.name} based on their profile and history.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {!suggestion && (
            <div className="text-center">
              <Button onClick={handleSuggestion} disabled={isLoading} size="lg">
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Suggest Exercises'
                )}
              </Button>
            </div>
          )}

          {suggestion && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Suggested Exercises</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground">
                    <p>{suggestion.suggestedExercises}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Reasoning</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="prose prose-sm max-w-none text-foreground">
                    <p>{suggestion.reasoning}</p>
                   </div>
                </CardContent>
              </Card>
              <Button onClick={handleSuggestion} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Regenerate'
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
