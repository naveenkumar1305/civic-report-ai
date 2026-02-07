import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { MOCK_COMPLAINTS } from "@/lib/mockData";
import { ComplaintCard } from "@/components/ComplaintCard";
import { AIAnalysisCard } from "@/components/AIAnalysisCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TrackIssue() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundComplaint, setFoundComplaint] = useState<typeof MOCK_COMPLAINTS[0] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    // Case insensitive search by ID
    const found = MOCK_COMPLAINTS.find(c => c.id.toLowerCase() === searchTerm.toLowerCase());
    setFoundComplaint(found || null);
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-heading mb-3">Track Your Complaint</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Enter your Complaint Reference ID to check the real-time status and see AI-generated insights regarding your report.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input 
            placeholder="Enter Complaint ID (e.g., COMP-2024-001)" 
            className="h-12 text-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" size="lg" className="h-12 px-6">
            <Search className="h-5 w-5 mr-2" /> Track
          </Button>
        </form>
        <div className="mt-3 text-center">
            <p className="text-xs text-muted-foreground">Try ID: <span className="font-mono bg-muted px-1 rounded">COMP-2024-001</span> or <span className="font-mono bg-muted px-1 rounded">COMP-2024-004</span></p>
        </div>
      </div>

      {hasSearched && !foundComplaint && (
        <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
          <p className="text-lg text-muted-foreground">No complaint found with ID "{searchTerm}".</p>
          <p className="text-sm text-muted-foreground mt-1">Please check the ID and try again.</p>
        </div>
      )}

      {foundComplaint && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Tabs defaultValue="status" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-8">
                <TabsTrigger value="status">Current Status</TabsTrigger>
                <TabsTrigger value="details">Full Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="status" className="space-y-8">
                 <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                       <h3 className="text-xl font-bold font-heading">Ticket Overview</h3>
                       <ComplaintCard complaint={foundComplaint} />
                       
                       {/* Timeline Mockup */}
                       <div className="bg-white p-6 rounded-lg border shadow-sm">
                          <h4 className="font-semibold mb-4 text-sm uppercase text-muted-foreground">Resolution Timeline</h4>
                          <div className="relative border-l-2 border-muted ml-3 space-y-6">
                              <div className="mb-4 ml-6 relative">
                                <span className="absolute -left-[31px] bg-primary rounded-full h-3 w-3 top-1.5 ring-4 ring-white"></span>
                                <h5 className="font-medium text-sm">Issue Reported</h5>
                                <p className="text-xs text-muted-foreground">May 10, 2024 - 09:30 AM</p>
                              </div>
                              <div className="mb-4 ml-6 relative">
                                <span className="absolute -left-[31px] bg-primary rounded-full h-3 w-3 top-1.5 ring-4 ring-white"></span>
                                <h5 className="font-medium text-sm">AI Analysis Complete</h5>
                                <p className="text-xs text-muted-foreground">May 10, 2024 - 09:32 AM</p>
                              </div>
                              <div className="ml-6 relative">
                                <span className="absolute -left-[31px] bg-muted-foreground/30 rounded-full h-3 w-3 top-1.5 ring-4 ring-white"></span>
                                <h5 className="font-medium text-sm text-muted-foreground">Scheduled for Repair</h5>
                                <p className="text-xs text-muted-foreground">Pending Authority Action</p>
                              </div>
                          </div>
                       </div>
                    </div>
                    
                    <div className="space-y-6">
                       <h3 className="text-xl font-bold font-heading">System Intelligence</h3>
                       {foundComplaint.aiAnalysis && (
                         <AIAnalysisCard analysis={foundComplaint.aiAnalysis} />
                       )}
                    </div>
                 </div>
              </TabsContent>
              
              <TabsContent value="details">
                 <div className="bg-card border rounded-xl p-8 shadow-sm">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                            <dd className="mt-1 text-base">{foundComplaint.description}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Location</dt>
                            <dd className="mt-1 text-base">{foundComplaint.location}</dd>
                        </div>
                         <div>
                            <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                            <dd className="mt-1 text-base">{foundComplaint.type}</dd>
                        </div>
                         <div>
                            <dt className="text-sm font-medium text-muted-foreground">Priority Level</dt>
                            <dd className="mt-1 text-base">{foundComplaint.priority}</dd>
                        </div>
                    </dl>
                 </div>
              </TabsContent>
            </Tabs>
        </div>
      )}
    </div>
  );
}
