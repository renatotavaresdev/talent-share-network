
import React from "react";
import { useMultiStepForm } from "@/components/ui/multi-step-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Clock, DollarSign, Phone } from "lucide-react";

const specialtiesSchema = z.object({
  field: z.string().min(1, "Área de atuação é obrigatória"),
  experienceYears: z.string().min(1, "Tempo de experiência é obrigatório"),
  hourlyRate: z.string().min(1, "Valor é obrigatório"),
  contactType: z.enum(["email", "whatsapp", "phone"], {
    required_error: "Tipo de contato é obrigatório",
  }),
  contactValue: z.string().min(1, "Informação de contato é obrigatória"),
});

type SpecialtiesValues = z.infer<typeof specialtiesSchema>;

const SpecialtiesForm = () => {
  const { formData, updateFormData, nextStep } = useMultiStepForm();
  
  const { 
    register, 
    handleSubmit, 
    setValue,
    watch,
    formState: { errors }
  } = useForm<SpecialtiesValues>({
    resolver: zodResolver(specialtiesSchema),
    defaultValues: {
      field: formData.field || "",
      experienceYears: formData.experienceYears || "",
      hourlyRate: formData.hourlyRate || "",
      contactType: formData.contactType || "email",
      contactValue: formData.contactValue || "",
    },
  });

  const contactType = watch("contactType");

  const onSubmit = (data: SpecialtiesValues) => {
    updateFormData(data);
    nextStep();
  };

  // Currency formatter for hourly rate
  const formatCurrency = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d)(\d{2})$/, "$1,$2")
      .replace(/(?=(\d{3})+(\D))\B/g, ".");
  };

  const handleHourlyRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatCurrency(value);
    setValue("hourlyRate", formattedValue);
  };

  // Format contact value based on type
  const formatContactValue = (value: string, type: string) => {
    if (type === "phone" || type === "whatsapp") {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    }
    return value;
  };

  const handleContactValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const type = watch("contactType");
    const formattedValue = formatContactValue(value, type);
    setValue("contactValue", formattedValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-section">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-1">Especialidades</h2>
        <p className="text-muted-foreground">
          Conte-nos sobre sua área de atuação e experiência profissional
        </p>
      </div>
      
      <div className="space-y-8">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> Área Profissional
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="form-group">
              <Label htmlFor="field" className="form-label">
                Área de Atuação
              </Label>
              <Input
                id="field"
                placeholder="Ex: Desenvolvimento Web, Design Gráfico, Marketing"
                className="form-input"
                {...register("field")}
              />
              {errors.field && (
                <p className="form-error">{errors.field.message}</p>
              )}
            </div>
            
            <div className="form-group">
              <Label htmlFor="experienceYears" className="form-label flex items-center gap-2">
                <Clock className="h-4 w-4" /> Tempo de Experiência
              </Label>
              <Input
                id="experienceYears"
                placeholder="Ex: 3 anos, 6 meses"
                className="form-input"
                {...register("experienceYears")}
              />
              {errors.experienceYears && (
                <p className="form-error">{errors.experienceYears.message}</p>
              )}
            </div>
            
            <div className="form-group">
              <Label htmlFor="hourlyRate" className="form-label flex items-center gap-2">
                <DollarSign className="h-4 w-4" /> Valor Cobrado
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <Input
                  id="hourlyRate"
                  placeholder="0,00"
                  className="form-input pl-10"
                  {...register("hourlyRate")}
                  onChange={handleHourlyRateChange}
                />
              </div>
              {errors.hourlyRate && (
                <p className="form-error">{errors.hourlyRate.message}</p>
              )}
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Phone className="h-4 w-4" /> Informações de Contato
          </h3>
          
          <div className="space-y-4">
            <div className="form-group">
              <Label htmlFor="contactType" className="form-label">
                Tipo de Contato Preferencial
              </Label>
              <Select
                defaultValue={formData.contactType || "email"}
                onValueChange={(value) => setValue("contactType", value as any)}
              >
                <SelectTrigger className="form-select">
                  <SelectValue placeholder="Selecione o tipo de contato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="phone">Telefone</SelectItem>
                </SelectContent>
              </Select>
              {errors.contactType && (
                <p className="form-error">{errors.contactType.message}</p>
              )}
            </div>
            
            <div className="form-group">
              <Label htmlFor="contactValue" className="form-label">
                {contactType === "email" ? "E-mail" :
                 contactType === "whatsapp" ? "Número do WhatsApp" :
                 "Número de Telefone"}
              </Label>
              <Input
                id="contactValue"
                placeholder={
                  contactType === "email" ? "seu.email@exemplo.com" :
                  "(00) 00000-0000"
                }
                type={contactType === "email" ? "email" : "text"}
                className="form-input"
                {...register("contactValue")}
                onChange={handleContactValueChange}
              />
              {errors.contactValue && (
                <p className="form-error">{errors.contactValue.message}</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </form>
  );
};

export default SpecialtiesForm;
