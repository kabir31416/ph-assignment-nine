"use client";

import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, User, Mail, Lock, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function RegisterPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.value;
        const password = form.password.value;


        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        if (!/[A-Z]/.test(password)) {
            toast.error("Password must include an uppercase letter");
            setLoading(false);
            return;
        }

        if (!/[a-z]/.test(password)) {
            toast.error("Password must include a lowercase letter");
            setLoading(false);
            return;
        }

        const { error } = await authClient.signUp.email({
            email, password, name, image,
        });

        if (error) {
            toast.error(error.message);
            setLoading(false);
            return;
        }

        toast.success("Registration successful!");
        router.push("/");
        router.refresh();
    };

    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-16">
            <title>{`Sign Up | IdeaVault`}</title>
            <div className="w-full max-w-md bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-800 shadow-xl p-8">

                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-linear-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                        Create Account
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Join IdeaVault and share your startup ideas
                    </p>
                </div>

                
                <form onSubmit={handleRegister} className="space-y-5">

                    
                    <div className="relative">
                        <User
                            size={18}
                            className="absolute left-4 top-4 text-gray-400"
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            required
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-yellow-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    
                    <div className="relative">
                        <Mail
                            size={18}
                            className="absolute left-4 top-4 text-gray-400"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-yellow-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    
                    <div className="relative">
                        <ImageIcon
                            size={18}
                            className="absolute left-4 top-4 text-gray-400"
                        />
                        <input
                            type="text"
                            name="image"
                            placeholder="Photo URL"
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-yellow-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    
                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-4 top-4 text-gray-400"
                        />

                        <input
                            type={showPass ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full pl-11 pr-12 py-3 rounded-2xl border border-yellow-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-4 top-4 text-gray-400"
                        >
                            {showPass ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>

                    
                    <p className="text-xs text-gray-500">
                        Must be at least 6 characters and include uppercase &
                        lowercase letters.
                    </p>

                    
                    <button
                        disabled={loading}
                        className="w-full py-3 rounded-2xl bg-linear-to-r from-yellow-500 to-orange-500 text-white font-semibold hover:opacity-90 transition"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <Button className="w-full mt-4" variant="tertiary" onClick={handleGoogle}>
                    <Icon icon="devicon:google" />
                    Sign in with Google
                </Button>

               
                <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-yellow-600 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
}