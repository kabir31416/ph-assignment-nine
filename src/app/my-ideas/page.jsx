"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import IdeaCard from "@/components/IdeaCard";

export default function MyIdeasPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const loadIdeas = async () => {
      if (!user?.email) return;

      const { data } = await authClient.getSession();
      const token = data?.session?.token;

      const res = await fetch(`http://localhost:5000/my-ideas/${user.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const ideasData = await res.json();
      setIdeas(ideasData);
    };

    loadIdeas();
  }, [user]);

  const handleUpdate = async (id, updatedData) => {
    const { data } = await authClient.getSession();
    const token = data?.session?.token;

    await fetch(`http://localhost:5000/ideas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const updatedIdeas = ideas.map((idea) =>
      idea._id === id ? { ...idea, ...updatedData } : idea
    );

    setIdeas(updatedIdeas);
  };

  const handleDelete = async (id) => {
    const { data } = await authClient.getSession();
    const token = data?.session?.token;

    await fetch(`http://localhost:5000/ideas/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const remainingIdeas = ideas.filter((idea) => idea._id !== id);
    setIdeas(remainingIdeas);
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Ideas</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea._id}
            idea={idea}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            showActions={true}
          />
        ))}
      </div>
    </div>
  );
}