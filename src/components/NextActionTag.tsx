import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NextActionTagProps {
  text?: string;
}

export const NextActionTag = ({ text = "Next Action" }: NextActionTagProps) => {
  return (
    <Badge variant="default" className="gap-1.5 animate-pulse-glow">
      <ArrowRight className="h-3 w-3" />
      {text}
    </Badge>
  );
};
