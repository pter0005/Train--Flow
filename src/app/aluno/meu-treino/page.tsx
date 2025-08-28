
'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Repeat, Weight, Timer, Youtube } from 'lucide-react';
import { mockStudents, mockExercises } from '@/lib/mock-data';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const getYouTubeEmbedUrl = (url: string | undefined) => {
  if (!url) return '';
  const videoId = url.split('v=')[1];
  if (videoId) {
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return '';
};

export default function MeuTreinoPage() {
  const student = mockStudents[0];
  const currentSheet = student.trainingSheets[0];
  const [videoUrl, setVideoUrl] = useState('');

  const formattedDate = new Date(currentSheet.createdAt).toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

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
            <CardDescription>Criado em: {formattedDate}</CardDescription>
        </CardHeader>
        <CardContent>
            <Dialog open={!!videoUrl} onOpenChange={(isOpen) => !isOpen && setVideoUrl('')}>
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
                                    unoptimized // Permite GIFs
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
                                      <Button className="mt-4" onClick={() => setVideoUrl(getYouTubeEmbedUrl(exerciseDetails.videoUrl))}>
                                          <Youtube className="mr-2 h-4 w-4"/>
                                          Ver Vídeo de Execução
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
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Vídeo de Execução</DialogTitle>
                    </DialogHeader>
                    {videoUrl && (
                        <div className="aspect-video">
                            <iframe
                                src={videoUrl}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </CardContent>
      </Card>
    </>
  );
}
