
import React from "react";
import { useMultiStepForm } from "@/components/ui/multi-step-form";
import { FileUpload } from "@/components/ui/file-upload";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FreelancerData } from "@/components/FreelancerForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Calendar, FileText, Mail, MapPin, Map } from "lucide-react";

const personalInfoSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  rg: z.string().min(1, "RG é obrigatório"),
  cpf: z.string().length(14, "CPF deve ter 14 caracteres"),
  email: z.string().email("E-mail inválido"),
  address: z.string().min(1, "Endereço é obrigatório"),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  cep: z.string().length(9, "CEP deve ter 9 caracteres"),
  photo: z.any().optional(),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

const PersonalInfoForm = () => {
  const { formData, updateFormData, nextStep } = useMultiStepForm();
  
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors }
  } = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: formData.fullName || "",
      birthDate: formData.birthDate || "",
      rg: formData.rg || "",
      cpf: formData.cpf || "",
      email: formData.email || "",
      address: formData.address || "",
      complement: formData.complement || "",
      city: formData.city || "",
      state: formData.state || "",
      cep: formData.cep || "",
      photo: formData.photo || null,
    },
  });

  const onSubmit = (data: PersonalInfoValues) => {
    updateFormData({
      ...data,
      // Preserve photo if it was already set but not updated in this submission
      photo: data.photo || formData.photo,
    });
    nextStep();
  };

  // Formatters and masks
  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "cpf") {
      const formattedValue = formatCPF(value);
      setValue("cpf", formattedValue);
    } else if (name === "cep") {
      const formattedValue = formatCEP(value);
      setValue("cep", formattedValue);
      
      // If CEP is complete (8 digits + formatting), try to fetch address data
      if (formattedValue.replace(/\D/g, "").length === 8) {
        fetch(`https://viacep.com.br/ws/${formattedValue.replace(/\D/g, "")}/json/`)
          .then(response => response.json())
          .then(data => {
            if (!data.erro) {
              setValue("address", data.logradouro);
              setValue("city", data.localidade);
              setValue("state", data.uf);
            }
          })
          .catch(() => {
            // Silently fail on API error
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-section">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-1">Informações Pessoais</h2>
        <p className="text-muted-foreground">
          Preencha seus dados pessoais e de contato
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group col-span-2">
            <Label htmlFor="photo" className="form-label mb-2">
              Sua Foto
            </Label>
            <FileUpload
              onFileChange={(file) => setValue("photo", file)}
              value={formData.photo}
              previewUrl={formData.photoUrl}
            />
          </div>
          
          <div className="form-group col-span-2">
            <Label htmlFor="fullName" className="form-label flex items-center gap-2">
              <User className="h-4 w-4" /> Nome Completo
            </Label>
            <Input
              id="fullName"
              placeholder="Seu nome completo"
              className="form-input"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="form-error">{errors.fullName.message}</p>
            )}
          </div>
          
          <div className="form-group">
            <Label htmlFor="birthDate" className="form-label flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Data de Nascimento
            </Label>
            <Input
              id="birthDate"
              type="date"
              className="form-input"
              {...register("birthDate")}
            />
            {errors.birthDate && (
              <p className="form-error">{errors.birthDate.message}</p>
            )}
          </div>
          
          <div className="form-group">
            <Label htmlFor="email" className="form-label flex items-center gap-2">
              <Mail className="h-4 w-4" /> E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              className="form-input"
              {...register("email")}
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
        </div>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4" /> Documentos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <Label htmlFor="rg" className="form-label">
                RG
              </Label>
              <Input
                id="rg"
                placeholder="0.000.000"
                className="form-input"
                {...register("rg")}
              />
              {errors.rg && (
                <p className="form-error">{errors.rg.message}</p>
              )}
            </div>
            
            <div className="form-group">
              <Label htmlFor="cpf" className="form-label">
                CPF
              </Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                className="form-input"
                {...register("cpf")}
                maxLength={14}
                onChange={handleInputChange}
              />
              {errors.cpf && (
                <p className="form-error">{errors.cpf.message}</p>
              )}
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Endereço
          </h3>
          
          <div className="space-y-4">
            <div className="form-group">
              <Label htmlFor="cep" className="form-label">
                CEP
              </Label>
              <Input
                id="cep"
                placeholder="00000-000"
                className="form-input"
                {...register("cep")}
                maxLength={9}
                onChange={handleInputChange}
              />
              {errors.cep && (
                <p className="form-error">{errors.cep.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group col-span-2">
                <Label htmlFor="address" className="form-label">
                  Endereço
                </Label>
                <Input
                  id="address"
                  placeholder="Rua, número"
                  className="form-input"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="form-error">{errors.address.message}</p>
                )}
              </div>
              
              <div className="form-group col-span-2">
                <Label htmlFor="complement" className="form-label">
                  Complemento
                </Label>
                <Input
                  id="complement"
                  placeholder="Apartamento, bloco, referência"
                  className="form-input"
                  {...register("complement")}
                />
              </div>
              
              <div className="form-group">
                <Label htmlFor="city" className="form-label">
                  Cidade
                </Label>
                <Input
                  id="city"
                  placeholder="Sua cidade"
                  className="form-input"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="form-error">{errors.city.message}</p>
                )}
              </div>
              
              <div className="form-group">
                <Label htmlFor="state" className="form-label">
                  Estado
                </Label>
                <Input
                  id="state"
                  placeholder="UF"
                  className="form-input"
                  {...register("state")}
                />
                {errors.state && (
                  <p className="form-error">{errors.state.message}</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
