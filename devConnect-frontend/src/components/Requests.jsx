import RequestCard from "./RequestCard";
import { useFetchRequests } from "../hooks/useFetchRequests";

const Requests = () => {
  const { requests } = useFetchRequests();

  return (
    <div className="p-6">
      <h2 className="text-5xl mb-7 text-center font-bold text-white hover:text-indigo-400 transition-colors cursor-pointer">
        Requests
      </h2>
      <div className="flex flex-col justify-center items-center gap-8">
        {requests && requests.length > 0 ? (
          requests.map((req) => <RequestCard key={req._id} request={req} />)
        ) : (
          <p className="text-slate-400">No new requests found.</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
