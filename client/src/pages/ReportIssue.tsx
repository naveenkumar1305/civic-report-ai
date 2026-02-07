import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Upload, Loader2, Camera } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import mapPlaceholder from "@/assets/map-placeholder.png";

const formSchema = z.object({
  type: z.string().min(1, "Please select an issue type"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(5, "Please enter a valid location"),
  image: z.any().optional(), // In a real app, refine this validation
});

export default function ReportIssue() {
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      description: "",
      location: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      toast({
        title: "Report Submitted Successfully",
        description: "Your reference ID is COMP-2024-NEW. You can track it on the status page.",
      });
      setLocation("/track");
    }, 1500);
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold font-heading mb-2">Report a Civic Issue</h1>
        <p className="text-muted-foreground">Help us maintain our community by reporting non-emergency issues.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
            <CardDescription>Please provide as much detail as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the type of issue" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pothole">Pothole / Road Damage</SelectItem>
                          <SelectItem value="Streetlight">Streetlight Outage</SelectItem>
                          <SelectItem value="Garbage">Garbage / Sanitation</SelectItem>
                          <SelectItem value="Water">Water Leak / Drainage</SelectItem>
                          <SelectItem value="Graffiti">Graffiti / Vandalism</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Enter address or nearest landmark" className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Map Placeholder */}
                <div className="rounded-md overflow-hidden border h-48 bg-muted relative group">
                  <img src={mapPlaceholder} alt="Map selector" className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-background/80 px-3 py-1 rounded text-xs font-medium text-foreground backdrop-blur-sm">
                      Pin location on map (Mockup)
                    </span>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the issue clearly..." 
                          className="min-h-[120px] resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                   <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/5 transition-colors cursor-pointer">
                      <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">Upload Photo</p>
                      <p className="text-xs text-muted-foreground mt-1">Click to browse or drag & drop</p>
                   </div>
                </div>

                <Button type="submit" className="w-full h-11 text-base shadow-lg shadow-primary/10" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-blue-50/50 border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-blue-800">Tips for Reporting</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-700 space-y-2">
              <p>• Be specific about the location.</p>
              <p>• Clear photos speed up verification.</p>
              <p>• Check if the issue has already been reported.</p>
            </CardContent>
          </Card>

          <Card className="bg-teal-50/50 border-teal-100">
             <CardHeader className="pb-2">
               <CardTitle className="text-base text-teal-800">Emergency?</CardTitle>
             </CardHeader>
             <CardContent className="text-sm text-teal-700">
               <p>For immediate threats to life or property, please call <strong>911</strong> immediately. This form is for non-emergency issues only.</p>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
