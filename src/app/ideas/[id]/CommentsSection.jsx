"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import Image from "next/image";

export default function CommentsSection({ ideaId }) {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [editingId, setEditingId] = useState(null);

    const loadComments = async () => {
        const res = await fetch(
            `http://localhost:5000/comments/${ideaId}`
        );
        const data = await res.json();
        setComments(data);
    };

    useEffect(() => {
        loadComments();
    }, []);

    const handleSubmit = async () => {
        if (!text.trim()) return;

        if (editingId) {
            await fetch(
                `http://localhost:5000/comments/${editingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text,
                    }),
                }
            );
            setEditingId(null);
        } else {
            await fetch("http://localhost:5000/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ideaId,
                    userName: user.name,
                    userEmail: user.email,
                    userImage: user.image,
                    text,
                }),
            });
        }

        setText("");
        loadComments();
    };

    const handleDelete = async (id) => {
        await fetch(
            `http://localhost:5000/comments/${id}`,
            {
                method: "DELETE",
            }
        );

        loadComments();
    };



    return (
        <div className="mt-12 bg-white/70 dark:bg-gray-900/70 rounded-3xl border border-black/75 dark:border-gray-800 overflow-hidden p-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Comments ({comments.length})
            </h2>

            <div className="space-y-4">
                <textarea
                    rows={2}
                    value={text}
                    onChange={(e) =>
                        setText(e.target.value)
                    }
                    placeholder="Add your comment..."
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-2xl px-5 py-4 bg-transparent outline-none focus:ring-2 focus:ring-yellow-500"
                />

                <button
                    onClick={handleSubmit}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                    {editingId
                        ? "Update Comment"
                        : "Post Comment"}
                </button>
            </div>

            <div className="mt-8 space-y-2">
                {comments.map((comment) => (
                    <div
                        key={comment._id}
                        className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5"
                    >
                        <div className="flex items-start gap-3">
                            <Image
                                src={comment.userImage || "https://i.pravatar.cc/100"}
                                alt={comment.userName}
                                width={45}
                                height={45}
                                className="rounded-full object-cover"
                            />

                            <div className="flex-1 gap-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                        {comment.userName}
                                    </h3>

                                    <h1>•</h1>

                                    <p className="text-sm text-gray-400 mt-2">
                                        {new Date(
                                            comment.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <p className="text-gray-700 dark:text-gray-300">
                                    {comment.text}
                                </p>

                            </div>

                            {comment.userEmail ===
                                user?.email && (
                                    <div className="flex gap-3 text-sm">
                                        <button
                                            onClick={() => {
                                                setText(
                                                    comment.text
                                                );
                                                setEditingId(
                                                    comment._id
                                                );
                                            }}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    comment._id
                                                )
                                            }
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}