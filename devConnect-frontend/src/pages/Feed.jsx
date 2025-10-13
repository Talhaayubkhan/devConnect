import UserCard from "../components/UserCard";
import { useFetchFeedData } from "../hooks/useFetchFeedData";

const Feed = () => {
  const { feed } = useFetchFeedData();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col justify-center items-center">
      <div className="w-full">
        {feed && feed.length > 0 ? (
          feed.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <p className="text-white text-3xl text-center mt-10">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Feed;
