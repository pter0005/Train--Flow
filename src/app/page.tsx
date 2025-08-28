
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-900 p-4">
      <div className="flex flex-col gap-8 items-center">
        <Card className="w-full max-w-md shadow-2xl bg-black/20 backdrop-blur-xl border border-white/20 text-white">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4">
                <Logo />
              </div>
            <CardTitle className="text-3xl font-headline">Bem-vindo ao TrainFlow</CardTitle>
            <CardDescription className="text-white/80">Insira suas credenciais para acessar sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">E-mail</Label>
                <Input id="email" type="email" placeholder="m@exemplo.com" required className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-white"/>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-white/90">Senha</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline hover:text-white/80">
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input id="password" type="password" required className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-white"/>
              </div>
              <Button type="submit" className="w-full bg-white/90 text-blue-900 hover:bg-white">
                Entrar
              </Button>
              <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Entrar com Link Mágico
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{' '}
              <Link href="/register" className="underline hover:text-white/80">
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full max-w-sm shadow-2xl bg-black/20 backdrop-blur-xl border border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-center">Acesso de Demonstração</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="p-3 rounded-lg bg-white/10 border border-white/20">
              <h3 className="font-semibold">Personal Trainer</h3>
              <p><span className="font-medium text-white/80">E-mail:</span> personal@trainflow.com</p>
              <p><span className="font-medium text-white/80">Senha:</span> senha123</p>
            </div>
             <div className="p-3 rounded-lg bg-white/10 border border-white/20">
              <h3 className="font-semibold">Aluno</h3>
              <p className="text-xs text-white/90">(Visualização em breve)</p>
               <p><span className="font-medium text-white/80">E-mail:</span> aluno@trainflow.com</p>
               <p><span className="font-medium text-white/80">Senha:</span> senha123</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
