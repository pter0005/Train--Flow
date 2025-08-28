'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-cover bg-center p-4 lg:p-8"
      style={{ backgroundImage: "url('https://i.imgur.com/fM7hyqW.png')" }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        <Card className="w-full bg-card/60 backdrop-blur-lg border-primary/20 shadow-primary/20 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4">
              <Logo />
            </div>
            <CardTitle className="text-3xl font-headline">Bem-vindo ao TrainFlow</CardTitle>
            <CardDescription>Insira suas credenciais para acessar sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="m@exemplo.com" required className="bg-background/70"/>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input id="password" type="password" required className="bg-background/70"/>
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
              <Button variant="outline" className="w-full bg-transparent hover:bg-primary/10">
                Entrar com Link Mágico
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{' '}
              <Link href="/register" className="underline">
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hidden md:block bg-card/60 backdrop-blur-lg border-accent/20 shadow-accent/20 shadow-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Info className="text-accent"/>
                    Dados de Demonstração
                </CardTitle>
                <CardDescription>
                    Use as credenciais abaixo para explorar a aplicação.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-lg">Personal Trainer</h3>
                    <p className="text-sm text-muted-foreground">Acesso completo ao painel de gerenciamento.</p>
                     <div className="mt-2 text-sm">
                        <p><strong className="font-medium">Email:</strong> personal@trainflow.com</p>
                        <p><strong className="font-medium">Senha:</strong> senha123</p>
                    </div>
                </div>
                <Separator />
                 <div>
                    <h3 className="font-semibold text-lg">Aluno</h3>
                    <p className="text-sm text-muted-foreground">Acesso ao painel do aluno (em breve).</p>
                     <div className="mt-2 text-sm">
                        <p><strong className="font-medium">Email:</strong> aluno@trainflow.com</p>
                        <p><strong className="font-medium">Senha:</strong> senha123</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
