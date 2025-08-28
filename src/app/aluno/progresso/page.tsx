
'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import ProgressChart from "@/components/dashboard/progress-chart";
import { mockStudents } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Measurement } from "@/lib/types";

export default function ProgressoPage() {
    const student = mockStudents[0];
    const measurements = [...student.measurements].reverse(); // Show most recent first

    const getTrendIcon = (current: number, previous?: number) => {
        if (previous === undefined) return <Minus className="h-4 w-4 text-muted-foreground" />;
        if (current < previous) return <TrendingDown className="h-4 w-4 text-green-500" />;
        if (current > previous) return <TrendingUp className="h-4 w-4 text-red-500" />;
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    };

    const getBodyFatTrendIcon = (current?: number, previous?: number) => {
        if (current === undefined || previous === undefined) return <Minus className="h-4 w-4 text-muted-foreground" />;
        if (current < previous) return <TrendingDown className="h-4 w-4 text-green-500" />;
        if (current > previous) return <TrendingUp className="h-4 w-4 text-red-500" />;
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    };

    return (
        <>
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">
            Meu Progresso
            </h1>
        </div>
        
        <ProgressChart data={student.measurements} />

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Histórico de Medidas</CardTitle>
                <CardDescription>Acompanhe sua evolução ao longo do tempo.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead className="text-center">Peso (kg)</TableHead>
                            <TableHead className="text-center">Gordura Corporal (%)</TableHead>
                            <TableHead className="text-center">Cintura (cm)</TableHead>
                            <TableHead className="text-center">Peito (cm)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {measurements.map((m, index) => {
                             const prev = measurements[index + 1];
                             return (
                                <TableRow key={m.id}>
                                    <TableCell className="font-medium">{new Date(m.date).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {m.weight}
                                            {getTrendIcon(m.weight, prev?.weight)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                         <div className="flex items-center justify-center gap-2">
                                            {m.bodyFat ? `${m.bodyFat}%` : 'N/A'}
                                            {m.bodyFat && getBodyFatTrendIcon(m.bodyFat, prev?.bodyFat)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {m.measurements.waist || 'N/A'}
                                            {m.measurements.waist && getTrendIcon(m.measurements.waist, prev?.measurements.waist)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {m.measurements.chest || 'N/A'}
                                            {m.measurements.chest && getTrendIcon(m.measurements.chest, prev?.measurements.chest)}
                                        </div>
                                    </TableCell>
                                </TableRow>
                             )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        </>
    )
}
