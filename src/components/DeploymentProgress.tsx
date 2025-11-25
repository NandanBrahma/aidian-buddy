import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export type DeploymentStage = 
  | "error-detection"
  | "diagnostic"
  | "fix-selection"
  | "fix-application"
  | "testing"
  | "ready-to-deploy"
  | "deployed";

interface DeploymentProgressProps {
  currentStage: DeploymentStage;
  className?: string;
}

const stages = [
  { id: "error-detection", label: "Error Detection", description: "Identify issues" },
  { id: "diagnostic", label: "Run Diagnostic", description: "Analyze root cause" },
  { id: "fix-selection", label: "Select Fix", description: "Choose solution" },
  { id: "fix-application", label: "Apply Fix", description: "Implement changes" },
  { id: "testing", label: "Verify Fix", description: "Run safety tests" },
  { id: "ready-to-deploy", label: "Pre-deployment", description: "Final checks" },
  { id: "deployed", label: "Deploy", description: "Go live" },
] as const;

export const DeploymentProgress = ({ currentStage, className }: DeploymentProgressProps) => {
  const currentIndex = stages.findIndex(s => s.id === currentStage);
  const completedSteps = currentIndex;
  const totalSteps = stages.length;
  const remainingSteps = totalSteps - currentIndex - 1;
  const progressPercentage = ((completedSteps) / totalSteps) * 100;

  const getStepStatus = (index: number) => {
    if (index < currentIndex) return "completed";
    if (index === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <Card className={cn("border-primary/20", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Deployment Progress</CardTitle>
            <CardDescription>
              Step {currentIndex + 1} of {totalSteps} • {remainingSteps} step{remainingSteps !== 1 ? 's' : ''} remaining
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progressPercentage} className="h-2" />
        
        <div className="space-y-2">
          {stages.map((stage, index) => {
            const status = getStepStatus(index);
            return (
              <div
                key={stage.id}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg transition-all",
                  status === "current" && "bg-primary/10 border border-primary/20",
                  status === "completed" && "opacity-60"
                )}
              >
                <div className="flex-shrink-0">
                  {status === "completed" && (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  )}
                  {status === "current" && (
                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                  )}
                  {status === "upcoming" && (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "text-sm font-medium",
                    status === "current" && "text-primary",
                    status === "upcoming" && "text-muted-foreground"
                  )}>
                    {stage.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stage.description}
                  </div>
                </div>
                {status === "current" && (
                  <div className="text-xs font-medium text-primary">
                    In Progress
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
