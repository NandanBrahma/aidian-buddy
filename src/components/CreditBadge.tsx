import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CreditBadgeProps {
  credits: number;
  variant?: "default" | "warning" | "error";
}

export const CreditBadge = ({ credits, variant = "default" }: CreditBadgeProps) => {
  const getVariant = () => {
    if (variant === "warning") return "warning";
    if (variant === "error") return "destructive";
    return "secondary";
  };

  return (
    <Badge variant={getVariant()} className="gap-1.5 px-3 py-1.5">
      <Coins className="h-3.5 w-3.5" />
      <span className="font-semibold">{credits}</span>
      <span className="text-xs">credits</span>
    </Badge>
  );
};
