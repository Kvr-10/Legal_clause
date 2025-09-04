import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  FileText, 
  Lightbulb,
  Copy,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ClauseCardProps {
  clause: {
    id: string;
    original_text: string;
    summary: string;
    risk_level: 'low' | 'medium' | 'high' | 'critical';
    risk_score: number;
    issues: string[];
    category: string;
  };
  onGenerateCounterOffer: (clauseId: string) => void;
  isGeneratingCounterOffer?: boolean;
  counterOffer?: {
    suggested_text: string;
    explanation: string;
  };
}

export function ClauseCard({ 
  clause, 
  onGenerateCounterOffer, 
  isGeneratingCounterOffer = false,
  counterOffer 
}: ClauseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCounterOffer, setShowCounterOffer] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { toast } = useToast();

  const getRiskColor = (level: string) => {
    const colors = {
      low: 'risk-low',
      medium: 'risk-medium', 
      high: 'risk-high',
      critical: 'risk-critical'
    };
    return colors[level as keyof typeof colors] || 'risk-medium';
  };

  const handleCopyText = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      toast({
        title: "Copied to clipboard",
        description: `${type} text has been copied.`,
      });
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateCounterOffer = () => {
    onGenerateCounterOffer(clause.id);
    setShowCounterOffer(true);
  };

  return (
    <Card className="shadow-card border-0 bg-card/80 backdrop-blur transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {clause.category}
              </Badge>
              <Badge className={cn("text-xs border", getRiskColor(clause.risk_level))}>
                {clause.risk_level} risk
              </Badge>
              <span className="text-sm text-muted-foreground">
                Score: {clause.risk_score}
              </span>
            </div>
            <CardTitle className="text-lg font-semibold">
              Clause Analysis
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="shrink-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary - Always Visible */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h4 className="font-medium text-foreground">Summary</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {clause.summary}
          </p>
        </div>

        {/* Issues */}
        {clause.issues.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h4 className="font-medium text-foreground">Identified Issues</h4>
            </div>
            <ul className="space-y-1">
              {clause.issues.map((issue, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent className="space-y-4">
            <Separator />
            
            {/* Original Text */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Original Clause</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyText(clause.original_text, 'Original')}
                  className="h-8 px-2"
                >
                  {copiedText === 'Original' ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg border">
                <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                  {clause.original_text}
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Counter-offer Section */}
        <div className="pt-2">
          <Button
            onClick={handleGenerateCounterOffer}
            disabled={isGeneratingCounterOffer}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            size="sm"
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            {isGeneratingCounterOffer ? 'Generating...' : 'Generate Counter-offer'}
          </Button>

          {showCounterOffer && counterOffer && (
            <div className="mt-4 space-y-3 animate-fade-in">
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    Suggested Counter-offer
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyText(counterOffer.suggested_text, 'Counter-offer')}
                    className="h-8 px-2"
                  >
                    {copiedText === 'Counter-offer' ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed font-mono">
                    {counterOffer.suggested_text}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                    <strong>Explanation:</strong> {counterOffer.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}