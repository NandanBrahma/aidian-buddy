import { useState } from "react";
import { Sparkles, Shield, Rocket, Activity, ArrowLeft } from "lucide-react";
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
import { IntegrationTooltip } from "@/components/IntegrationTooltip";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [credits, setCredits] = useState(25);
  const [appStatus, setAppStatus] = useState<"healthy" | "error" | "warning" | "processing">("error");
  const [currentView, setCurrentView] = useState<"dashboard" | "error" | "fixes" | "diagnostic" | "deploying">("error");
  const [deploymentStage, setDeploymentStage] = useState<DeploymentStage>("error-detection");
  const { toast } = useToast();
  const navigate = useNavigate();

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
      setDeploymentStage("ready-to-deploy");
      setAppStatus("healthy");
      toast({
        title: "Fix Applied Successfully! 🎉",
        description: "Your app is now running smoothly and ready to deploy.",
      });
    }, 300);
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

  const handleDeploy = () => {
    if (credits < 1) {
      toast({
        title: "Insufficient Credits",
        description: "You need at least 1 credit to deploy.",
        variant: "destructive",
      });
      return;
    }
    setCredits(prev => prev - 1);
    setDeploymentStage("deployed");
    toast({
      title: "Deployment Complete! 🚀",
      description: "Your app is now live in production.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="h-10 w-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">Guided Debug Assistant</h1>
                  <IntegrationTooltip content="In production, this would appear as a tool in the Lovable toolbar, similar to Cloud or Analytics" />
                </div>
                <p className="text-xs text-muted-foreground">Interactive Demo • Prototype Feature</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IntegrationTooltip content="Credit system integrates with Lovable's existing credit model" />
              <CreditBadge 
                credits={credits} 
                variant={credits < 5 ? "warning" : "default"} 
              />
            </div>
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
                <div className="flex items-center gap-2 mb-3">
                  <NextActionTag text="Recommended Next Step" />
                  <IntegrationTooltip content="Errors would be automatically detected from console logs and network requests in the Lovable preview" />
                </div>
                <ErrorCard
                  title="Error Detected in Authentication Flow"
                  description="Your app's authentication module is failing to validate JWT tokens. The JWT_SECRET environment variable is missing, causing token verification to fail and preventing users from staying logged in."
                  onShowFix={handleShowFixes}
                  onIgnore={() => toast({ title: "Error ignored", description: "You can address this later." })}
                />
              </div>
            )}

            {currentView === "diagnostic" && (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <IntegrationTooltip content="Deep diagnostics would analyze your full codebase, edge functions, and Supabase configuration" />
                </div>
                <DiagnosticResult
                  findings={[
                    {
                      type: "error",
                      title: "Missing JWT Secret",
                      description: "The JWT_SECRET environment variable is not configured in your production environment. This is blocking token validation in src/auth/verify.ts.",
                      location: "src/auth/config.ts:12"
                    },
                    {
                      type: "warning",
                      title: "Token Expiration Too Long",
                      description: "Current token expiration is set to 30 days. Security best practice recommends 7 days maximum for web apps.",
                      location: "src/auth/config.ts:24"
                    },
                    {
                      type: "warning",
                      title: "Missing Rate Limiting",
                      description: "Authentication endpoints lack rate limiting, making them vulnerable to brute force attacks.",
                      location: "src/api/auth/login.ts:8"
                    }
                  ]}
                  onSuggestFixes={handleShowFixes}
                  onShowCode={() => toast({ title: "Code View", description: "Opening impacted code sections..." })}
                />
              </>
            )}

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <Shield className="h-8 w-8 text-success mb-2" />
                <CardTitle className="text-base">Security</CardTitle>
                <CardDescription>All checks passed</CardDescription>
              </CardHeader>
            </Card>

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
                  <div className="flex items-center gap-2">
                    <NextActionTag text="Choose a Fix" />
                    <IntegrationTooltip content="AI would analyze your codebase context and suggest fixes tailored to your specific setup" />
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Fix Options Available</CardTitle>
                      <CardDescription>
                        Choose the solution that best matches your app's requirements. Each fix has been analyzed for safety, effectiveness, and compatibility with your existing code.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <div className="grid gap-4">
                  <FixSuggestionCard
                    title="Configure JWT Secret (Recommended)"
                    description="Add JWT_SECRET to your Lovable secrets, generate a secure 256-bit key, and update your auth config to use it. This fix will automatically apply the changes to src/auth/config.ts and add the secret to your environment."
                    creditCost={2}
                    recommended
                    onApply={handleApplyFix}
                    onExplain={() => toast({ title: "Detailed Explanation", description: "This fix will: 1) Generate a cryptographically secure random string, 2) Add it to Lovable secrets, 3) Update your auth config to reference it, 4) Test the authentication flow." })}
                  />
                  <FixSuggestionCard
                    title="Switch to Supabase Auth"
                    description="Migrate to Supabase's built-in authentication system. Works seamlessly with Lovable Cloud, handles JWT management automatically, and includes social login support out of the box."
                    creditCost={3}
                    onApply={() => toast({ title: "Migration Preview", description: "This would require: 1) Enabling Lovable Cloud, 2) Replacing custom auth with Supabase client, 3) Updating UI components to use Supabase hooks. Estimated 15-20 minutes." })}
                    onExplain={() => toast({ title: "Supabase Auth Benefits", description: "Built-in security, automatic token refresh, social providers (Google, GitHub, etc.), and no manual JWT handling. Perfect for Lovable Cloud projects." })}
                  />
                  <FixSuggestionCard
                    title="Implement Session-Based Auth"
                    description="Replace JWT with server-side sessions using HTTP-only cookies. Requires adding session middleware to your edge functions and database table for session storage."
                    creditCost={3}
                    onApply={() => toast({ title: "Session Auth Preview", description: "Would create: 1) Session middleware edge function, 2) Sessions database table, 3) Updated auth endpoints, 4) Secure cookie handling. More complex but better for sensitive apps." })}
                    onExplain={() => toast({ title: "Session Auth Details", description: "Sessions store auth state server-side, making tokens un-stealable by XSS. Trade-off: slightly more complex infrastructure and database usage." })}
                  />
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="deploy" className="space-y-6 animate-fade-in">
            {currentView === "deploying" && deploymentStage === "fix-application" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle>Applying Fix</CardTitle>
                    <IntegrationTooltip content="Changes would be applied directly to your project files and verified before deployment" />
                  </div>
                  <CardDescription>Validating compatibility, applying code changes, and running safety checks...</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProgressStep
                    steps={[
                      { label: "Validating fix compatibility with your codebase", status: "current" },
                      { label: "Applying code changes to src/auth/config.ts", status: "pending" },
                      { label: "Adding JWT_SECRET to Lovable secrets", status: "pending" },
                      { label: "Running auth tests and security checks", status: "pending" },
                    ]}
                  />
                </CardContent>
              </Card>
            )}
            
            {deploymentStage === "ready-to-deploy" && (
              <Card className="border-success/20 bg-success/5">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-success">✓ Fix Applied Successfully</CardTitle>
                    <IntegrationTooltip content="In production, you'd see the actual files changed and could review them in Dev Mode before deploying" />
                  </div>
                  <CardDescription>All checks passed - your app is ready for production deployment</CardDescription>
                </CardHeader>
              </Card>
            )}

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>Pre-Deployment Checklist</CardTitle>
                  <IntegrationTooltip content="Would integrate with Lovable's existing deployment checks before the Publish button finalizes" />
                </div>
                <CardDescription>Everything looks good for deployment!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="text-sm">JWT_SECRET configured in Lovable secrets</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="text-sm">No console errors detected in preview</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="text-sm">Authentication flow tested successfully</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="text-sm">Edge functions verified and ready</span>
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
                <Button className="w-full" size="lg" onClick={handleDeploy}>
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
