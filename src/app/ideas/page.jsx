"use client";

import { useState, useEffect } from "react";
import IdeaCard from "@/components/IdeaCard";

export default function IdeasPage() {
  const [allIdeas, setAllIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllIdeas = async () => {
      try {
        const res = await fetch("http://localhost:5000/ideas", {
          cache: "no-store",
        });
        const data = await res.json();
        setAllIdeas(data);
        setFilteredIdeas(data);
      } finally {
        setLoading(false);
      }
    };

    fetchAllIdeas();
  }, []);

  useEffect(() => {
    let result = allIdeas;

    if (search.trim() !== "") {
      result = result.filter((idea) =>
        idea.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All Categories") {
      result = result.filter((idea) =>
        idea.category?.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredIdeas(result);
  }, [search, category, startDate, endDate, allIdeas]);

  return (
    <section className="min-h-screen py-16 px-4">
      <title>{`Ideas | IdeaVault`}</title>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-medium">
            Explore Ideas
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold bg-linear-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            Discover Startup Ideas
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse innovative startup ideas shared by creators from around the world.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ideas..."
              className="flex-1 px-5 py-3 rounded-2xl border border-yellow-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl outline-none focus:border-yellow-500"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-5 py-3 rounded-2xl border border-yellow-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl outline-none focus:border-yellow-500"
            >
              <option value="All Categories">All Categories</option>
              <option value="Tech">Tech</option>
              <option value="AI">AI</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Finance">Finance</option>
              <option value="E-commerce">E-commerce</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center">Loading ideas...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIdeas.length > 0 ? (
              filteredIdeas.map((idea) => (
                <IdeaCard key={idea._id} idea={idea} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No ideas found
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}