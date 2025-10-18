import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-white to-rose-100 text-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="flex flex-col items-center space-y-4"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-white p-6 rounded-full shadow-lg"
        >
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 max-w-md">
          The page you’re looking for might have been moved, deleted, or never
          existed. But don’t worry — let’s get you back on track!
        </p>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/feed"
            className="mt-4 inline-block bg-red-500 text-white font-medium px-6 py-3 rounded-xl shadow-md hover:bg-red-600 transition-all duration-200"
          >
            Back to Feed
          </Link>
        </motion.div>
      </motion.div>

      <footer className="absolute bottom-6 text-gray-400 text-xs">
        © {new Date().getFullYear()} DevConnect. All rights reserved.
      </footer>
    </div>
  );
};

export default Error;
