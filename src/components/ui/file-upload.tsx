import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './button';
import { Progress } from './progress';
import { Alert, AlertDescription } from './alert';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onUpload: () => void;
  isUploading?: boolean;
  uploadProgress?: number;
  error?: string;
  success?: boolean;
  acceptedTypes?: string[];
  maxSize?: number;
  className?: string;
}

export function FileUpload({
  onFileSelect,
  onUpload,
  isUploading = false,
  uploadProgress = 0,
  error,
  success = false,
  acceptedTypes = ['.pdf', '.doc', '.docx'],
  maxSize = 10 * 1024 * 1024, // 10MB
  className
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
    setDragActive(false);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize,
    multiple: false,
    disabled: isUploading || success
  });

  const removeFile = () => {
    setSelectedFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
          "hover:border-primary hover:bg-muted/50",
          dragActive || isDragActive ? "border-primary bg-primary/5" : "border-border",
          (isUploading || success) && "cursor-not-allowed opacity-60",
          selectedFile && !isUploading && !success && "border-solid border-primary bg-primary/5"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          {success ? (
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          ) : (
            <Upload className={cn(
              "h-16 w-16 transition-colors",
              dragActive ? "text-primary" : "text-muted-foreground"
            )} />
          )}
          
          <div className="space-y-2">
            {success ? (
              <div>
                <p className="text-lg font-semibold text-green-700">Upload Successful!</p>
                <p className="text-sm text-muted-foreground">Your document has been processed</p>
              </div>
            ) : selectedFile ? (
              <div>
                <p className="text-lg font-semibold">File Ready to Upload</p>
                <p className="text-sm text-muted-foreground">Click "Analyze Document" to proceed</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold">
                  {dragActive ? "Drop your document here" : "Upload Legal Document"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to select • PDF, DOC, DOCX up to {formatFileSize(maxSize)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <div className="space-y-2">
                <p className="font-medium">Analyzing document...</p>
                <Progress value={uploadProgress} className="w-64" />
                <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected File Display */}
      {selectedFile && !isUploading && !success && (
        <div className="flex items-center justify-between p-4 bg-card rounded-lg border shadow-card animate-fade-in">
          <div className="flex items-center space-x-3">
            <File className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium text-card-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive" className="animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Upload Button */}
      {selectedFile && !isUploading && !success && (
        <Button 
          onClick={onUpload}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          size="lg"
        >
          <Upload className="h-4 w-4 mr-2" />
          Analyze Document
        </Button>
      )}
    </div>
  );
}