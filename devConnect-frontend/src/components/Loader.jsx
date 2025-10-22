import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-white to-rose-100">
      {/* Spinning Icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="mb-3"
      >
        <Loader2 className="w-10 h-10 text-rose-500" strokeWidth={2.5} />
      </motion.div>

      {/* Subtle Text Animation */}
      <motion.p
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-sm text-gray-600 tracking-wide font-medium"
      >
        Loading DevConnect...
      </motion.p>
    </div>
  );
}
