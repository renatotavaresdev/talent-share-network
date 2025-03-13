
import React from "react";
import { FreelancerData } from "@/components/FreelancerForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Phone,
  FileText,
  Download,
  Share2
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface CurriculumProps {
  data: FreelancerData;
  showSensitiveInfo?: boolean;
}

const Curriculum = ({ data, showSensitiveInfo = false }: CurriculumProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Currículo de ${data.fullName}`,
        text: `Confira o currículo de ${data.fullName} na plataforma de freelancers.`,
        url: window.location.href,
      }).catch(() => {
        toast({
          title: "Atenção",
          description: "Não foi possível compartilhar o currículo.",
          variant: "destructive",
        });
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "O link do currículo foi copiado para sua área de transferência.",
      });
    }
  };
  
  const handleDownload = () => {
    // This is a simplified version. In a real app, you would generate a PDF
    const element = document.getElementById("curriculum-content");
    if (!element) return;
    
    // Convert HTML to PDF or print
    window.print();
    
    toast({
      title: "Currículo salvo!",
      description: "Seu currículo foi salvo com sucesso.",
    });
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Currículo</h1>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShare}
            className="flex items-center gap-1"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Compartilhar</span>
          </Button>
          
          <Button 
            variant="default" 
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Baixar</span>
          </Button>
        </div>
      </div>
      
      <div id="curriculum-content" className="space-y-6 animate-fade-in">
        <Card className="overflow-hidden">
          <div className="bg-primary h-32"></div>
          <div className="px-6 pb-6 -mt-16">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                {data.photoUrl ? (
                  <img 
                    src={data.photoUrl} 
                    alt={data.fullName} 
                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-4 border-white">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="pt-16 sm:pt-0">
                <h2 className="text-2xl font-semibold">{data.fullName}</h2>
                <p className="text-muted-foreground">{data.field}</p>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Informações Pessoais</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">E-mail</p>
                    <p className="text-sm">{data.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Localização</p>
                    <p className="text-sm">{data.city}, {data.state}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Data de Nascimento</p>
                    <p className="text-sm">{new Date(data.birthDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                
                {showSensitiveInfo && (
                  <>
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">RG</p>
                        <p className="text-sm">{data.rg}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">CPF</p>
                        <p className="text-sm">{data.cpf}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Endereço Completo</p>
                        <p className="text-sm">
                          {data.address}
                          {data.complement && `, ${data.complement}`}
                          <br />
                          {data.city}, {data.state} - CEP {data.cep}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Especialidades</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Área de Atuação</p>
                    <p className="text-sm">{data.field}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Tempo de Experiência</p>
                    <p className="text-sm">{data.experienceYears}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Valor Cobrado</p>
                    <p className="text-sm">R$ {data.hourlyRate}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      {data.contactType === "email" ? "E-mail para Contato" :
                       data.contactType === "whatsapp" ? "WhatsApp" :
                       "Telefone"}
                    </p>
                    <p className="text-sm">{data.contactValue}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Experiência Profissional</h3>
              
              <div className="whitespace-pre-line">
                {data.experience || (
                  <p className="text-muted-foreground italic">
                    Nenhuma experiência detalhada foi fornecida.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
