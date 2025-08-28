
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dumbbell, Calendar, CheckCircle, Target, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockStudents, mockExercises } from '@/lib/mock-data';
import Link from 'next/link';

export default function AlunoDashboardPage() {
    const student = mockStudents[0];
    const currentSheet = student.trainingSheets[0];

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">
          Olá, {student.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">Pronto para o treino de hoje?</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Dumbbell className="text-primary"/>
                    Seu Treino Atual: {currentSheet.name}
                </CardTitle>
                <CardDescription>
                    Seu plano de treino para alcançar seus objetivos.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ul className="space-y-2">
                    {currentSheet.exercises.slice(0, 3).map(ex => {
                        const exerciseDetails = mockExercises.find(e => e.id === ex.exerciseId);
                        return (
                            <li key={ex.exerciseId} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                                <span>{exerciseDetails?.name}</span>
                                <span className="font-mono text-sm text-muted-foreground">{ex.sets}x{ex.reps}</span>
                            </li>
                        );
                    })}
                </ul>
                <Button asChild className="w-full">
                    <Link href="/aluno/meu-treino">Ver Ficha de Treino Completa</Link>
                </Button>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Target/>
                    Seu Objetivo
                </CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-muted-foreground">{student.goals}</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Progresso Recente</CardTitle>
                 <CardDescription>Última atualização de peso.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <Activity className="h-8 w-8 text-primary"/>
                    <div>
                        <p className="text-2xl font-bold">{student.measurements[student.measurements.length - 1].weight} kg</p>
                        <p className="text-xs text-muted-foreground">Em {new Date(student.measurements[student.measurements.length - 1].date).toLocaleDateString()}</p>
                    </div>
                </div>
                 <Button asChild variant="outline">
                    <Link href="/aluno/progresso">Ver Progresso</Link>
                </Button>
            </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline">Sessões da Semana</CardTitle>
                 <CardDescription>Seus treinos agendados e concluídos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg border bg-card">
                    <div>
                        <p className="font-semibold">Treino de Segunda</p>
                        <p className="text-sm text-muted-foreground">Foco: Peito e Tríceps</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Concluído</span>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg border bg-card">
                    <div>
                        <p className="font-semibold">Treino de Quarta</p>
                        <p className="text-sm text-muted-foreground">Foco: Costas e Bíceps</p>
                    </div>
                     <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Concluído</span>
                    </div>
                </div>
                 <div className="flex justify-between items-center p-3 rounded-lg border border-primary bg-primary/10">
                    <div>
                        <p className="font-semibold text-primary">Treino de Sexta</p>
                        <p className="text-sm text-primary/80">Foco: Pernas e Ombros</p>
                    </div>
                     <Button>Iniciar Treino</Button>
                </div>
            </CardContent>
        </Card>

      </div>
    </>
  );
}

