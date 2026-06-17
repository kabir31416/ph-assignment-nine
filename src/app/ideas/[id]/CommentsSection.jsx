"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import Image from "next/image";
import { toast } from "react-toastify";

export default function CommentsSection({ ideaId }) {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    // ---------------- LOAD COMMENTS ----------------
    const loadComments = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${ideaId}`,
                {
                    credentials: "include",
                }
            );

            const data = await res.json();

            console.log("COMMENTS API RESPONSE:", res.status, data);

            if (res.ok && Array.isArray(data)) {
                setComments(data);
            } else {
                setComments([]);
                console.error("Invalid comments response:", data);
            }
        } catch (error) {
            console.error("Load comments error:", error);
            setComments([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (ideaId) {
            loadComments();
        }
    }, [ideaId]);

    // ---------------- SUBMIT COMMENT ----------------
    const handleSubmit = async () => {
        if (!text.trim()) return;

        try {
            const url = editingId
                ? `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${editingId}`
                : `${process.env.NEXT_PUBLIC_SERVER_URL}/comments`;

            const method = editingId ? "PUT" : "POST";

            const body = editingId
                ? { text }
                : {
                      ideaId,
                      userName: user?.name,
                      userEmail: user?.email,
                      userImage: user?.image,
                      text,
                  };

            await fetch(url, {
                credentials: "include",
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            toast.success(editingId ? "Comment updated!" : "Comment added!");

            setText("");
            setEditingId(null);
            loadComments();
        } catch (error) {
            console.error("Submit error:", error);
        }
    };

    // ---------------- DELETE COMMENT ----------------
    const handleDelete = async (id) => {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`,
                {
                    credentials: "include",
                    method: "DELETE",
                }
            );

            toast.success("Comment deleted!");
            loadComments();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    // ---------------- UI ----------------
    return (
        <div className="mt-12 bg-white/70 dark:bg-gray-900/70 rounded-3xl border border-black/75 dark:border-gray-800 overflow-hidden p-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Comments ({Array.isArray(comments) ? comments.length : 0})
            </h2>

            {/* INPUT */}
            <div className="space-y-4">
                <textarea
                    rows={2}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add your comment..."
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-2xl px-5 py-4 bg-transparent outline-none focus:ring-2 focus:ring-yellow-500"
                />

                <button
                    onClick={handleSubmit}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                    {editingId ? "Update Comment" : "Post Comment"}
                </button>
            </div>

            {/* COMMENTS LIST */}
            <div className="mt-8 space-y-2">
                {loading ? (
                    <p className="text-gray-500">Loading comments...</p>
                ) : Array.isArray(comments) && comments.length > 0 ? (
                    comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5"
                        >
                            <div className="flex items-start gap-3">
                                <Image
                                    src={
                                        comment.userImage ||
                                        "https://i.pravatar.cc/100"
                                    }
                                    alt={comment.userName || "user"}
                                    width={45}
                                    height={45}
                                    className="rounded-full object-cover"
                                />

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                            {comment.userName}
                                        </h3>

                                        <span className="text-gray-400">•</span>

                                        <p className="text-sm text-gray-400">
                                            {comment.createdAt
                                                ? new Date(
                                                      comment.createdAt
                                                  ).toLocaleDateString()
                                                : ""}
                                        </p>
                                    </div>

                                    <p className="text-gray-700 dark:text-gray-300 mt-1">
                                        {comment.text}
                                    </p>
                                </div>

                                {/* ACTIONS */}
                                {comment.userEmail === user?.email && (
                                    <div className="flex gap-3 text-sm">
                                        <button
                                            onClick={() => {
                                                setText(comment.text);
                                                setEditingId(comment._id);
                                            }}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(comment._id)
                                            }
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
            </div>
        </div>
    );
}