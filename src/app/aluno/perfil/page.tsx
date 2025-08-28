
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockStudents } from "@/lib/mock-data";
import Image from "next/image";
import { Pencil, User, Shield, Mail, Phone, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PerfilPage() {
    const student = mockStudents[0];

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">
                Meu Perfil
                </h1>
                <Button>
                    <Pencil className="mr-2 h-4 w-4"/> Salvar Alterações
                </Button>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1 flex flex-col items-center pt-8">
                     <Image
                        src={student.avatarUrl}
                        alt={student.name}
                        width={150}
                        height={150}
                        data-ai-hint="portrait person"
                        className="rounded-full border-4 border-primary shadow-lg"
                    />
                    <h2 className="mt-4 text-2xl font-bold font-headline">{student.name}</h2>
                    <p className="text-muted-foreground">{student.email}</p>
                    <Button variant="outline" className="mt-4">Trocar Foto</Button>
                </div>

                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações Pessoais</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name"><User className="inline-block mr-2 h-4 w-4"/>Nome</Label>
                                <Input id="name" defaultValue={student.name}/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="email"><Mail className="inline-block mr-2 h-4 w-4"/>Email</Label>
                                <Input id="email" type="email" defaultValue={student.email}/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="phone"><Phone className="inline-block mr-2 h-4 w-4"/>Telefone</Label>
                                <Input id="phone" type="tel" defaultValue={student.phone}/>
                            </div>
                        </CardContent>
                    </Card>

                     <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Objetivos e Restrições</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="goals"><Target className="inline-block mr-2 h-4 w-4"/>Meus Objetivos</Label>
                                <Textarea id="goals" defaultValue={student.goals} rows={4}/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="restrictions"><Shield className="inline-block mr-2 h-4 w-4"/>Restrições Físicas</Label>
                                <Textarea id="restrictions" defaultValue={student.restrictions} rows={3}/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </>
    )
}
