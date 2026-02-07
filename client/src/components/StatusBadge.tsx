import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "Open" | "In Progress" | "Resolved" | "Rejected" | "Low" | "Medium" | "High" | "Critical";

interface StatusBadgeProps {
  status: string;
  className?: string;
  type?: "status" | "priority" | "severity";
}

export function StatusBadge({ status, className, type = "status" }: StatusBadgeProps) {
  let variantClass = "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200";

  const s = status as StatusType;

  if (type === "priority" || type === "severity") {
    switch (s) {
      case "Low":
        variantClass = "bg-blue-50 text-blue-700 border-blue-200";
        break;
      case "Medium":
        variantClass = "bg-yellow-50 text-yellow-700 border-yellow-200";
        break;
      case "High":
        variantClass = "bg-orange-50 text-orange-700 border-orange-200";
        break;
      case "Critical":
        variantClass = "bg-red-50 text-red-700 border-red-200";
        break;
    }
  } else {
    // Status
    switch (s) {
      case "Open":
        variantClass = "bg-blue-50 text-blue-700 border-blue-200";
        break;
      case "In Progress":
        variantClass = "bg-purple-50 text-purple-700 border-purple-200";
        break;
      case "Resolved":
        variantClass = "bg-green-50 text-green-700 border-green-200";
        break;
      case "Rejected":
        variantClass = "bg-gray-100 text-gray-500 border-gray-200 line-through decoration-gray-400";
        break;
    }
  }

  return (
    <Badge
      variant="outline"
      className={cn("font-medium border px-2.5 py-0.5 shadow-sm uppercase text-[10px] tracking-wider", variantClass, className)}
    >
      {status}
    </Badge>
  );
}
