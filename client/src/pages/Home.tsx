import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Shield, Activity, Users } from "lucide-react";
import heroImage from "@/assets/hero-civic.png";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/30 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium w-fit mb-2">
                Simpler. Faster. Better.
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-heading text-foreground">
                Building a Better Community, <span className="text-primary">Together.</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                Report local issues instantly, track their progress, and help authorities prioritize what matters most with AI-powered insights.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/report">
                  <Button size="lg" className="gap-2 h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    Report an Issue <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/track">
                  <Button variant="outline" size="lg" className="h-12 text-base">
                    Track Status
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:order-last">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border bg-white p-2 md:p-4 rotate-1 hover:rotate-0 transition-transform duration-500 ease-out">
                <img
                  src={heroImage}
                  alt="City Illustration"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight font-heading">How It Works</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              We've streamlined the process of civic engagement to make sure your voice is heard and acted upon efficiently.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl border bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-blue-50 text-blue-600">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Report Instantly</h3>
              <p className="text-muted-foreground">
                Snap a photo, add a location, and submit details in seconds. Our simplified form makes reporting effortless.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl border bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-teal-50 text-teal-600">
                <Activity className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">AI Prioritization</h3>
              <p className="text-muted-foreground">
                Our smart system analyzes severity and categorizes issues automatically to help authorities act faster.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl border bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 rounded-full bg-purple-50 text-purple-600">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Transparent Tracking</h3>
              <p className="text-muted-foreground">
                Stay updated with real-time status changes. Know exactly when your issue is picked up and resolved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
