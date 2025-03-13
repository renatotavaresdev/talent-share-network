
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, FileText, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">TalentFlow</span>
          </div>
          
          <Button 
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => navigate("/register")}
          >
            Cadastre-se <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <div className="inline-block bg-blue-50 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Plataforma de Freelancers
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Conectando talentos e oportunidades
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Crie seu perfil profissional, destaque suas habilidades e encontre as melhores oportunidades para freelancers.
              </p>
              
              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="text-base px-8 py-6 shadow-md transition-transform hover:translate-y-[-2px]"
                  onClick={() => navigate("/register")}
                >
                  Comece agora
                </Button>
              </div>
              
              <div className="flex items-center gap-2 pt-4 text-muted-foreground">
                <span className="flex items-center">
                  <Users className="h-5 w-5 mr-1 text-green-500" />
                  <span>Milhares de profissionais</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-muted" />
                <span className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-1 text-blue-500" />
                  <span>Diversas especialidades</span>
                </span>
              </div>
            </div>
            
            <div className="relative hidden lg:block animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Freelancers trabalhando"
                className="relative rounded-2xl shadow-lg object-cover w-full h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Como funciona</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Uma plataforma simples e eficiente para conectar profissionais e empresas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Crie seu perfil</h3>
              <p className="text-muted-foreground">
                Preencha suas informações profissionais e destaque suas habilidades.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conecte-se</h3>
              <p className="text-muted-foreground">
                Encontre projetos e clientes que combinem com suas habilidades.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trabalhe</h3>
              <p className="text-muted-foreground">
                Desenvolva projetos e construa sua reputação na plataforma.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="text-base"
              onClick={() => navigate("/register")}
            >
              Criar meu perfil <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">TalentFlow</span>
          </div>
          <p>© {new Date().getFullYear()} TalentFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
