
import React from "react";
import { Link } from "react-router-dom";
import FreelancerForm from "@/components/FreelancerForm";
import { Briefcase, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">TalentFlow</span>
          </div>
          
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow py-10 px-4">
        <FreelancerForm />
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

export default Register;
