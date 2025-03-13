
import React, { useState, useEffect } from "react";
import { useMultiStepForm } from "@/components/ui/multi-step-form";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";

const experienceSchema = z.object({
  experience: z.string().max(3000, "A descrição deve ter no máximo 3000 caracteres"),
});

type ExperienceValues = z.infer<typeof experienceSchema>;

const ExperienceForm = () => {
  const { formData, updateFormData, nextStep } = useMultiStepForm();
  const [charCount, setCharCount] = useState(0);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors }
  } = useForm<ExperienceValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experience: formData.experience || "",
    },
  });

  const experienceValue = watch("experience");
  
  useEffect(() => {
    setCharCount(experienceValue ? experienceValue.length : 0);
  }, [experienceValue]);

  const onSubmit = (data: ExperienceValues) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-section">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-1">Experiência Profissional</h2>
        <p className="text-muted-foreground">
          Compartilhe mais detalhes sobre sua trajetória e experiência
        </p>
      </div>
      
      <div className="space-y-8">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4" /> Descrição Detalhada
          </h3>
          
          <div className="form-group">
            <Label htmlFor="experience" className="form-label">
              Experiência Profissional
              <span className="text-xs text-muted-foreground ml-2">
                ({charCount}/3000 caracteres)
              </span>
            </Label>
            <Textarea
              id="experience"
              placeholder="Descreva sua experiência, projetos anteriores, habilidades específicas e qualquer outra informação relevante..."
              className="form-input h-64 resize-none"
              {...register("experience")}
            />
            {errors.experience && (
              <p className="form-error">{errors.experience.message}</p>
            )}
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Sugestões do que incluir:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Projetos relevantes que você participou</li>
              <li>Habilidades técnicas específicas</li>
              <li>Certificações e formação acadêmica</li>
              <li>Conquistas profissionais</li>
              <li>Sua abordagem de trabalho e metodologia</li>
            </ul>
          </div>
        </Card>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            Próximos passos
          </h3>
          <p className="text-sm text-blue-700">
            Após finalizar este formulário, um currículo será gerado automaticamente com suas informações.
            Seus dados sensíveis (CPF e RG) serão protegidos e só ficarão visíveis para você.
          </p>
        </div>
      </div>
    </form>
  );
};

export default ExperienceForm;
