import { Sparkles, Zap, Target, GitBranch, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Guided Debug Assistant</h1>
                <p className="text-xs text-muted-foreground">Lovable Feature Concept MVP</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">Prototype Demo</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Content */}
        <div className="text-center mb-16 space-y-6">
          <Badge className="bg-gradient-hero text-white px-4 py-1">Feature Proposal for Lovable</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            AI-Powered Debugging,
            <br />
            <span className="text-primary">Built Right Into Lovable</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Imagine if Lovable could detect errors, suggest fixes, and guide you through deployment—all within the editor. This is a working demo of that vision.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/demo")} className="gap-2">
              <Zap className="h-4 w-4" />
              Try Interactive Demo
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById('concept')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </Button>
          </div>
        </div>

        {/* Problem Statement */}
        <section className="mb-16" id="concept">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-2xl">The Challenge Developers Face</CardTitle>
              <CardDescription className="text-base">
                Building apps is exciting, but debugging can be frustrating and time-consuming
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3 p-4 rounded-lg bg-background">
                  <Clock className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Hours Lost to Debugging</h4>
                    <p className="text-sm text-muted-foreground">
                      Developers spend 30-50% of their time tracking down and fixing errors instead of building features
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-lg bg-background">
                  <Target className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Cryptic Error Messages</h4>
                    <p className="text-sm text-muted-foreground">
                      Error messages often lack context about root causes and actionable solutions
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* The Solution */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2">The Guided Debug Assistant Solution</h3>
            <p className="text-muted-foreground">AI-powered error resolution integrated directly into Lovable</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Automatic Error Detection</CardTitle>
                <CardDescription>
                  Monitors your app in real-time and detects errors before you even notice them
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI-Suggested Fixes</CardTitle>
                <CardDescription>
                  Get multiple fix options with explanations, costs, and trade-offs for each approach
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <GitBranch className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Guided Deployment</CardTitle>
                <CardDescription>
                  Step-by-step guidance from error detection through fix application to production deployment
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* How It Would Integrate */}
        <section className="mb-16">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">How It Integrates Into Lovable</CardTitle>
              <CardDescription className="text-base">
                Seamlessly fits into your existing workflow without disrupting your development process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3 p-4 rounded-lg bg-background border border-border">
                  <div className="font-bold text-primary">1</div>
                  <div>
                    <h4 className="font-medium mb-1">New Tool in Lovable Toolbar</h4>
                    <p className="text-sm text-muted-foreground">
                      Appears as a pinned tool alongside Cloud, Analytics, and Security with a status indicator
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-lg bg-background border border-border">
                  <div className="font-bold text-primary">2</div>
                  <div>
                    <h4 className="font-medium mb-1">Integrated With Console & Network Logs</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically analyzes console errors and network failures in real-time
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-lg bg-background border border-border">
                  <div className="font-bold text-primary">3</div>
                  <div>
                    <h4 className="font-medium mb-1">Credit-Based Usage</h4>
                    <p className="text-sm text-muted-foreground">
                      Follows Lovable's existing credit system: diagnostics cost 1 credit, fixes cost 2 credits
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-lg bg-background border border-border">
                  <div className="font-bold text-primary">4</div>
                  <div>
                    <h4 className="font-medium mb-1">Works With Existing Deploy Flow</h4>
                    <p className="text-sm text-muted-foreground">
                      Pre-deployment checks integrate with the Publish button workflow
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2">What You'll See in the Demo</h3>
            <p className="text-muted-foreground">Explore the complete workflow from error detection to deployment</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Realistic Error Scenarios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Authentication token validation errors</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Missing environment variables</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Security configuration warnings</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Smart Fix Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Multiple fix options with trade-offs</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Clear credit costs for each action</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Recommended best practices</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="border-primary/20 bg-gradient-card">
            <CardContent className="pt-8 pb-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to See It in Action?</h3>
                <p className="text-muted-foreground">
                  Experience the complete debugging workflow in this interactive prototype
                </p>
              </div>
              <Button size="lg" onClick={() => navigate("/demo")} className="gap-2">
                <Sparkles className="h-4 w-4" />
                Launch Interactive Demo
              </Button>
              <p className="text-xs text-muted-foreground">
                Note: This is a prototype demonstration. No actual code changes are made.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with Lovable as a feature concept MVP • Not an official Lovable feature</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
