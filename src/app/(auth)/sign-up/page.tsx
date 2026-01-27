"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SignUpForm, { type SignUpFormValues } from "./sign-up-form";
import VerifyOtpForm, { VerifyOtpFormValues } from "./verify-otp-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ... imports remain the same

export default function SignUp() {
  const router = useRouter();
  const [step, setStep] = useState<"signup" | "verify">("signup");
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      await sendOtp(values.email, values.password);
      setEmail(values.email);
      setPassword(values.password);
      setStep("verify");
      toast.success("Verification code sent to your email!");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Please try again."
      );
    }
  };

  const sendOtp = async (email: string | null, password: string | null) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      return data;
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Please try again."
      );
    }
  };

  const resendOtp = async () => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      await sendOtp(email, password);
      toast.success("Verification code resent!");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to resend verification code. Please try again."
      );
    }
  };

  const verifyOtp = async (values: VerifyOtpFormValues) => {
    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: values.otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to verify OTP");
      }

      toast.success("Account verified successfully!");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to verify OTP. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            {step === "signup" ? "Create Your Account" : "Verify Your Email"}
          </CardTitle>
          <CardDescription>
            {step === "signup"
              ? "Enter your details beneath to create an account"
              : (
                <span>
                  We&apos;ve sent a 6-digit verification code to{" "}
                  <span className="font-semibold text-gray-900">{email}</span>
                </span>
              )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "signup" ? (
            <SignUpForm onSubmit={onSubmit} />
          ) : (
            <VerifyOtpForm onSuccess={verifyOtp} onResendOtp={resendOtp} />
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {step === "signup" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-[#34C0FC] font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          ) : (
            <Button
              variant="ghost"
              onClick={() => setStep("signup")}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to sign up
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
