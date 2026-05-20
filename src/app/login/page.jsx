"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        const { data, error } = await authClient.signIn.email({
            email: e.email,
            password: e.password,
            image: e.photo,
            callbackURL: "/login",
        });

        console.log(data, error)

        if (error) {
            alert(error.message)
        }

        if (data) {
            alert(data.message)
        }
    };

    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                <form
                    onSubmit={handleLogin}
                    className="space-y-4"
                >
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
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                <button
                    onClick={handleGoogle}
                    className="w-full mt-4 border py-3 rounded-xl"
                >
                    Continue with Google
                </button>

                <p className="text-center mt-6">
                    No account?{" "}
                    <Link
                        href="/register"
                        className="text-yellow-600"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </section>
    );
}