
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-linear-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-black">
      <div className="text-center max-w-xl">
        
        
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-yellow-100 dark:bg-gray-800 shadow-lg">
            <AlertTriangle
              size={60}
              className="text-yellow-600"
            />
          </div>
        </div>

    
        <h1 className="text-7xl md:text-8xl font-bold bg-linear-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
          404
        </h1>

        
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Sorry, the page you’re looking for doesn’t exist or may have been moved.
        </p>

    
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-linear-to-r from-yellow-500 to-orange-500 text-white font-medium shadow-lg hover:scale-105 transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}