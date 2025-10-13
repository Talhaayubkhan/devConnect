import UserCard from "../components/UserCard";
import { useFetchFeedData } from "../hooks/useFetchFeedData";

const Feed = () => {
  const { feed } = useFetchFeedData();
  return (
    feed && (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col justify-center items-center">
        <div className="w-full">
          <UserCard user={feed[0]} />
        </div>
      </div>
    )
  );
};

export default Feed;
