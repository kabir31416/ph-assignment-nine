"use client";

import { authClient } from "@/app/lib/auth-client";
import { useState, useEffect } from "react";
import { User, Mail, ImageIcon, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name,
        image,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  if (isPending) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p>Please login first.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-8">
        
        <div className="text-center mb-8">
          <Image
            src={
              image ||
              "https://i.pravatar.cc/150"
            }
            width={96}
            height={96}
            alt="profile"
            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-yellow-400"
          />

          <h1 className="mt-4 text-3xl font-bold bg-linear-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            Profile Settings
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your account information
          </p>
        </div>

        <form
          onSubmit={handleUpdate}
          className="space-y-5"
        >
          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Your Name"
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-yellow-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full pl-11 pr-4 py-3 rounded-2xl border bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            />
          </div>

          <div className="relative">
            <ImageIcon
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
              placeholder="Photo URL"
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-yellow-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-linear-to-r from-yellow-500 to-orange-500 text-white font-semibold hover:opacity-90 transition"
          >
            <Save size={18} />
            {loading
              ? "Updating..."
              : "Save Changes"}
          </button>
        </form>
      </div>
    </section>
  );
}