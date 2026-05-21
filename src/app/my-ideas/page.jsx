"use client";

import { useEffect, useState } from "react";
import IdeaCard from "@/components/IdeaCard";
import { authClient } from "@/app/lib/auth-client";

export default function MyIdeasPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/my-ideas/${user.email}`)
        .then((res) => res.json())
        .then((data) => setIdeas(data));
    }
  }, [user]);

  return (
    <div className="min-h-screen px-4 py-10">
      <title>{`My Ideas | IdeaVault`}</title>
      <h1 className="text-3xl font-bold mb-8">My Ideas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto p-5">
        {ideas.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} />
        ))}
      </div>
    </div>
  );
}