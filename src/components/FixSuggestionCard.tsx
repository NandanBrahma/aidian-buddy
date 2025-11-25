import { Check, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FixSuggestionCardProps {
  title: string;
  description: string;
  creditCost: number;
  recommended?: boolean;
  onApply: () => void;
  onExplain?: () => void;
}

export const FixSuggestionCard = ({
  title,
  description,
  creditCost,
  recommended = false,
  onApply,
  onExplain,
}: FixSuggestionCardProps) => {
  return (
    <Card className={`relative transition-all hover:shadow-md ${recommended ? 'border-primary shadow-glow' : ''}`}>
      {recommended && (
        <Badge className="absolute -top-2 -right-2 bg-gradient-hero">
          <Check className="h-3 w-3 mr-1" />
          Recommended
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between">
          {title}
          <Badge variant="secondary" className="ml-2">
            {creditCost} {creditCost === 1 ? 'credit' : 'credits'}
          </Badge>
        </CardTitle>
        <CardDescription className="text-foreground/70">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button onClick={onApply} variant={recommended ? "default" : "secondary"} className="flex-1">
          Apply Fix
        </Button>
        {onExplain && (
          <Button onClick={onExplain} variant="ghost" size="icon">
            <Info className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
