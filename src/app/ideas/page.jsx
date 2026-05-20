import IdeaCard from "@/components/IdeaCard";

const getIdeas = async () => {
  const res = await fetch("http://localhost:5000/ideas/");
  return res.json();
}

export default async function IdeasPage() {
  const ideas = await getIdeas();

  return (
    <section className="min-h-screen py-16 px-4">
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

        
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          
          <input
            type="text"
            placeholder="Search ideas..."
            className="flex-1 px-5 py-3 rounded-2xl border border-yellow-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <select
            className="px-5 py-3 rounded-2xl border border-yellow-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option>All Categories</option>
            <option>Tech</option>
            <option>AI</option>
            <option>Health</option>
            <option>Education</option>
            <option>Finance</option>
            <option>E-commerce</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas.map((idea) => (
            <IdeaCard
              key={idea._id}
              idea={idea}
            />
          ))}
        </div>
      </div>
    </section>
  );
}