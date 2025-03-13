
import React, { createContext, useState, useContext, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  title: string;
  description?: string;
  content: ReactNode;
}

interface MultiStepFormContextValue {
  currentStep: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  steps: Step[];
  formData: any;
  updateFormData: (data: any) => void;
}

const MultiStepFormContext = createContext<MultiStepFormContextValue | undefined>(undefined);

export const useMultiStepForm = () => {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error("useMultiStepForm must be used within a MultiStepFormProvider");
  }
  return context;
};

interface MultiStepFormProps {
  steps: Step[];
  onComplete?: (data: any) => void;
  initialData?: any;
  className?: string;
  children?: ReactNode;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  onComplete,
  initialData = {},
  className,
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else if (onComplete) {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
      window.scrollTo(0, 0);
    }
  };

  const updateFormData = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
  };

  const contextValue: MultiStepFormContextValue = {
    currentStep,
    goToStep,
    nextStep,
    prevStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    steps,
    formData,
    updateFormData,
  };

  return (
    <MultiStepFormContext.Provider value={contextValue}>
      <div className={cn("space-y-8", className)}>
        {children}
        <div className="space-y-6">{steps[currentStep].content}</div>
      </div>
    </MultiStepFormContext.Provider>
  );
};

export const MultiStepFormProgress = ({ className }: { className?: string }) => {
  const { steps, currentStep, goToStep } = useMultiStepForm();

  return (
    <div className={cn("flex justify-between items-center", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div 
            className={cn(
              "flex flex-col items-center cursor-pointer group transition-apple",
              { "opacity-50": index > currentStep }
            )}
            onClick={() => index <= currentStep && goToStep(index)}
          >
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-apple mb-2",
                index <= currentStep 
                  ? "bg-primary text-white" 
                  : "bg-secondary text-muted-foreground",
                index < currentStep && "bg-green-600"
              )}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className="text-xs font-medium">{step.title}</span>
            {step.description && (
              <span className="text-xs text-muted-foreground">{step.description}</span>
            )}
          </div>

          {index < steps.length - 1 && (
            <div 
              className={cn(
                "flex-1 h-px mx-2",
                index < currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const MultiStepFormActions = ({ 
  className,
  backButtonProps,
  nextButtonProps,
  showBack = true,
  children,
}: { 
  className?: string,
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>,
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>,
  showBack?: boolean,
  children?: ReactNode,
}) => {
  const { prevStep, nextStep, isFirstStep, isLastStep } = useMultiStepForm();

  return (
    <div className={cn("flex justify-between pt-6", className)}>
      {showBack && !isFirstStep ? (
        <button
          type="button"
          onClick={prevStep}
          className="form-button bg-secondary text-secondary-foreground hover:bg-secondary/90"
          {...backButtonProps}
        >
          Voltar
        </button>
      ) : (
        <div />
      )}
      
      {children}
      
      <button
        type="submit"
        className="form-button bg-primary text-primary-foreground hover:bg-primary/90"
        {...nextButtonProps}
      >
        {isLastStep ? "Concluir" : "Continuar"}
      </button>
    </div>
  );
};
