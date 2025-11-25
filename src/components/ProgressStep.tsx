import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface ProgressStepProps {
  steps: {
    label: string;
    status: "completed" | "current" | "pending";
  }[];
}

export const ProgressStep = ({ steps }: ProgressStepProps) => {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="relative">
            {step.status === "completed" && (
              <CheckCircle2 className="h-5 w-5 text-success" />
            )}
            {step.status === "current" && (
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
            )}
            {step.status === "pending" && (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <span className={`text-sm ${
            step.status === "completed" ? "text-muted-foreground line-through" :
            step.status === "current" ? "text-foreground font-medium" :
            "text-muted-foreground"
          }`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};
