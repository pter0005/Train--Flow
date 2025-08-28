import Image from 'next/image';
import { mockExercises } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ExercisesPage() {
  const muscleGroups = [...new Set(mockExercises.map((e) => e.muscleGroup))];

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">
          Biblioteca de Exercícios
        </h1>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por músculo" />
            </SelectTrigger>
            <SelectContent>
              {muscleGroups.map(group => (
                <SelectItem key={group} value={group.toLowerCase()}>{group}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Exercício
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-headline">Adicionar Novo Exercício</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Nome</Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="muscle-group" className="text-right">Grupo Muscular</Label>
                  <Input id="muscle-group" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="instructions" className="text-right">Instruções</Label>
                  <Textarea id="instructions" className="col-span-3" />
                </div>
              </div>
              <Button type="submit">Salvar Exercício</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockExercises.map((exercise) => (
          <Card key={exercise.id} className="flex flex-col">
            <CardHeader className="p-0">
               <Image
                src={`${exercise.imageUrl}?${exercise.id}`}
                alt={exercise.name}
                width={600}
                height={400}
                data-ai-hint="exercise fitness"
                className="object-cover rounded-t-lg aspect-[3/2]"
              />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold">{exercise.name}</CardTitle>
                 <Badge variant="secondary">{exercise.muscleGroup}</Badge>
              </div>
              <CardDescription className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {exercise.instructions}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0">
               <Button variant="outline" className="w-full">Ver Detalhes</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
