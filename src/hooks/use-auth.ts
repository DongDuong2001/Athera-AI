"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface User {
    id: string;
    email: string;
    name: string | null;
    role: string;
    emailVerified: boolean;
}

/**
 * Hook to get the current authenticated user
 */
export function useUser() {
    return useQuery<User | null>({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await fetch("/api/auth/me");
            const data = await response.json();
            return data.user;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });
}

/**
 * Hook to login a user
 */
export function useLogin() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async ({
            email,
            password,
            returnUrl = "/",
        }: {
            email: string;
            password: string;
            returnUrl?: string;
        }) => {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            return { user: data.user, returnUrl };
        },
        onSuccess: ({ returnUrl }) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Welcome back!");
            router.push(returnUrl);
            router.refresh();
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}

/**
 * Hook to logout a user
 */
export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async () => {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Logout failed");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Signed out successfully");
            router.push("/sign-in");
            router.refresh();
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}

/**
 * Hook to register a new user (send OTP)
 */
export function useRegister() {
    return useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const response = await fetch("/api/otp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send verification code");
            }

            return data;
        },
        onSuccess: () => {
            toast.success("Verification code sent to your email!");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}

/**
 * Hook to verify OTP and complete registration
 */
export function useVerifyOtp() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
            const response = await fetch("/api/otp/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to verify OTP");
            }

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Account verified successfully!");
            router.push("/");
            router.refresh();
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
}
