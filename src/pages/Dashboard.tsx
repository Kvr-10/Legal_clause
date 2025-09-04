import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Shield, 
  AlertTriangle,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { RiskGauge } from '@/components/RiskGauge';
import { RiskChart } from '@/components/RiskChart';
import { ClauseCard } from '@/components/ClauseCard';
import { PersonaToggle } from '@/components/PersonaToggle';
import { mockData, apiEndpoints } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedPersona, setSelectedPersona] = useState<'tenant' | 'freelancer' | 'smb'>('tenant');
  const [documentData, setDocumentData] = useState(mockData.documentAnalysis);
  const [isGeneratingCounterOffer, setIsGeneratingCounterOffer] = useState<string | null>(null);
  const [counterOffers, setCounterOffers] = useState<Record<string, any>>({});
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // In a real app, fetch document data based on documentId
    // const fetchData = async () => {
    //   try {
    //     const response = await apiEndpoints.getDocumentAnalysis(documentId);
    //     setDocumentData(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch document data:', error);
    //   }
    // };
    // fetchData();
  }, [documentId]);

  const handlePersonaChange = (persona: 'tenant' | 'freelancer' | 'smb') => {
    setSelectedPersona(persona);
    // In a real app, this would trigger a re-analysis with the new persona
    toast({
      title: "Perspective Updated",
      description: `Risk analysis updated for ${persona} perspective.`,
    });
  };

  const handleGenerateCounterOffer = async (clauseId: string) => {
    setIsGeneratingCounterOffer(clauseId);
    
    try {
      // In a real app, call the API
      // const response = await apiEndpoints.generateCounterOffer(clauseId);
      
      // For demo, use mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setCounterOffers(prev => ({
        ...prev,
        [clauseId]: mockData.counterOffer
      }));
      
      toast({
        title: "Counter-offer Generated",
        description: "AI has generated a suggested counter-offer for this clause.",
      });
    } catch (error) {
      toast({
        title: "Failed to Generate Counter-offer",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingCounterOffer(null);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    try {
      // In a real app, call the API
      // const response = await apiEndpoints.exportPDF(documentId);
      // const blob = new Blob([response.data], { type: 'application/pdf' });
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `${documentData.filename}-analysis.pdf`;
      // a.click();
      
      // For demo, just show success message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Export Complete",
        description: "Document analysis has been exported to PDF.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not export the document analysis.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getOverallRiskLevel = (score: number) => {
    if (score <= 30) return { level: 'Low', color: 'risk-low' };
    if (score <= 60) return { level: 'Medium', color: 'risk-medium' };
    if (score <= 80) return { level: 'High', color: 'risk-high' };
    return { level: 'Critical', color: 'risk-critical' };
  };

  const overallRisk = getOverallRiskLevel(documentData.overall_risk_score);

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/upload')}
                className="hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                New Analysis
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Document Analysis</h1>
                <p className="text-sm text-muted-foreground">{documentData.filename}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`border ${overallRisk.color}`}>
                <Shield className="h-3 w-3 mr-1" />
                {overallRisk.level} Risk
              </Badge>
              <Button
                onClick={handleExportPDF}
                disabled={isExporting}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          
          {/* Persona Toggle */}
          <PersonaToggle
            selectedPersona={selectedPersona}
            onPersonaChange={handlePersonaChange}
          />

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Overall Risk Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-foreground">
                    {documentData.overall_risk_score}
                  </span>
                  <Badge className={`${overallRisk.color}`}>
                    {overallRisk.level}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card/80 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Total Clauses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold text-foreground">
                  {documentData.clauses.length}
                </span>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card/80 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  High Risk Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold text-foreground">
                {documentData.clauses.filter(c => c.risk_level === 'high' || c.risk_level === 'critical').length}
                </span>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card/80 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Risk Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold text-foreground">
                  {Object.keys(documentData.risk_categories).length}
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Risk Analysis Section */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Risk Overview
              </TabsTrigger>
              <TabsTrigger value="clauses" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Clause Analysis
              </TabsTrigger>
              <TabsTrigger value="export" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Options
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Risk Gauge */}
                <Card className="shadow-card border-0 bg-card/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-lg">Risk Assessment</CardTitle>
                    <CardDescription>
                      Overall document risk level based on {selectedPersona} perspective
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center py-8">
                    <RiskGauge score={documentData.overall_risk_score} size="lg" />
                  </CardContent>
                </Card>

                {/* Risk Categories Chart */}
                <RiskChart
                  data={documentData.risk_categories}
                  type="pie"
                  title="Risk by Category"
                  description="Distribution of risk across different categories"
                />
              </div>

              {/* Bar Chart */}
              <RiskChart
                data={documentData.risk_categories}
                type="bar"
                title="Detailed Risk Breakdown"
                description="Risk scores for each category (0-100 scale)"
              />
            </TabsContent>

            <TabsContent value="clauses" className="space-y-6">
              <div className="grid gap-6">
                {documentData.clauses
                  .sort((a, b) => b.risk_score - a.risk_score)
                  .map((clause) => (
                    <ClauseCard
                      key={clause.id}
                      clause={clause}
                      onGenerateCounterOffer={handleGenerateCounterOffer}
                      isGeneratingCounterOffer={isGeneratingCounterOffer === clause.id}
                      counterOffer={counterOffers[clause.id]}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="export" className="space-y-6">
              <Card className="shadow-card border-0 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg">Export Document Analysis</CardTitle>
                  <CardDescription>
                    Download your complete analysis report in various formats
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <Button
                      onClick={handleExportPDF}
                      disabled={isExporting}
                      className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                      size="lg"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isExporting ? 'Generating PDF...' : 'Download PDF Report'}
                    </Button>
                    
                    <div className="text-sm text-muted-foreground">
                      <p><strong>PDF Report includes:</strong></p>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>Complete risk analysis summary</li>
                        <li>Detailed clause-by-clause breakdown</li>  
                        <li>AI-generated counter-offer suggestions</li>
                        <li>Risk visualization charts and graphs</li>
                        <li>Personalized recommendations for {selectedPersona}s</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;