import RequestCard from "../components/RequestCard";
import { useFetchRequests } from "../hooks/useFetchRequests";
import { useReviewRequest } from "../hooks/useReviewRequests";
import { motion } from "framer-motion";

const Requests = () => {
  const { requests, loading } = useFetchRequests();
  const { loadingRequestId, reviewRequest } = useReviewRequest();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-start py-12 px-4">
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-white mb-10 text-center"
        whileHover={{ scale: 1.03, color: "#a5b4fc" }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Connection Requests
      </motion.h2>

      <div className="w-full max-w-3xl flex flex-col items-center gap-8">
        {loading ? (
          <span className="loading loading-spinner loading-lg text-indigo-400 mt-20"></span>
        ) : requests && requests.length > 0 ? (
          requests.map((req) => (
            <motion.div
              key={req._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <RequestCard
                request={req}
                onReview={reviewRequest}
                loading={loadingRequestId === req._id}
              />
            </motion.div>
          ))
        ) : (
          <p className="text-slate-400 text-lg text-center mt-16">
            No new requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Requests;
