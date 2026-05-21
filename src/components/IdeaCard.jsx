import Link from "next/link";
import { ArrowRight, Tag, Wallet, User } from "lucide-react";
import Image from "next/image";

export default function IdeaCard({ idea }) {
  const {
    _id,
    title,
    shortDescription,
    category,
    imageUrl,
    budget,
    username,
    userImage,
  } = idea;

  return (
    <div className="group bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={224}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
        />

        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-yellow-500 text-white text-xs font-medium shadow">
          {category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
          {title}
        </h3>

        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
          {shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-yellow-600" />
            <span>{category}</span>
          </div>

          <div className="flex items-center gap-2">
            <Wallet size={16} className="text-yellow-600" />
            <span>${budget}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Image
            src={userImage || "https://i.pravatar.cc/150"}
            alt={username || "Anonymous"}
            width={20}
            height={20}
            className="w-7 h-7 rounded-full object-cover"
          />

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span>{username || "Anonymous"}</span>
          </div>
        </div>

        <Link
          href={`/ideas/${_id}`}
          className="mt-6 inline-flex items-center gap-2 text-yellow-600 font-semibold hover:gap-3 transition"
        >
          View Details
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}