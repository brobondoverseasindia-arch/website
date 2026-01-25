import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { COMPANY } from "@/lib/constants";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // We use useQuery to check password. 
  // Ideally, for security, you'd use an Action that returns a token, 
  // but for this simple app, we'll check against the query result.
  // Note: Passwords in queries are visible in network logs if not careful, 
  // but here we are sending the candidate password to the server.
  // A better approach is an Action, but Query is faster for read-only check.
  
  // Actually, let's just trigger the check when submitting.
  // We can't conditionally call useQuery.
  // We'll use a client-side check against a server-side mutation or query?
  // Let's use a "fetch" style query via the client directly if possible, or just a mutation/action for login.
  // Since Convex doesn't have "imperative queries" easily in hooks without arguments changing,
  // we will use a small hack: we won't use the hook for login submit, we'll use `convext.query` directly if we had access,
  // or better, just use a mutation for login (even if it doesn't write) or an action.
  // But wait, `auth.login` is a query. I can't call it imperatively.
  // I will switch `auth.login` to an `action` or `mutation` so I can call it.
  // Actually, checking a password doesn't write, so it CAN be a query, but calling it on button click is harder with hooks.
  // Let's use a mutation for "login" just so we can trigger it. It's fine. 
  // OR, I can just use `useConvex()` to get the client.

  const initAuth = useMutation(api.auth.initAuth);
  
  // Initialize default password on mount if needed
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // We need to verify the password. 
  // I'll assume we can use `useConvex` to fetch the query imperatively.
  // But `useConvex` is not imported.
  // Let's refactor auth.ts to make `login` an `action` or just use a hacky way.
  // No, let's do it properly. Let's make `login` a mutation or action.
  // Queries are reactive. Actions are for side effects or one-off tasks.
  // Checking password is a one-off task here.
  // I'll update `convex/auth.ts` to make `login` an action (or mutation).
  // Mutation is faster if it just reads DB.
  
  // WAIT: I already wrote `auth.ts` as `query` for login. I will update it to `mutation`.
  // Why mutation? Because actions are for external APIs. Mutations are for DB. 
  // Even if we don't write, we can use mutation to get a result imperatively via `useMutation`.
  
  const loginMutation = useMutation(api.auth.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const isValid = await loginMutation({ password });
      
      if (isValid) {
        localStorage.setItem("admin_authenticated", "true");
        toast.success("Welcome back!");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid password");
        toast.error("Invalid password");
      }
    } catch (err) {
      setError("Login failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border p-8 card-shadow">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-xl gradient-purple flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{COMPANY.name}</h1>
            <p className="text-muted-foreground mt-1">Admin Panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error ? "border-destructive" : ""}
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
