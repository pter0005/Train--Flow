
'use client'

import { useState } from 'react';
import { mockStudents, mockExercises } from '@/lib/mock-data';
import type { Student, TrainingSheet } from '@/lib/types';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Pencil, Trash2, Wand2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ProgressChart from '@/components/dashboard/progress-chart';
import AiExerciseSuggester from '@/components/dashboard/ai-exercise-suggester';

type StudentDetailPageProps = {
  params: { id: string };
};

export default function StudentDetailPage({ params }: StudentDetailPageProps) {
  const initialStudent = mockStudents.find((s) => s.id === params.id);
  const router = useRouter();

  const [student, setStudent] = useState<Student | undefined>(initialStudent);

  if (!student) {
    notFound();
  }

  const handleTrainingSheetCreated = (newSheet: TrainingSheet) => {
    setStudent(prevStudent => {
      if (!prevStudent) return prevStudent;
      
      const updatedStudent = {
        ...prevStudent,
        trainingSheets: [...prevStudent.trainingSheets, newSheet]
      };

      const studentIndex = mockStudents.findIndex(s => s.id === prevStudent.id);
      if (studentIndex !== -1) {
        mockStudents[studentIndex] = updatedStudent;
      }
      
      return updatedStudent;
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={`${student.avatarUrl}?${student.id}`}
            alt={student.name}
            width={80}
            height={80}
            data-ai-hint="portrait person"
            className="rounded-full border-4 border-background shadow-md"
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">{student.name}</h1>
            <p className="text-muted-foreground">{student.email}</p>
          </div>
        </div>
        <Button>
          <Pencil className="mr-2 h-4 w-4" /> Editar Perfil
        </Button>
      </div>

      <Tabs defaultValue="training" className="mt-6">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="training">Fichas de Treino</TabsTrigger>
          <TabsTrigger value="assessment">Avaliação Física</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardContent className="pt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold">Objetivos</h3>
                <p className="text-muted-foreground">{student.goals}</p>
              </div>
              <div>
                <h3 className="font-semibold">Restrições Físicas</h3>
                <p className="text-muted-foreground">{student.restrictions}</p>
              </div>
              <div>
                <h3 className="font-semibold">Contato</h3>
                <p className="text-muted-foreground">{student.phone}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="training" className="mt-4">
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
        </TabsContent>
        <TabsContent value="assessment" className="mt-4">
           <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <ProgressChart data={student.measurements} />
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Últimas Medidas</CardTitle>
                    <CardDescription>Registrado em {new Date(student.measurements[student.measurements.length - 1].date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between"><span>Peso:</span> <span className="font-semibold">{student.measurements[student.measurements.length - 1].weight} kg</span></div>
                    <div className="flex justify-between"><span>Gordura Corporal:</span> <span className="font-semibold">{student.measurements[student.measurements.length - 1].bodyFat}%</span></div>
                    <div className="flex justify-between"><span>Peito:</span> <span className="font-semibold">{student.measurements[student.measurements.length - 1].measurements.chest} cm</span></div>
                     <div className="flex justify-between"><span>Cintura:</span> <span className="font-semibold">{student.measurements[student.measurements.length - 1].measurements.waist} cm</span></div>
                    <Button className="w-full mt-4">Adicionar Nova Medida</Button>
                </CardContent>
             </Card>
           </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
