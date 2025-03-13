
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { 
  MultiStepForm, 
  MultiStepFormProgress, 
  MultiStepFormActions 
} from "@/components/ui/multi-step-form";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import SpecialtiesForm from "@/components/SpecialtiesForm";
import ExperienceForm from "@/components/ExperienceForm";

export interface FreelancerData {
  // Personal Info
  fullName: string;
  birthDate: string;
  rg: string;
  cpf: string;
  email: string;
  address: string;
  complement: string;
  city: string;
  state: string;
  cep: string;
  photo: File | null;
  photoUrl: string | null;
  
  // Specialties
  field: string;
  experienceYears: string;
  hourlyRate: string;
  contactType: "email" | "whatsapp" | "phone";
  contactValue: string;
  
  // Experience
  experience: string;
}

const initialData: FreelancerData = {
  fullName: "",
  birthDate: "",
  rg: "",
  cpf: "",
  email: "",
  address: "",
  complement: "",
  city: "",
  state: "",
  cep: "",
  photo: null,
  photoUrl: null,
  
  field: "",
  experienceYears: "",
  hourlyRate: "",
  contactType: "email",
  contactValue: "",
  
  experience: "",
};

const FreelancerForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = (data: FreelancerData) => {
    setIsSubmitting(true);
    
    // Generate photo URL if photo exists
    if (data.photo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target?.result as string;
        
        // Save form data to localStorage (in a real app, you would send to backend)
        const completeData = {
          ...data,
          photoUrl,
          createdAt: new Date().toISOString(),
        };
        
        localStorage.setItem("freelancerData", JSON.stringify(completeData));
        
        toast({
          title: "Cadastro concluído!",
          description: "Seu currículo foi gerado com sucesso.",
        });
        
        // Navigate to curriculum preview
        navigate("/preview");
      };
      reader.readAsDataURL(data.photo);
    } else {
      // Save form data without photo
      const completeData = {
        ...data,
        photoUrl: null,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem("freelancerData", JSON.stringify(completeData));
      
      toast({
        title: "Cadastro concluído!",
        description: "Seu currículo foi gerado com sucesso.",
      });
      
      // Navigate to curriculum preview
      navigate("/preview");
    }
  };

  const steps = [
    {
      title: "Dados Pessoais",
      content: <PersonalInfoForm />,
    },
    {
      title: "Especialidades",
      content: <SpecialtiesForm />,
    },
    {
      title: "Experiência",
      content: <ExperienceForm />,
    },
  ];

  return (
    <div className="form-container">
      <h1 className="text-3xl font-semibold mb-8 text-center">Cadastro de Freelancer</h1>
      
      <MultiStepForm
        steps={steps}
        initialData={initialData}
        onComplete={handleComplete}
      >
        <MultiStepFormProgress className="mb-10" />
        
        {/* The active step content will be rendered here */}
        
        <MultiStepFormActions />
      </MultiStepForm>
    </div>
  );
};

export default FreelancerForm;
