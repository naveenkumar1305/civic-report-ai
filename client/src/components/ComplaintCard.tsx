import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Complaint } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface ComplaintCardProps {
  complaint: Complaint;
  compact?: boolean;
}

export function ComplaintCard({ complaint, compact = false }: ComplaintCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 border-l-4 border-l-primary/60">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                {complaint.id}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(complaint.timestamp), "MMM d, yyyy")}
              </span>
            </div>
            <CardTitle className="text-lg font-heading leading-tight mb-1">
              {complaint.type} Issue
            </CardTitle>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
               <MapPin className="h-3 w-3" />
               {complaint.location}
            </div>
          </div>
          <StatusBadge status={complaint.status} />
        </div>
      </CardHeader>
      
      {!compact && (
        <CardContent className="pb-3">
          <p className="text-sm text-foreground/80 line-clamp-2">
            {complaint.description}
          </p>
        </CardContent>
      )}

      <CardFooter className="pt-2 flex justify-between items-center border-t bg-muted/20">
         <div className="flex gap-2">
           <StatusBadge status={complaint.priority} type="priority" />
           <StatusBadge status={complaint.severity} type="severity" />
         </div>
         {/* In a real app, this would link to details */}
         <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
            View Details <ArrowRight className="h-3 w-3" />
         </Button>
      </CardFooter>
    </Card>
  );
}
