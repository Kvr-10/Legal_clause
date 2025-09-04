import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Building2, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PersonaToggleProps {
  selectedPersona: 'tenant' | 'freelancer' | 'smb';
  onPersonaChange: (persona: 'tenant' | 'freelancer' | 'smb') => void;
  className?: string;
}

const personas = [
  {
    id: 'tenant' as const,
    label: 'Tenant',
    description: 'Individual renting property',
    icon: User,
    color: 'bg-blue-500'
  },
  {
    id: 'freelancer' as const,
    label: 'Freelancer',
    description: 'Independent contractor',
    icon: Briefcase,
    color: 'bg-green-500'
  },
  {
    id: 'smb' as const,
    label: 'Small Business',
    description: 'Small to medium business',
    icon: Building2,
    color: 'bg-purple-500'
  }
];

export function PersonaToggle({ selectedPersona, onPersonaChange, className }: PersonaToggleProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <h3 className="font-medium text-foreground">Analysis Perspective</h3>
        <Badge variant="secondary" className="text-xs">
          Reweights risk factors
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {personas.map((persona) => {
          const Icon = persona.icon;
          const isSelected = selectedPersona === persona.id;
          
          return (
            <Button
              key={persona.id}
              variant={isSelected ? "default" : "outline"}
              onClick={() => onPersonaChange(persona.id)}
              className={cn(
                "h-auto p-3 flex flex-col items-center gap-2 transition-all duration-200",
                isSelected && "bg-gradient-primary border-primary/50 shadow-lg"
              )}
            >
              <div className={cn(
                "p-2 rounded-full text-white",
                isSelected ? "bg-white/20" : persona.color
              )}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{persona.label}</div>
                <div className={cn(
                  "text-xs",
                  isSelected ? "text-white/80" : "text-muted-foreground"
                )}>
                  {persona.description}
                </div>
              </div>
            </Button>
          );
        })}
      </div>
      
      <p className="text-xs text-muted-foreground">
        Select your role to get personalized risk analysis tailored to your specific concerns and priorities.
      </p>
    </div>
  );
}