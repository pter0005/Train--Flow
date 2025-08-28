import { mockStudents, mockExercises } from '@/lib/mock-data';
import type { Student } from '@/lib/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Pencil, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ProgressChart from '@/components/dashboard/progress-chart';
import AiExerciseSuggester from '@/components/dashboard/ai-exercise-suggester';

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const student = mockStudents.find((s) => s.id === params.id) as Student | undefined;

  if (!student) {
    notFound();
  }

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
          <Pencil className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </div>

      <Tabs defaultValue="profile" className="mt-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="training">Training Sheets</TabsTrigger>
          <TabsTrigger value="assessment">Physical Assessment</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardContent className="pt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold">Goals</h3>
                <p className="text-muted-foreground">{student.goals}</p>
              </div>
              <div>
                <h3 className="font-semibold">Physical Restrictions</h3>
                <p className="text-muted-foreground">{student.restrictions}</p>
              </div>
              <div>
                <h3 className="font-semibold">Contact</h3>
                <p className="text-muted-foreground">{student.phone}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="training" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-headline">Training Sheets</CardTitle>
                <AiExerciseSuggester student={student} exercises={mockExercises} />
              </div>
              <CardDescription>
                Manage and assign workout plans for {student.name}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {student.trainingSheets.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.trainingSheets.map((sheet) => (
                      <TableRow key={sheet.id}>
                        <TableCell>{sheet.name}</TableCell>
                        <TableCell>{new Date(sheet.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="icon"><FileText className="h-4 w-4" /></Button>
                          <Button variant="outline" size="icon"><Trash2 className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No training sheets found.</p>
                  <p className="text-sm text-muted-foreground">Create a new one using the AI suggester.</p>
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
                    <CardTitle className="font-headline">Latest Measurements</CardTitle>
                    <CardDescription>Recorded on {new Date(student.measurements[student.measurements.length - 1].date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between"><span>Weight:</span> <span className="font-semibold">{student.measurements[student.measurements.length - 1].weight} kg</span></div>
                    <div className="flex justify-between"><span>Body Fat:</span> <span className="font-semibold">{student.measurements[student.measurements.length - 1].bodyFat}%</span></div>
                    <div className="flex justify-between"><span>Chest:</span> <span className="font-semibold">{student.measurements[student.measurements.length - 1].measurements.chest} cm</span></div>
                     <div className="flex justify-between"><span>Waist:</span> <span className="font-semibold">{student.measurements[student.measurements.length - 1].measurements.waist} cm</span></div>
                    <Button className="w-full mt-4">Add New Measurement</Button>
                </CardContent>
             </Card>
           </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
