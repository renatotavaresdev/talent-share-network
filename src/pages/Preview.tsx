
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Curriculum from "@/components/Curriculum";
import { Briefcase, ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FreelancerData } from "@/components/FreelancerForm";

const Preview = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FreelancerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem("freelancerData");
    
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      // No saved data, redirect to registration
      navigate("/register");
    }
    
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-slow">Carregando...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4">Nenhum dado encontrado</h2>
          <Link to="/register">
            <Button>Cadastrar Informações</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">TalentFlow</span>
          </div>
          
          <div className="flex gap-2">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </Button>
            </Link>
            
            <Link to="/register">
              <Button variant="outline" className="flex items-center gap-1">
                <Edit className="h-4 w-4" /> Editar
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow py-10 px-4">
        <Curriculum data={data} showSensitiveInfo={true} />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t py-6 px-6">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} TalentFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Preview;
