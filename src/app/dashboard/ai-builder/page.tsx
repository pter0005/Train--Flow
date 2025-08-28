
'use client';

import { useState } from 'react';
import { mockStudents, mockExercises } from '@/lib/mock-data';
import type { Student, TrainingSheet } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import AiExerciseSuggester from '@/components/dashboard/ai-exercise-suggester';

export default function AiBuilderPage() {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleTrainingSheetCreated = (newSheet: TrainingSheet) => {
    const studentIndex = mockStudents.findIndex(s => s.id === selectedStudentId);
    if (studentIndex !== -1) {
      mockStudents[studentIndex].trainingSheets.push(newSheet);
      toast({
        title: "Ficha de Treino Salva!",
        description: `${newSheet.name} foi adicionada para ${mockStudents[studentIndex].name}.`,
      });
      router.push(`/dashboard/students/${selectedStudentId}`);
    }
  };

  const selectedStudent = mockStudents.find(s => s.id === selectedStudentId);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl flex items-center gap-2">
          <Wand2 className="h-6 w-6" />
          Montador de Treino com IA
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Selecione um Aluno</CardTitle>
          <CardDescription>
            Escolha para qual aluno você deseja gerar uma nova ficha de treino.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="student-select">Aluno</Label>
            <Select onValueChange={setSelectedStudentId}>
              <SelectTrigger id="student-select">
                <SelectValue placeholder="Selecione um aluno..." />
              </SelectTrigger>
              <SelectContent>
                {mockStudents.map(student => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedStudent && (
             <AiExerciseSuggester 
                student={selectedStudent} 
                exercises={mockExercises}
                onTrainingSheetCreated={handleTrainingSheetCreated}
                openTrigger={
                     <Button className="w-full">
                        <Wand2 className="mr-2 h-4 w-4" /> Gerar Ficha de Treino para {selectedStudent.name}
                    </Button>
                }
              />
          )}
        </CardContent>
      </Card>
    </>
  );
}
