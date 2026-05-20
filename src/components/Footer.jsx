import { LogoFacebook, LogoGithub, LogoLinkedin } from "@gravity-ui/icons";
import { Lightbulb, Mail } from "lucide-react";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="mt-16 border-t border-yellow-200 dark:border-gray-800 bg-linear-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-black">
      
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="text-yellow-600" size={28} />
            <h2 className="text-2xl font-bold bg-linear-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              IdeaVault
            </h2>
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Discover, share, and collaborate on startup ideas.
            Turn inspiration into innovation with IdeaVault.
          </p>
        </div>

        
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">
            Platform
          </h3>

          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li>
              <Link href="/ideas" className="hover:text-yellow-600 transition">
                Browse Ideas
              </Link>
            </li>

            <li>
              <Link
                href="/categories"
                className="hover:text-yellow-600 transition"
              >
                Categories
              </Link>
            </li>

            <li>
              <Link
                href="/add-idea"
                className="hover:text-yellow-600 transition"
              >
                Add Idea
              </Link>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">
            Contact
          </h3>

          <div className="space-y-3 text-gray-600 dark:text-gray-300">
            <p>support@ideavault.com</p>
            <p>+880 1234 567890</p>
            <p>Dhaka, Bangladesh</p>
          </div>
        </div>

        
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">
            Connect
          </h3>

          <div className="flex gap-4">
            <a
              href="#"
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow hover:scale-110 transition"
            >
              <LogoFacebook size={18} />
            </a>

            <a
              href="#"
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow hover:scale-110 transition"
            >
              <LogoGithub size={18} />
            </a>

            <a
              href="#"
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow hover:scale-110 transition"
            >
              <LogoLinkedin size={18} />
            </a>

            <a
              href="#"
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow hover:scale-110 transition"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      
      <div className="border-t border-yellow-200 dark:border-gray-800 py-5 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} IdeaVault. All rights reserved.
      </div>
    </footer>
  );
}