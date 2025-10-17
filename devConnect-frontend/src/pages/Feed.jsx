import UserCard from "../components/UserCard";
import { useFetchFeedData } from "../hooks/useFetchFeedData";

const Feed = () => {
  const { feed } = useFetchFeedData();
  if (!feed) return;

  if (feed.length <= 0) {
    return (
      <div className="min-h-screen -mt-10 bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col justify-center items-center">
        <div className="w-full">
          <h1 className="text-5xl mb-8 text-center font-bold text-red-500 hover:text-indigo-400 transition-colors cursor-pointer">
            No users found.
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen -mt-10 bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col justify-center items-center">
      <div className="w-full">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
