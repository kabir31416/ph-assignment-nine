"use client";
import { useState } from "react";

export default function AddIdeaPage() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    detailedDescription: "",
    category: "",
    tags: "",
    imageUrl: "",
    budget: "",
    targetAudience: "",
    problemStatement: "",
    proposedSolution: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Idea submitted successfully!");
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 border border-yellow-100 dark:border-gray-800">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-linear-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            Submit Your Startup Idea
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Share your innovative idea with the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Idea Title */}
          <div>
            <label className="block mb-2 font-medium">
              Idea Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
              placeholder="Enter idea title"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block mb-2 font-medium">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              required
              rows={3}
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
              placeholder="Brief overview"
            />
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block mb-2 font-medium">
              Detailed Description
            </label>
            <textarea
              name="detailedDescription"
              required
              rows={5}
              value={formData.detailedDescription}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
              placeholder="Explain your idea in detail"
            />
          </div>

          {/* Category + Tags */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">
                Category
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
              >
                <option value="">Select Category</option>
                <option>Tech</option>
                <option>Health</option>
                <option>AI</option>
                <option>Education</option>
                <option>Finance</option>
                <option>E-commerce</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Tags (Optional)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="AI, Startup, SaaS"
                className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Image + Budget */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Estimated Budget (Optional)
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="$5000"
                className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block mb-2 font-medium">
              Target Audience
            </label>
            <input
              type="text"
              name="targetAudience"
              required
              value={formData.targetAudience}
              onChange={handleChange}
              placeholder="Who will use this?"
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
            />
          </div>

          {/* Problem Statement */}
          <div>
            <label className="block mb-2 font-medium">
              Problem Statement
            </label>
            <textarea
              name="problemStatement"
              required
              rows={4}
              value={formData.problemStatement}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
              placeholder="What problem does it solve?"
            />
          </div>

          {/* Proposed Solution */}
          <div>
            <label className="block mb-2 font-medium">
              Proposed Solution
            </label>
            <textarea
              name="proposedSolution"
              required
              rows={4}
              value={formData.proposedSolution}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800"
              placeholder="How will it solve the problem?"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-linear-to-r from-yellow-500 to-orange-500 text-white font-semibold hover:scale-[1.02] transition"
          >
            Submit Idea
          </button>
        </form>
      </div>
    </div>
  );
}