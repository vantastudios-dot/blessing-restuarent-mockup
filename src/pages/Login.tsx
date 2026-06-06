import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { LogIn, UserPlus, ArrowLeft, Loader2 } from "lucide-react";

function getOAuthUrl() {
  const portalUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${portalUrl || "http://localhost"}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/";
    },
    onError: (err) => setError(err.message),
  });

  const registerMutation = trpc.localAuth.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/";
    },
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      loginMutation.mutate({ username, password });
    } else {
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      registerMutation.mutate({
        username,
        password,
        displayName: displayName || undefined,
        email: email || undefined,
      });
    }
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] flex items-center justify-center section-padding"
      style={{
        backgroundImage: "url(/images/reservation-ambience.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#0A0A0A]/90" />

      <div className="relative w-full max-w-[440px]" style={{ zIndex: 2 }}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#8A8A8A] hover:text-[#C7A878] transition-colors text-sm mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="glass-panel p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="font-display text-heading-lg text-[#F6F2EB] uppercase mb-2">
              {mode === "login" ? "Welcome Back" : "Join Blessings"}
            </h1>
            <p className="text-body-sm text-[#8A8A8A]">
              {mode === "login"
                ? "Sign in to your account"
                : "Create your account"}
            </p>
          </div>

          {/* OAuth Button */}
          <a
            href={getOAuthUrl()}
            className="w-full h-12 bg-[#1A1A1A] text-[#F6F2EB] font-body text-body-md rounded flex items-center justify-center gap-2 hover:bg-[#2A2A2A] transition-colors mb-6"
          >
            <LogIn size={18} />
            Continue with OAuth
          </a>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1px] bg-[#1A1A1A]" />
            <span className="text-label text-[#8A8A8A]">OR</span>
            <div className="flex-1 h-[1px] bg-[#1A1A1A]" />
          </div>

          {/* Local Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-label text-[#8A8A8A] block mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent border-b border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md py-3 focus:border-[#C7A878] transition-colors outline-none"
                placeholder="Enter username"
                required
              />
            </div>

            {mode === "register" && (
              <>
                <div>
                  <label className="text-label text-[#8A8A8A] block mb-2">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-transparent border-b border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md py-3 focus:border-[#C7A878] transition-colors outline-none"
                    placeholder="Your display name"
                  />
                </div>
                <div>
                  <label className="text-label text-[#8A8A8A] block mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md py-3 focus:border-[#C7A878] transition-colors outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-label text-[#8A8A8A] block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-[#F6F2EB]/15 text-[#F6F2EB] text-body-md py-3 focus:border-[#C7A878] transition-colors outline-none"
                placeholder={mode === "register" ? "Min 6 characters" : "Enter password"}
                required
              />
            </div>

            {error && (
              <p className="text-[#C75B5B] text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-[#C7A878] text-[#0A0A0A] font-display text-[16px] uppercase rounded hover:bg-[#E6D9C6] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-6"
            >
              {isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : mode === "login" ? (
                <>
                  <LogIn size={16} />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="text-center text-body-sm text-[#8A8A8A] mt-6">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => { setMode("register"); setError(""); }}
                  className="text-[#C7A878] hover:underline"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => { setMode("login"); setError(""); }}
                  className="text-[#C7A878] hover:underline"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
