import UserCard from "../components/UserCard";
import { useFetchFeedData } from "../hooks/useFetchFeedData";

const Feed = () => {
  const { feed, isLoadingConnections } = useFetchFeedData();

  if (!feed) return null;

  if (feed.length <= 0) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 text-center">
        <h1 className="text-4xl font-bold mt-45 text-red-500">
          No users found.
        </h1>
      </div>
    );
  }

  return isLoadingConnections ? (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900">
      <span className="loading loading-spinner loading-lg text-indigo-400 mt-30 "></span>
    </div>
  ) : (
    <div className="flex-grow bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="flex flex-col items-center gap-10">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
