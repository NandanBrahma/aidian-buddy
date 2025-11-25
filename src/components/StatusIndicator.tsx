import { CheckCircle2, AlertCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatusIndicatorProps {
  status: "healthy" | "error" | "warning" | "processing";
  label?: string;
}

export const StatusIndicator = ({ status, label }: StatusIndicatorProps) => {
  const getConfig = () => {
    switch (status) {
      case "healthy":
        return {
          icon: CheckCircle2,
          variant: "success" as const,
          text: label || "All Systems Operational",
        };
      case "error":
        return {
          icon: AlertCircle,
          variant: "destructive" as const,
          text: label || "Error Detected",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          variant: "warning" as const,
          text: label || "Attention Required",
        };
      case "processing":
        return {
          icon: Loader2,
          variant: "secondary" as const,
          text: label || "Processing...",
          animate: true,
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="gap-1.5 px-3 py-1.5">
      <Icon className={`h-3.5 w-3.5 ${config.animate ? 'animate-spin' : ''}`} />
      <span>{config.text}</span>
    </Badge>
  );
};
