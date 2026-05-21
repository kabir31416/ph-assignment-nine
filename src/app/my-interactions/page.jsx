"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import { SquareArrowOutUpRight, TextInitial } from "lucide-react";

export default function MyInteractionsPage() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadInteractions = async (email) => {
        try {
            setLoading(true);
            const res = await fetch(
                `http://localhost:5000/my-interactions/${email}`
            );
            const data = await res.json();
            setComments(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            loadInteractions(user.email);
        }
    }, [user?.email]);

    const handleDelete = async (id) => {
        try {
            await fetch(
                `http://localhost:5000/comments/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (user?.email) {
                loadInteractions(user.email);
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    if (isPending) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading session...</p>
            </section>
        );
    }

    if (!user?.email) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">
                    Please login to see your interactions.
                </p>
            </section>
        );
    }

    return (
        <section className="min-h-screen px-4 py-10">
            <title>{`My Interactions | IdeaVault`}</title>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">
                    My Interactions ({comments.length})
                </h1>

                {loading ? (
                    <p className="text-gray-500">Loading comments...</p>
                ) : comments.length === 0 ? (
                    <p className="text-gray-500">
                        No interactions found.
                    </p>
                ) : (
                    <div className="space-y-5">
                        {comments.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white dark:bg-gray-900 rounded-2xl shadow p-3 border"
                            >
                                <Link
                                    href={`/ideas/${item.idea?._id}`}
                                    className=" flex gap-1 items-center text-xl font-semibold text-yellow-600 hover:underline"
                                >
                                 {item.idea?.title} <SquareArrowOutUpRight height={20} width={20} />
                                </Link>

                                <p className=" text-gray-700 dark:text-gray-300">
                                    {item.text}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">
                                        {item.createdAt
                                            ? new Date(
                                                  item.createdAt
                                              ).toLocaleString()
                                            : ""}
                                    </span>

                                    <button
                                        onClick={() =>
                                            handleDelete(item._id)
                                        }
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}