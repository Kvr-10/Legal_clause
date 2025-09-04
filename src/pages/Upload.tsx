import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from '@/components/ui/file-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, FileText, Zap } from 'lucide-react';
import { apiEndpoints, mockData } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import uploadIllustration from '@/assets/upload-illustration.jpg';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError('');
    setSuccess(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError('');
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      // In a real app, this would call the actual API
      // const response = await apiEndpoints.uploadDocument(selectedFile);
      
      // For demo purposes, use mock data
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setUploadProgress(100);
      setSuccess(true);
      
      toast({
        title: "Document Uploaded Successfully!",
        description: "Your legal document has been analyzed. Redirecting to dashboard...",
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard/doc-123');
      }, 2000);

    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
      toast({
        title: "Upload Failed",
        description: "There was an error analyzing your document.",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Clause Radar</h1>
                <p className="text-sm text-muted-foreground">Legal Document Analyzer</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              <Shield className="h-3 w-3 mr-1" />
              Secure Upload
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            
            {/* Left Column - Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  Upload Your Legal Document
                </h2>
                <p className="text-lg text-muted-foreground">
                  Get instant AI-powered analysis of contracts, leases, and legal agreements.
                  Identify risks, understand complex clauses, and generate counter-offers.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Smart Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      AI-powered clause-by-clause breakdown with risk assessment
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Risk Detection</h3>
                    <p className="text-sm text-muted-foreground">
                      Identify hidden risks and unfavorable terms automatically
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Counter-Offers</h3>
                    <p className="text-sm text-muted-foreground">
                      Generate professional counter-proposal language
                    </p>
                  </div>
                </div>
              </div>

              {/* Illustration */}
              <div className="hidden md:block">
                <img
                  src={uploadIllustration}
                  alt="Document upload illustration"
                  className="w-full max-w-sm mx-auto rounded-lg shadow-card"
                />
              </div>
            </div>

            {/* Right Column - Upload */}
            <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Document Upload</CardTitle>
                <CardDescription>
                  Supported formats: PDF, DOC, DOCX (up to 10MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFileSelect={handleFileSelect}
                  onUpload={handleUpload}
                  isUploading={isUploading}
                  uploadProgress={uploadProgress}
                  error={error}
                  success={success}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;