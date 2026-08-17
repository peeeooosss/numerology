"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, KeyRound, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEMO_USER_EMAIL = "demo@aura-numerology.com";
const DEMO_USER_OTP = "123456";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState<"email" | "otp">("email");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function useDemoAccount() {
    setEmail(DEMO_USER_EMAIL);
    setError("");
    setMessage("Demo account selected. Use OTP 123456 to continue.");
    setStep("otp");
  }

  function sendCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!email.trim()) return;
    setStep("otp");
    setMessage(
      email.trim().toLowerCase() === DEMO_USER_EMAIL
        ? "Demo OTP: 123456"
        : `Test verification code sent to ${email}. Use 123456 in this demo build.`
    );
  }

  function updateCode(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    setCode((current) => current.map((item, itemIndex) => (itemIndex === index ? digit : item)));
    if (digit && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  }

  function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (email.trim().toLowerCase() !== DEMO_USER_EMAIL || code.join("") !== DEMO_USER_OTP) {
      setError(`Use the demo credentials: ${DEMO_USER_EMAIL} with OTP ${DEMO_USER_OTP}.`);
      return;
    }

    window.localStorage.setItem("aura_user_authenticated", "true");
    window.localStorage.setItem("aura_user_email", DEMO_USER_EMAIL);
    router.replace("/dashboard");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cosmic-field px-5 py-10 text-cream">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-copper/10 blur-3xl" />
      <Card className="relative w-full max-w-md border-gold/25 bg-[#101225]/90 p-2">
        <CardHeader className="px-6 pt-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/40 bg-gold/10 text-gold shadow-goldglow">
            <Sparkles className="h-7 w-7" />
          </div>
          <p className="text-xs uppercase tracking-[.24em] text-gold">AURA private access</p>
          <CardTitle className="mt-3 text-3xl">{step === "email" ? "Enter your portal" : "Enter demo OTP"}</CardTitle>
          <CardDescription className="mx-auto mt-2 max-w-xs">
            {step === "email" ? "Use the demo account below to open the personalised dashboard." : "Verify the six-digit demo code to unlock your dashboard."}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8 pt-5">
          {step === "email" ? (
            <form onSubmit={sendCode} className="space-y-5">
              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                  <Input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={DEMO_USER_EMAIL} className="pl-11" />
                </div>
              </div>
              <Button type="submit" className="w-full">Send demo code <KeyRound className="h-4 w-4" /></Button>
              <Button type="button" variant="outline" className="w-full" onClick={useDemoAccount}>Use demo account</Button>
            </form>
          ) : (
            <form onSubmit={verifyCode} className="space-y-6">
              <div className="rounded-xl border border-gold/20 bg-gold/5 p-3 text-center text-sm">
                <p className="text-lav">Demo account</p>
                <p className="mt-1 text-gold">{DEMO_USER_EMAIL}</p>
                <p className="mt-2 text-xs text-lav">OTP: <span className="font-mono text-cream">123456</span></p>
              </div>
              <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                  <input key={index} id={`otp-${index}`} aria-label={`Verification digit ${index + 1}`} inputMode="numeric" autoComplete={index === 0 ? "one-time-code" : "off"} value={digit} onChange={(event) => updateCode(index, event.target.value)} className="h-12 w-10 rounded-lg border border-gold/25 bg-midnight text-center text-lg text-cream outline-none focus:border-gold sm:w-11" />
                ))}
              </div>
              {message && <p className="text-center text-sm text-goldlite">{message}</p>}
              {error && <p role="alert" className="text-center text-sm text-rose-300">{error}</p>}
              <Button type="submit" className="w-full">Open demo dashboard <ShieldCheck className="h-4 w-4" /></Button>
              <button type="button" onClick={() => { setStep("email"); setCode(["", "", "", "", "", ""]); setError(""); }} className="mx-auto flex items-center gap-2 text-xs text-lav hover:text-cream"><ArrowLeft className="h-3.5 w-3.5" /> Use another email</button>
            </form>
          )}

          {step === "email" && (
            <div className="mt-7 rounded-xl border border-white/10 bg-white/[.03] p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-gold"><LockKeyhole className="h-3.5 w-3.5" /> Demo credentials</div>
              <p className="mt-3 text-xs text-lav">Email</p>
              <p className="mt-1 font-mono text-sm text-cream">{DEMO_USER_EMAIL}</p>
              <p className="mt-3 text-xs text-lav">OTP</p>
              <p className="mt-1 font-mono text-sm text-cream">{DEMO_USER_OTP}</p>
              <p className="mt-3 text-[11px] text-lav/70">Development-only access. No email is sent.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
