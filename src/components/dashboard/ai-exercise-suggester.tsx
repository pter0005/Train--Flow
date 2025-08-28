'use client';

import { useState } from 'react';
import { suggestExercise } from '@/ai/flows/suggest-exercise';
import type { SuggestExerciseOutput } from '@/ai/flows/suggest-exercise';
import type { Student, Exercise, TrainingSheet, TrainingExercise } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Loader, Wand2, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

type AiExerciseSuggesterProps = {
  student: Student;
  exercises: Exercise[];
  onTrainingSheetCreated: (newSheet: TrainingSheet) => void;
  openTrigger?: React.ReactNode;
};

export default function AiExerciseSuggester({ student, exercises, onTrainingSheetCreated, openTrigger }: AiExerciseSuggesterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestExerciseOutput | null>(null);
  const { toast } = useToast();

  const handleSuggestion = async () => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const exerciseLibrary = exercises.map(e => `${e.name}`).join(', ');
      const performanceData = student.trainingSheets
        .flatMap(sheet => sheet.exercises.map(ex => `Completou ${ex.sets}x${ex.reps} de ${exercises.find(e => e.id === ex.exerciseId)?.name} com ${ex.load}`))
        .join('; ');

      const result = await suggestExercise({
        goals: student.goals,
        restrictions: student.restrictions,
        performanceData: performanceData || 'Nenhum dado de desempenho disponível.',
        exerciseLibrary: exerciseLibrary,
      });
      setSuggestion(result);
    } catch (error) {
      console.error('Falha na sugestão da IA:', error);
      toast({
        variant: "destructive",
        title: "Erro da IA",
        description: "Não foi possível gerar a sugestão. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSheet = () => {
    if (!suggestion) return;

    const newExercises: TrainingExercise[] = suggestion.suggestedExercises.map(se => {
        const exercise = exercises.find(e => e.name === se.exerciseName);
        return {
            exerciseId: exercise ? exercise.id : 'unknown',
            sets: se.sets,
            reps: se.reps,
            load: 'a definir', // Default value
            rest: '60s', // Default value
        };
    });

    const newSheet: TrainingSheet = {
        id: `ts-${Date.now()}`,
        name: suggestion.trainingSheetName,
        createdAt: new Date().toISOString(),
        exercises: newExercises,
    };
    
    onTrainingSheetCreated(newSheet);
    setIsOpen(false);
    setSuggestion(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
            setSuggestion(null);
            setIsLoading(false);
        }
    }}>
      <DialogTrigger asChild>
        {openTrigger || (
          <Button>
            <Wand2 className="mr-2 h-4 w-4" /> Criar com IA
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Wand2 className="text-primary" />
            Montador de Treino com IA
          </DialogTitle>
          <DialogDescription>
            Gere uma ficha de treino completa para {student.name} com base em seu perfil e clique em Salvar.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 min-h-[300px] flex items-center justify-center">
          {!suggestion && !isLoading && (
            <div className="text-center">
              <Button onClick={handleSuggestion} disabled={isLoading} size="lg">
                <Wand2 className="mr-2 h-4 w-4" /> Gerar Ficha de Treino
              </Button>
            </div>
          )}

          {isLoading && (
              <div className="flex flex-col items-center gap-2">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Analisando perfil e montando o treino...</p>
              </div>
          )}

          {suggestion && (
            <div className="space-y-4 w-full">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold font-headline">{suggestion.trainingSheetName}</CardTitle>
                   <p className="text-sm text-muted-foreground pt-2">{suggestion.reasoning}</p>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Exercício</TableHead>
                            <TableHead>Séries</TableHead>
                            <TableHead>Repetições</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {suggestion.suggestedExercises.map((ex, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{ex.exerciseName}</TableCell>
                                <TableCell>{ex.sets}</TableCell>
                                <TableCell>{ex.reps}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
            </DialogClose>
            {suggestion && (
                 <Button onClick={handleSaveSheet}>
                    <Save className="mr-2 h-4 w-4"/>
                    Salvar Ficha de Treino
                </Button>
            )}
             {!suggestion && (
                <Button onClick={handleSuggestion} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  'Gerar Novamente'
                )}
              </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
