
'use client'

import { useState } from 'react';
import { mockStudents, mockExercises } from '@/lib/mock-data';
import type { Student, TrainingSheet } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Trash2, Wand2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AiExerciseSuggester from '@/components/dashboard/ai-exercise-suggester';

interface StudentTrainingSheetProps {
  student: Student;
};

export default function StudentTrainingSheet({ student: initialStudent }: StudentTrainingSheetProps) {
  const [student, setStudent] = useState<Student>(initialStudent);

  const handleTrainingSheetCreated = (newSheet: TrainingSheet) => {
    const updatedStudent = {
      ...student,
      trainingSheets: [...student.trainingSheets, newSheet]
    };
    setStudent(updatedStudent);

    // This would typically be an API call to update the student data on the server
    const studentIndex = mockStudents.findIndex(s => s.id === student.id);
    if (studentIndex !== -1) {
      mockStudents[studentIndex] = updatedStudent;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-headline">Fichas de Treino</CardTitle>
          <AiExerciseSuggester 
            student={student} 
            exercises={mockExercises}
            onTrainingSheetCreated={handleTrainingSheetCreated}
          />
        </div>
        <CardDescription>
          Gerencie e atribua planos de treino para {student.name}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {student.trainingSheets.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {student.trainingSheets.map((sheet) => (
                <TableRow key={sheet.id}>
                  <TableCell className="font-medium">{sheet.name}</TableCell>
                  <TableCell>{new Date(sheet.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon"><FileText className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma ficha de treino encontrada.</p>
            <AiExerciseSuggester 
              student={student} 
              exercises={mockExercises}
              onTrainingSheetCreated={handleTrainingSheetCreated}
              openTrigger={
                <Button className="mt-4">
                  <Wand2 className="mr-2 h-4 w-4" /> Criar com IA
                </Button>
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
