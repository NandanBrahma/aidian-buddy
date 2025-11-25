import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorCardProps {
  title: string;
  description: string;
  onShowFix?: () => void;
  onIgnore?: () => void;
  severity?: "error" | "warning" | "info";
}

export const ErrorCard = ({ 
  title, 
  description, 
  onShowFix, 
  onIgnore,
  severity = "error" 
}: ErrorCardProps) => {
  const getIconColor = () => {
    switch (severity) {
      case "error": return "text-destructive";
      case "warning": return "text-warning";
      case "info": return "text-primary";
      default: return "text-destructive";
    }
  };

  return (
    <Card className="border-l-4 border-l-destructive animate-slide-up">
      <CardHeader>
        <div className="flex items-start gap-3">
          <AlertCircle className={`h-5 w-5 mt-0.5 ${getIconColor()}`} />
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-2 text-foreground/70">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      {(onShowFix || onIgnore) && (
        <CardContent className="flex gap-2">
          {onShowFix && (
            <Button onClick={onShowFix} variant="default">
              Show Fix Options
            </Button>
          )}
          {onIgnore && (
            <Button onClick={onIgnore} variant="outline">
              Ignore for Now
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
};
