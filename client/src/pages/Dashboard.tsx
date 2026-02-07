import { MOCK_COMPLAINTS } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filteredData = useMemo(() => {
    return MOCK_COMPLAINTS.filter(item => {
      const matchesText = 
        item.description.toLowerCase().includes(filterText.toLowerCase()) || 
        item.id.toLowerCase().includes(filterText.toLowerCase()) ||
        item.location.toLowerCase().includes(filterText.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || item.priority === priorityFilter;

      return matchesText && matchesStatus && matchesPriority;
    });
  }, [filterText, statusFilter, priorityFilter]);

  // Statistics for top cards
  const stats = {
      open: MOCK_COMPLAINTS.filter(c => c.status === "Open").length,
      critical: MOCK_COMPLAINTS.filter(c => c.priority === "Critical").length,
      resolved: MOCK_COMPLAINTS.filter(c => c.status === "Resolved").length,
      avgSeverity: (MOCK_COMPLAINTS.reduce((acc, curr) => acc + (curr.aiAnalysis?.severityScore || 0), 0) / MOCK_COMPLAINTS.length).toFixed(1)
  };

  return (
    <div className="flex flex-col h-full bg-muted/10">
      <div className="container mx-auto py-8 px-4 flex-1">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading text-foreground">Authority Dashboard</h1>
            <p className="text-muted-foreground">Overview of reported issues and AI prioritization.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" /> Settings
            </Button>
            <Button size="sm">Export Report</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
                    <Filter className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.open}</div>
                    <p className="text-xs text-muted-foreground">Requires attention</p>
                </CardContent>
            </Card>
            <Card className="shadow-sm border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Critical Priority</CardTitle>
                    <div className="h-4 w-4 rounded-full bg-red-500/20" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
                    <p className="text-xs text-muted-foreground">Immediate action needed</p>
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Severity Score</CardTitle>
                    <div className="h-4 w-4 text-muted-foreground font-bold">AI</div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.avgSeverity}/10</div>
                    <p className="text-xs text-muted-foreground">Based on automated analysis</p>
                </CardContent>
            </Card>
            <Card className="shadow-sm bg-primary/5 border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Resolved This Month</CardTitle>
                    <div className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-primary">{stats.resolved}</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
            </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search by ID, location, or keyword..." 
                    className="pl-9 bg-white" 
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px] bg-white">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-[180px] bg-white">
                    <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Priorities</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
            </Select>
        </div>

        {/* Data Table */}
        <div className="rounded-md border bg-white shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="w-[120px]">ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="hidden md:table-cell">Location</TableHead>
                        <TableHead>
                            <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                                Severity <ArrowUpDown className="h-3 w-3" />
                            </div>
                        </TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.length > 0 ? (
                        filteredData.map((complaint) => (
                            <TableRow key={complaint.id} className="hover:bg-muted/20">
                                <TableCell className="font-mono text-xs font-medium">{complaint.id}</TableCell>
                                <TableCell className="font-medium">{complaint.type}</TableCell>
                                <TableCell className="hidden md:table-cell text-muted-foreground truncate max-w-[200px]">{complaint.location}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span className={
                                            complaint.aiAnalysis?.severityScore && complaint.aiAnalysis.severityScore >= 8 ? "text-red-600 font-bold" : 
                                            complaint.aiAnalysis?.severityScore && complaint.aiAnalysis.severityScore >= 5 ? "text-orange-600" : "text-green-600"
                                        }>
                                            {complaint.aiAnalysis?.severityScore}
                                        </span>
                                        <span className="text-xs text-muted-foreground">/10</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={complaint.priority} type="priority" />
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={complaint.status} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="h-8">Details</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                                No results found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
      </div>
    </div>
  );
}
