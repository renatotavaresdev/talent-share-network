
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, Check, X } from "lucide-react";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
  value?: File | null;
  previewUrl?: string | null;
}

const FileUpload = ({
  onFileChange,
  accept = "image/*",
  maxSize = 5242880, // 5MB
  className,
  value,
  previewUrl,
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (file: File | null) => {
    if (file) {
      if (file.size > maxSize) {
        setError(`File size too large (max ${maxSize / 1048576}MB)`);
        return;
      }
      
      setError(null);
      onFileChange(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onFileChange(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleChange(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleChange(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "photo-upload group h-40 transition-all",
          dragActive ? "border-primary bg-primary/5" : "",
          preview ? "h-64" : ""
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />
        
        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={preview}
              alt="Preview"
              className="max-h-full max-w-full object-contain rounded-md transition-all"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-70 hover:opacity-100"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4 space-y-2">
            <Upload className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Selecione ou arraste uma foto</p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG ou JPEG (máx. {maxSize / 1048576}MB)
              </p>
            </div>
          </div>
        )}
      </div>
      
      {error && <p className="text-destructive text-xs mt-2">{error}</p>}
    </div>
  );
};

export { FileUpload };
