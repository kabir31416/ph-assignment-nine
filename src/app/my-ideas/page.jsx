"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import IdeaCard from "@/components/IdeaCard";

export default function MyIdeasPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/my-ideas/${user.email}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setIdeas(data));
    }
  }, [user]);


  const handleUpdate = async (id, updatedData) => {
    await fetch(`http://localhost:5000/ideas/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const updatedIdeas = ideas.map((idea) =>
      idea._id === id ? { ...idea, ...updatedData } : idea
    );

    setIdeas(updatedIdeas);
  };


  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/ideas/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const remainingIdeas = ideas.filter(
      (idea) => idea._id !== id
    );

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