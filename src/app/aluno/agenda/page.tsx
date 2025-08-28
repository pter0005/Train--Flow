
'use client';

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Dumbbell } from 'lucide-react';
import { mockStudents } from '@/lib/mock-data';

export default function AlunoAgendaPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const student = mockStudents[0];

  const formattedDate = date ? new Intl.DateTimeFormat('pt-BR', { weekday: 'long', month: 'long', day: 'numeric' }).format(date) : '...';

  // Mock data for student's schedule
  const schedule = {
    '2024-07-22': { name: 'Treino Full Body', status: 'Concluído' },
    '2024-07-24': { name: 'Treino Full Body', status: 'Concluído' },
    '2024-07-26': { name: 'Treino Full Body', status: 'Próximo' },
  };

  const today = new Date();
  today.setHours(0,0,0,0);
  
  const DayContent = (day: Date) => {
    const dateString = day.toISOString().split('T')[0];
    const event = schedule[dateString as keyof typeof schedule];
    if (event) {
        return (
            <div className="relative h-full w-full flex items-center justify-center">
                <span>{day.getDate()}</span>
                <Dumbbell className="absolute bottom-1 h-3 w-3 text-primary"/>
            </div>
        )
    }
    return <span>{day.getDate()}</span>
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">
          Minha Agenda
        </h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="p-0 [&_td]:w-14 [&_td]:h-14 [&_th]:w-14"
                        classNames={{
                            day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full",
                            day_today: "bg-accent text-accent-foreground rounded-full",
                        }}
                        components={{
                            DayContent: ({ date }) => DayContent(date),
                        }}
                    />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline capitalize">
                Treinos para {formattedDate}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold">{student.trainingSheets[0]?.name}</p>
                        <p className="text-sm text-muted-foreground">Foco: Pernas e Ombros</p>
                    </div>
                    <Badge variant="default">Próximo</Badge>
                </div>
                 <Button size="sm" className="mt-4 w-full">
                    <CheckCircle2 className="mr-2 h-4 w-4"/>
                    Marcar como Concluído
                 </Button>
              </div>
               <div className="text-center text-muted-foreground">
                <p>Nenhum outro treino para hoje.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
