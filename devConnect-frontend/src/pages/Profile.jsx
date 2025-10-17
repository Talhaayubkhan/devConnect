import EditProfile from "../components/EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store?.user);
  // console.log(user);

  return (
    user && (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex justify-center items-start py-10 px-6">
        {/* <div className="flex flex-col md:flex-row w-full max-w-6xl"> */}
        {/* Right: Edit Form */}
        <div className="flex-1 flex justify-center">
          <EditProfile user={user} />
        </div>
        {/* </div> */}
      </div>
    )
  );
};

export default Profile;
