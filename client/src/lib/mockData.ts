export interface Complaint {
  id: string;
  type: "Pothole" | "Garbage" | "Streetlight" | "Water Leak" | "Noise" | "Other";
  description: string;
  location: string;
  status: "Open" | "In Progress" | "Resolved" | "Rejected";
  priority: "Low" | "Medium" | "High" | "Critical";
  severity: "Low" | "Medium" | "High";
  timestamp: string;
  imageUrl?: string;
  aiAnalysis?: {
    confidence: number;
    category: string;
    isDuplicate: boolean;
    severityScore: number; // 1-10
    notes: string;
  };
}

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: "COMP-2024-001",
    type: "Pothole",
    description: "Large pothole on Main St near the library entrance. Causing traffic slowdowns.",
    location: "123 Main St, Downtown",
    status: "Open",
    priority: "High",
    severity: "High",
    timestamp: "2024-05-10T09:30:00Z",
    aiAnalysis: {
      confidence: 0.98,
      category: "Road Maintenance",
      isDuplicate: false,
      severityScore: 8,
      notes: "Detected substantial road damage. Potential hazard for vehicles.",
    },
  },
  {
    id: "COMP-2024-002",
    type: "Garbage",
    description: "Overflowing dumpster behind the community center.",
    location: "45 Park Ave, Northside",
    status: "In Progress",
    priority: "Medium",
    severity: "Medium",
    timestamp: "2024-05-11T14:15:00Z",
    aiAnalysis: {
      confidence: 0.95,
      category: "Sanitation",
      isDuplicate: true,
      severityScore: 5,
      notes: "Similar report filed 2 days ago (COMP-2024-0015). Merged.",
    },
  },
  {
    id: "COMP-2024-003",
    type: "Streetlight",
    description: "Streetlight flickering constantly.",
    location: "88 Oak Lane, Suburbs",
    status: "Resolved",
    priority: "Low",
    severity: "Low",
    timestamp: "2024-05-08T20:00:00Z",
    aiAnalysis: {
      confidence: 0.92,
      category: "Electrical",
      isDuplicate: false,
      severityScore: 3,
      notes: "Routine maintenance required.",
    },
  },
  {
    id: "COMP-2024-004",
    type: "Water Leak",
    description: "Water gushing from a pipe on the sidewalk.",
    location: "Corner of 5th and Elm",
    status: "Open",
    priority: "Critical",
    severity: "High",
    timestamp: "2024-05-12T08:45:00Z",
    aiAnalysis: {
      confidence: 0.99,
      category: "Water Infrastructure",
      isDuplicate: false,
      severityScore: 9,
      notes: "Significant water loss detected. Urgent attention recommended.",
    },
  },
  {
    id: "COMP-2024-005",
    type: "Noise",
    description: "Construction noise after 10 PM.",
    location: "500 Pine St, Residential District",
    status: "Rejected",
    priority: "Low",
    severity: "Low",
    timestamp: "2024-05-09T22:30:00Z",
    aiAnalysis: {
      confidence: 0.85,
      category: "Noise Violation",
      isDuplicate: false,
      severityScore: 2,
      notes: "Within permissible decibel limits for permitted night work.",
    },
  },
];
