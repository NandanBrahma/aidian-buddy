import { useState } from "react";
import { Sparkles, Shield, Rocket, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditBadge } from "@/components/CreditBadge";
import { StatusIndicator } from "@/components/StatusIndicator";
import { ErrorCard } from "@/components/ErrorCard";
import { FixSuggestionCard } from "@/components/FixSuggestionCard";
import { DiagnosticResult } from "@/components/DiagnosticResult";
import { ProgressStep } from "@/components/ProgressStep";
import { NextActionTag } from "@/components/NextActionTag";
import { DeploymentProgress, DeploymentStage } from "@/components/DeploymentProgress";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [credits, setCredits] = useState(25);
  const [appStatus, setAppStatus] = useState<"healthy" | "error" | "warning" | "processing">("error");
  const [currentView, setCurrentView] = useState<"dashboard" | "error" | "fixes" | "diagnostic" | "deploying">("error");
  const [deploymentStage, setDeploymentStage] = useState<DeploymentStage>("error-detection");
  const { toast } = useToast();

  const handleShowFixes = () => {
    if (credits < 1) {
      toast({
        title: "Insufficient Credits",
        description: "You need at least 1 credit to view fix suggestions.",
        variant: "destructive",
      });
      return;
    }
    setCredits(prev => prev - 1);
    setCurrentView("fixes");
    setDeploymentStage("fix-selection");
  };

  const handleApplyFix = () => {
    if (credits < 2) {
      toast({
        title: "Insufficient Credits",
        description: "You need at least 2 credits to apply a fix.",
        variant: "destructive",
      });
      return;
    }
    setCredits(prev => prev - 2);
    setAppStatus("processing");
    setCurrentView("deploying");
    setDeploymentStage("fix-application");
    
    setTimeout(() => {
      setDeploymentStage("testing");
    }, 800);
    
    setTimeout(() => {
      setDeploymentStage("ready-to-deploy");
      setAppStatus("healthy");
      toast({
        title: "Fix Applied Successfully! 🎉",
        description: "Your app is now running smoothly.",
      });
    }, 1600);
  };

  const handleRunDiagnostic = () => {
    if (credits < 1) {
      toast({
        title: "Insufficient Credits",
        description: "You need at least 1 credit to run diagnostics.",
        variant: "destructive",
      });
      return;
    }
    setCredits(prev => prev - 1);
    setCurrentView("diagnostic");
    setDeploymentStage("diagnostic");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Guided Debug Assistant</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Error Resolution</p>
              </div>
            </div>
            <CreditBadge 
              credits={credits} 
              variant={credits < 5 ? "warning" : "default"} 
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Progress Tracker */}
        <div className="mb-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Activity className="h-8 w-8 text-primary" />
                    <div>
                      <h2 className="text-2xl font-bold">App Health Monitor</h2>
                      <p className="text-sm text-muted-foreground">Real-time status tracking</p>
                    </div>
                  </div>
                  <StatusIndicator status={appStatus} />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:row-span-2">
            <DeploymentProgress currentStage={deploymentStage} className="sticky top-24" />
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="lg:grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="fixes">Fixes & Solutions</TabsTrigger>
                <TabsTrigger value="deploy">Deployment</TabsTrigger>
              </TabsList>

          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            {currentView === "error" && (
              <div className="space-y-3">
                <NextActionTag text="Recommended Next Step" />
                <ErrorCard
                  title="Error Detected in Authentication Flow"
                  description="I noticed an error in your app. The authentication module is failing to validate user tokens correctly. This may prevent users from logging in successfully."
                  onShowFix={handleShowFixes}
                  onIgnore={() => toast({ title: "Error ignored", description: "You can address this later." })}
                />
              </div>
            )}

            {currentView === "diagnostic" && (
              <DiagnosticResult
                findings={[
                  {
                    type: "error",
                    title: "Missing JWT Secret",
                    description: "The JWT_SECRET environment variable is not configured in your production environment.",
                    location: "auth.config.ts:12"
                  },
                  {
                    type: "warning",
                    title: "Token Expiration Too Long",
                    description: "Current token expiration is set to 30 days. Consider reducing for better security.",
                    location: "auth.config.ts:24"
                  }
                ]}
                onSuggestFixes={handleShowFixes}
                onShowCode={() => toast({ title: "Code View", description: "Opening impacted code sections..." })}
              />
            )}

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <Shield className="h-8 w-8 text-success mb-2" />
                  <CardTitle className="text-base">Security</CardTitle>
                  <CardDescription>All checks passed</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <Activity className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-base">Performance</CardTitle>
                  <CardDescription>Optimal response time</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <Rocket className="h-8 w-8 text-warning mb-2" />
                  <CardTitle className="text-base">Deployment</CardTitle>
                  <CardDescription>Ready to deploy</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common debugging and maintenance tasks</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button onClick={handleRunDiagnostic} variant="outline">
                  Run Full Diagnostic (1 credit)
                </Button>
                <Button variant="outline" onClick={() => toast({ title: "Logs", description: "Opening application logs..." })}>
                  View Logs
                </Button>
                <Button variant="outline" onClick={() => toast({ title: "Tests", description: "Running test suite..." })}>
                  Run Tests
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fixes" className="space-y-4 animate-fade-in">
            {currentView === "fixes" && (
              <>
                <div className="space-y-3">
                  <NextActionTag text="Choose a Fix" />
                  <Card>
                    <CardHeader>
                      <CardTitle>Fix Options Available</CardTitle>
                      <CardDescription>
                        Choose the solution that best matches your app's requirements. Each fix has been analyzed for safety and effectiveness.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <div className="grid gap-4">
                  <FixSuggestionCard
                    title="Configure JWT Secret (Recommended)"
                    description="Add the missing JWT_SECRET environment variable with a secure random string. This will resolve the authentication validation errors."
                    creditCost={2}
                    recommended
                    onApply={handleApplyFix}
                    onExplain={() => toast({ title: "Explanation", description: "This fix adds proper environment configuration..." })}
                  />
                  <FixSuggestionCard
                    title="Switch to OAuth Provider"
                    description="Migrate authentication to a third-party OAuth provider like Auth0 or Firebase. This eliminates the need for manual JWT management."
                    creditCost={3}
                    onApply={() => toast({ title: "Apply", description: "This would require more extensive changes..." })}
                    onExplain={() => toast({ title: "Explanation", description: "OAuth providers handle authentication..." })}
                  />
                  <FixSuggestionCard
                    title="Implement Session-Based Auth"
                    description="Replace JWT tokens with server-side session management using secure cookies. Better for certain use cases but requires backend state."
                    creditCost={3}
                    onApply={() => toast({ title: "Apply", description: "This approach uses server sessions..." })}
                    onExplain={() => toast({ title: "Explanation", description: "Session-based auth stores..." })}
                  />
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="deploy" className="space-y-6 animate-fade-in">
            {currentView === "deploying" && (
              <Card>
                <CardHeader>
                  <CardTitle>Applying Fix</CardTitle>
                  <CardDescription>This may take a moment - ensuring no new issues are introduced</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProgressStep
                    steps={[
                      { label: "Validating fix compatibility", status: "completed" },
                      { label: "Applying code changes", status: "completed" },
                      { label: "Running safety tests", status: "current" },
                      { label: "Updating deployment", status: "pending" },
                    ]}
                  />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Pre-Deployment Checklist</CardTitle>
                <CardDescription>Everything looks good for deployment!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="text-sm">All API keys are configured</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="text-sm">No unhandled errors detected</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="text-sm">Model configuration verified</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <Rocket className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Ready to Deploy</CardTitle>
                <CardDescription>
                  Your app has passed all checks and is ready for production deployment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg">
                  Deploy Now (1 credit)
                </Button>
              </CardContent>
            </Card>
            </TabsContent>
            </Tabs>

            {/* Encouraging Message */}
            <Card className="mt-8 border-accent/20 bg-accent/5">
          <CardContent className="pt-6">
            <p className="text-center text-sm text-muted-foreground">
              💡 <strong>You're doing great!</strong> Debugging is a normal part of building.
              I'll help you through each step until your app is ready to deploy.
            </p>
            </CardContent>
          </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
