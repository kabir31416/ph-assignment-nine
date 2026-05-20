import Link from "next/link";
import {ArrowLeft, Tag, Wallet, Users, CircleAlert, Lightbulb,
} from "lucide-react";
import Image from "next/image";

const getIdeas = async () => {
    const res = await fetch("http://localhost:5000/ideas/");
    return res.json();
}

export default async function IdeaDetailsPage({ params }) {
    const ideas = await getIdeas();
    const idea = ideas.find((i) => i.id === params.id);

    return (
        <section className="min-h-screen py-2 px-4">
            <div className="max-w-5xl mx-auto">

                <Link
                    href="/ideas"
                    className="inline-flex items-center gap-2 text-yellow-600 font-medium mb-3 hover:gap-3 transition"
                >
                    <ArrowLeft size={18} />
                    Back to Ideas
                </Link>

                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-800 shadow-xl overflow-hidden">
                    <Image
                        src={idea.imageUrl}
                        alt={idea.title}
                        width={1200}
                        height={500}
                        className="w-full h-87.5 object-cover"
                    />
                    <div className="p-8">
                        <span className="inline-block px-4 py-1 rounded-full bg-yellow-500 text-white text-sm font-medium">
                            {idea.category}
                        </span>
                        <h1 className="mt-4 text-4xl font-bold text-gray-800 dark:text-white">
                            {idea.title}
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            {idea.shortDescription}
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="flex items-center gap-3">
                                <Wallet className="text-yellow-600" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Estimated Budget
                                    </p>
                                    <p className="font-semibold">
                                        ${idea.budget}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Users className="text-yellow-600" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Target Audience
                                    </p>
                                    <p className="font-semibold">
                                        {idea.targetAudience}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Tag className="text-yellow-600" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Tags
                                    </p>
                                    <p className="font-semibold">
                                        {idea.tags}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-2xl font-semibold flex items-center gap-2">
                                <Lightbulb className="text-yellow-600" />
                                Detailed Description
                            </h2>
                            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                                {idea.detailedDescription}
                            </p>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold flex items-center gap-2">
                                <CircleAlert className="text-yellow-600" />
                                Problem Statement
                            </h2>

                            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                                {idea.problemStatement}
                            </p>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold flex items-center gap-2">
                                <Lightbulb className="text-yellow-600" />
                                Proposed Solution
                            </h2>

                            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                                {idea.proposedSolution}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}