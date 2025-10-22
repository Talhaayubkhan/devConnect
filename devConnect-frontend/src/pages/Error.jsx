import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-white to-rose-100 text-center p-6 relative">
      {/* Animated Error Icon & Heading */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="flex flex-col items-center space-y-6"
      >
        {/* Bouncing Alert Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="bg-white p-6 rounded-full shadow-xl border border-red-200"
        >
          <AlertTriangle className="w-14 h-14 text-red-500" />
        </motion.div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 drop-shadow-md">
          Oops! Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-600 max-w-md text-sm sm:text-base">
          The page you’re looking for might have been moved, deleted, or never
          existed. Don’t worry — let’s get you back on track!
        </p>

        {/* Back Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2"
        >
          <Link
            to="/feed"
            className="inline-block bg-red-500 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:bg-red-600 transition-all duration-200"
          >
            Back to Feed
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-gray-400 text-xs sm:text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">DevConnect</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default Error;
