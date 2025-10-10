import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((store) => store.user.data);
  const { firstName, photoURL } = user;
  // console.log(user);

  if (!user) return;

  return (
    <div>
      {" "}
      <div className="navbar bg-neutral shadow-sm py-4">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DevConnect 🧑‍💻 </a>
        </div>
        <div className="flex gap-2 mx-3 justify-center items-center">
          <p className="text-md text-white">Welcome Here, {firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="talha-ayub" src={photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
