import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Bot, Layers } from "lucide-react";
import { Complaint } from "@/lib/mockData";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AIAnalysisCardProps {
  analysis: NonNullable<Complaint["aiAnalysis"]>;
  className?: string;
}

export function AIAnalysisCard({ analysis, className }: AIAnalysisCardProps) {
  return (
    <Card className={cn("overflow-hidden border-primary/20 shadow-md", className)}>
      <div className="bg-primary/5 p-4 border-b border-primary/10 flex items-center gap-2">
        <Bot className="h-5 w-5 text-primary" />
        <h3 className="font-heading font-semibold text-primary text-sm uppercase tracking-wide">
          AI Analysis Insights
        </h3>
      </div>
      <CardContent className="p-6 grid gap-6">
        {/* Top Row: Category & Duplicate */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Classification</span>
            <div className="font-medium text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary/70" />
              {analysis.category}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Duplicate Check</span>
            <div className={cn("font-medium flex items-center gap-2", analysis.isDuplicate ? "text-orange-600" : "text-green-600")}>
              {analysis.isDuplicate ? (
                <>
                  <AlertCircle className="h-4 w-4" />
                  <span>Potential Duplicate</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Unique Issue</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Severity Score */}
        <div className="space-y-2">
           <div className="flex justify-between items-center">
             <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">AI Severity Score</span>
             <span className="text-sm font-bold text-foreground">{analysis.severityScore}/10</span>
           </div>
           <Progress value={analysis.severityScore * 10} className="h-2" 
             // Custom color based on score (handled via simple style for now or class override if needed)
           />
           <p className="text-xs text-muted-foreground pt-1">
             Based on image analysis and description text.
           </p>
        </div>

        {/* Notes */}
        <div className="bg-muted/50 p-3 rounded-md text-sm text-muted-foreground italic border border-dashed">
          "{analysis.notes}"
        </div>
      </CardContent>
    </Card>
  );
}
