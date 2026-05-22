"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import IdeaCard from "@/components/IdeaCard";

export default function MyIdeasPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/login?callbackUrl=/my-ideas");
    }
  }, [user]);

  useEffect(() => {
    const loadIdeas = async () => {
      if (!user?.email) return;

      const { data } = await authClient.token();
      const token = data?.token;

      const res = await fetch(
        `http://localhost:5000/my-ideas/${user.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const ideasData = await res.json();
      setIdeas(ideasData);
    };

    loadIdeas();
  }, [user]);

  return (
    <div className="min-h-screen px-4 py-10 bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold tracking-tight mb-2">
          My Ideas
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Your thoughts, saved and organized in one place
        </p>

        {ideas.includes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">💡</div>
            <h2 className="text-xl font-semibold mb-1">
              No ideas yet
            </h2>
            <p className="text-gray-500">
              Start adding your ideas — they will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ideas.map((idea) => (<IdeaCard key={idea._id} idea={idea} showActions={true} />
              
            ))}
          </div>
        )}
      </div>
    </div>
  );
}