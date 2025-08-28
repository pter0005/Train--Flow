'use client';

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function SchedulePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">
          Schedule
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
                    />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                Workouts for{' '}
                {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '...'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold">Jane Doe</p>
                        <p className="text-sm text-muted-foreground">Full Body Workout</p>
                    </div>
                    <Badge variant="default">Completed</Badge>
                </div>
                 <Button variant="outline" size="sm" className="mt-4 w-full">View Details</Button>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                 <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold">John Smith</p>
                        <p className="text-sm text-muted-foreground">Cardio Day</p>
                    </div>
                    <Badge variant="destructive">Missed</Badge>
                </div>
                 <Button variant="outline" size="sm" className="mt-4 w-full">View Details</Button>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                 <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold">Mike Johnson</p>
                        <p className="text-sm text-muted-foreground">Leg Day</p>
                    </div>
                    <Badge variant="secondary">Upcoming</Badge>
                </div>
                 <Button size="sm" className="mt-4 w-full">
                    <CheckCircle2 className="mr-2 h-4 w-4"/>
                    Mark as Complete
                 </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
