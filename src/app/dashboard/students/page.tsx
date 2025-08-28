import Link from 'next/link';
import { mockStudents } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function StudentsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">
          Alunos
        </h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Aluno
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`${student.avatarUrl}?${student.id}`} alt={student.name} data-ai-hint="portrait person" />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg font-semibold">{student.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{student.email}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium">Objetivos</h4>
                  <p className="text-sm text-muted-foreground truncate">{student.goals}</p>
                </div>
                <Button asChild variant="secondary" className="w-full mt-4">
                  <Link href={`/dashboard/students/${student.id}`}>Ver Perfil</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
