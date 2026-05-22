"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginContent() {
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.currentTarget);

        const email = form.get("email");
        const password = form.get("password");

        const { data, error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: callbackUrl,
        });

        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        if (data) {
            router.push(callbackUrl);
        }
    };

    const handleGoogle = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: callbackUrl,
        });

        if (error) {
            alert(error.message);
            return;
        }

        if (data) {
            router.push(callbackUrl);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full p-3 rounded-xl border"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full p-3 rounded-xl border"
                    />

                    <button
                        className="w-full bg-yellow-500 text-white py-3 rounded-xl"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                <Button
                    className="w-full mt-4"
                    variant="tertiary"
                    onClick={handleGoogle}
                >
                    <Icon icon="devicon:google" />
                    Sign in with Google
                </Button>

                <p className="text-center mt-6">
                    No account?{" "}
                    <Link href="/sign-up" className="text-yellow-600">
                        Register
                    </Link>
                </p>
            </div>
        </section>
    );
}