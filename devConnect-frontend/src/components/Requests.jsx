import RequestCard from "./RequestCard";
import { useFetchRequests } from "../hooks/useFetchRequests";
import { useReviewRequest } from "../hooks/useReviewRequests";

const Requests = () => {
  const { requests } = useFetchRequests();
  const { loadingRequestId, reviewRequest } = useReviewRequest();

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-slate-800 to-slate-900">
      <h2 className="text-5xl mb-8 text-center font-bold text-white hover:text-indigo-400 transition-colors cursor-pointer">
        Requests
      </h2>
      <div className="flex flex-col justify-center items-center gap-8">
        {requests && requests.length > 0 ? (
          requests.map((req) => (
            <RequestCard
              key={req._id}
              request={req}
              onReview={reviewRequest}
              loading={loadingRequestId === req._id}
            />
          ))
        ) : (
          <p className="text-slate-400">No new requests found.</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
