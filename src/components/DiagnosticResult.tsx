import { FileCode, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DiagnosticFinding {
  type: "error" | "warning" | "info";
  title: string;
  description: string;
  location?: string;
}

interface DiagnosticResultProps {
  findings: DiagnosticFinding[];
  onSuggestFixes?: () => void;
  onShowCode?: () => void;
}

export const DiagnosticResult = ({ findings, onSuggestFixes, onShowCode }: DiagnosticResultProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "error": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "info": return <Info className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="h-5 w-5" />
          Diagnostic Results
        </CardTitle>
        <CardDescription>
          Found {findings.length} {findings.length === 1 ? 'issue' : 'issues'} that need attention
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {findings.map((finding, index) => (
            <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50">
              {getIcon(finding.type)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{finding.title}</h4>
                  {finding.location && (
                    <Badge variant="outline" className="text-xs">
                      {finding.location}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{finding.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-2">
          {onSuggestFixes && (
            <Button onClick={onSuggestFixes} variant="default">
              Suggest Fixes (1 credit)
            </Button>
          )}
          {onShowCode && (
            <Button onClick={onShowCode} variant="outline">
              Show Impacted Code
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
