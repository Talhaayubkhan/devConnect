import { motion } from "framer-motion";
import ConnectionCard from "../components/ConnectionCards";
import { useFetchConnections } from "../hooks/useFetchConnections";

const Connections = () => {
  const { connectionData, loading } = useFetchConnections();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-start py-12 px-4">
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-white mb-10 text-center"
        whileHover={{ scale: 1.03, color: "#a5b4fc" }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        My Connections 🤝
      </motion.h2>

      <div className="w-full max-w-3xl flex flex-col items-center gap-8">
        {loading ? (
          <span className="loading loading-spinner loading-lg text-indigo-400 mt-20"></span>
        ) : connectionData && connectionData.length > 0 ? (
          connectionData.map((connection) => (
            <motion.div
              key={connection._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ConnectionCard connection={connection} />
            </motion.div>
          ))
        ) : (
          <p className="text-slate-400 text-lg text-center mt-16">
            No connections found yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Connections;
