import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Shield, 
  FileText, 
  Zap, 
  BarChart3, 
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import heroImage from '@/assets/legal-hero.jpg';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Smart Document Analysis",
      description: "AI-powered clause-by-clause breakdown with detailed risk assessment for every section of your legal document."
    },
    {
      icon: Shield,
      title: "Risk Detection",
      description: "Automatically identify hidden risks, unfavorable terms, and potential legal pitfalls before you sign."
    },
    {
      icon: Zap,
      title: "Counter-Offer Generation", 
      description: "Generate professional counter-proposal language to negotiate better terms and protect your interests."
    },
    {
      icon: BarChart3,
      title: "Visual Risk Analytics",
      description: "Interactive charts and dashboards to understand your document's risk profile at a glance."
    },
    {
      icon: Users,
      title: "Persona-Based Analysis",
      description: "Tailored risk analysis for tenants, freelancers, and small businesses with role-specific insights."
    }
  ];

  const benefits = [
    "Save hours of legal review time",
    "Understand complex legal language",
    "Negotiate from a position of strength",
    "Avoid costly legal mistakes",
    "Get personalized recommendations"
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Clause Radar</h1>
                <p className="text-sm text-muted-foreground">Legal Document Simplifier</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:flex">
                Powered by Gemini 2.5
              </Badge>
              <Button
                onClick={() => navigate('/upload')}
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  ⚡ AI-Powered Legal Analysis
                </Badge>
                <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Decode Legal
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> Documents </span>
                  Instantly
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transform complex legal jargon into clear insights. Get AI-powered risk analysis, 
                  clause summaries, and counter-offer suggestions in minutes, not hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate('/upload')}
                  className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6"
                  size="lg"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Analyze Document
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard/doc-123')}
                  className="text-lg px-8 py-6"
                  size="lg"
                >
                  View Demo
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>

              {/* Benefits List */}
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={heroImage}
                  alt="Legal document analysis dashboard"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-card/80 backdrop-blur border rounded-lg p-3 shadow-lg animate-fade-in">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Risk Analysis Complete</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-card/80 backdrop-blur border rounded-lg p-3 shadow-lg animate-fade-in">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">85% Risk Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="text-sm">
              Powerful Features
            </Badge>
            <h3 className="text-4xl font-bold text-foreground">
              Everything You Need for Legal Document Analysis
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive analysis tools to help you understand 
              and negotiate legal documents with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card border-0 bg-card/80 backdrop-blur hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="bg-primary/10 p-3 rounded-lg w-fit">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="shadow-2xl border-0 bg-gradient-primary text-white">
            <CardContent className="py-16 px-8 text-center">
              <div className="space-y-6 max-w-2xl mx-auto">
                <h3 className="text-4xl font-bold">
                  Ready to Analyze Your Legal Documents?
                </h3>
                <p className="text-xl opacity-90">
                  Upload your contract, lease, or agreement and get instant AI-powered insights. 
                  No legal expertise required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/upload')}
                    variant="secondary"
                    className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90"
                    size="lg"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Start Analysis
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/dashboard/doc-123')}
                    className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10"
                    size="lg"
                  >
                    View Demo Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-foreground">Clause Radar</div>
                <div className="text-sm text-muted-foreground">Legal Document Simplifier</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-4 sm:mt-0">
              Powered by Gemini 2.5 AI • Built with React & Django
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
