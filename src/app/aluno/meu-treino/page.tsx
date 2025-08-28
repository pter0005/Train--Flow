
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dumbbell, Repeat, Weight, Timer, Info, Youtube } from 'lucide-react';
import { mockStudents, mockExercises } from '@/lib/mock-data';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MeuTreinoPage() {
  const student = mockStudents[0];
  const currentSheet = student.trainingSheets[0];

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">
          Minha Ficha de Treino
        </h1>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl">{currentSheet.name}</CardTitle>
            <CardDescription>Criado em: {new Date(currentSheet.createdAt).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
            {currentSheet.exercises.map((trainingExercise, index) => {
                const exerciseDetails = mockExercises.find(e => e.id === trainingExercise.exerciseId);
                if (!exerciseDetails) return null;

                return (
                    <AccordionItem value={`item-${index}`} key={trainingExercise.exerciseId}>
                        <AccordionTrigger className="hover:no-underline">
                           <div className="flex items-center gap-4">
                             <Image
                                src={exerciseDetails.imageUrl || `https://picsum.photos/80/80?${exerciseDetails.id}`}
                                alt={exerciseDetails.name}
                                width={80}
                                height={80}
                                data-ai-hint="exercise fitness"
                                className="object-cover rounded-md aspect-square"
                                />
                             <div>
                                <h3 className="text-lg font-semibold text-left">{exerciseDetails.name}</h3>
                                <p className="text-sm text-muted-foreground text-left">{exerciseDetails.muscleGroup}</p>
                             </div>
                           </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="grid md:grid-cols-2 gap-6 p-4">
                            <div>
                                <h4 className="font-semibold mb-2">Instruções</h4>
                                <p className="text-muted-foreground">{exerciseDetails.instructions}</p>
                                {exerciseDetails.videoUrl && (
                                  <Button asChild className="mt-4">
                                    <Link href={exerciseDetails.videoUrl} target="_blank">
                                      <Youtube className="mr-2 h-4 w-4"/>
                                      Ver Vídeo de Execução
                                    </Link>
                                  </Button>
                                )}
                            </div>
                            <div className="space-y-4">
                                 <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Repeat className="h-6 w-6"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Séries & Repetições</p>
                                        <p className="font-bold text-lg">{trainingExercise.sets} x {trainingExercise.reps}</p>
                                    </div>
                                </div>
                                 <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Weight className="h-6 w-6"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Carga Sugerida</p>
                                        <p className="font-bold text-lg">{trainingExercise.load}</p>
                                    </div>
                                </div>
                                 <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Timer className="h-6 w-6"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Descanso</p>
                                        <p className="font-bold text-lg">{trainingExercise.rest}</p>
                                    </div>
                                </div>
                            </div>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
            </Accordion>
        </CardContent>
      </Card>
    </>
  );
}
