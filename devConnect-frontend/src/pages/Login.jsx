// import React from "react";
// import { HiMail } from "react-icons/hi";
// import { MdLockOutline } from "react-icons/md";
// import { useFormik } from "formik";
// import axios from "axios";

// const Login = () => {
//   const [isEmail, setIsEmail] = React.useState("talha@gmail.com");
//   const [isPassword, setIsPassword] = React.useState("Talha@2003");
//   const [isLoading, setIsLoading] = React.useState(false);

//   const isHandleLogin = async () => {
//     try {
//       setIsLoading(true);
//       const res = await axios.post(
//         "http://localhost:4000/login",
//         {
//           emailId: isEmail,
//           password: isPassword,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       console.log(res);
//     } catch (error) {
//       console.error("Error ", error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       isEmail,
//       isPassword,
//     },
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });

//   return (
//     <div>
//       <div className="card bg-base-100/90 backdrop-blur-lg w-96 shadow-2xl border border-slate-700/40 rounded-2xl p-3">
//         <div className="card-body">
//           {/* Title */}
//           <h2 className="text-3xl font-bold text-center text-white">
//             Welcome Back 👋
//           </h2>
//           <p className="text-center text-white mb-3">
//             Login to continue your journey
//           </p>
//           {/* Form */}
//           {/* <form
//             className="flex flex-col gap-5"
//             onSubmit={(e) => e.preventDefault()}
//           >
//             <label className="input input-bordered flex items-center gap-2">
//               <HiMail className="text-slate-400 text-lg" />
//               <input
//                 type="email"
//                 placeholder="mail@site.com"
//                 required
//                 value={isEmail}
//                 onChange={(e) => setIsEmail(e.target.value)}
//                 className="grow focus:outline-none bg-transparent"
//               />
//             </label>

//             <label className="input input-bordered flex items-center gap-2">
//               <MdLockOutline className="text-slate-400 text-lg" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 value={isPassword}
//                 onChange={(e) => setIsPassword(e.target.value)}
//                 className="grow focus:outline-none bg-transparent"
//               />
//             </label>

//             <div className="text-right">
//               <a
//                 href="#"
//                 className="text-sm text-indigo-500 hover:underline hover:text-indigo-600"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             <div>
//               <button
//                 type="button"
//                 disabled={isLoading}
//                 className={`btn btn-primary w-full text-lg font-semibold transition-all duration-200 ${
//                   isLoading
//                     ? "opacity-70 cursor-not-allowed"
//                     : "bg-indigo-600 hover:bg-indigo-700 border-none"
//                 }`}
//                 onClick={isHandleLogin}
//               >
//                 {isLoading ? "Loggin in..." : "Login"}{" "}
//               </button>
//             </div>
//           </form> */}
//           return (
//           <form onSubmit={formik.handleSubmit}>
//             <label className="input input-bordered flex items-center gap-2">
//               <HiMail className="text-slate-400 text-lg" />
//               <input
//                 type="email"
//                 placeholder="mail@site.com"
//                 required
//                 value={isEmail}
//                 onChange={(e) => setIsEmail(e.target.value)}
//                 className="grow focus:outline-none bg-transparent"
//               />
//             </label>
//           </form>
//           )
//           <div className="divider text-sm text-slate-400">or continue with</div>
//           <p className="text-center text-sm text-slate-500">
//             Don’t have an account?{" "}
//             <a
//               href="#"
//               className="text-indigo-500 hover:underline hover:text-indigo-600"
//             >
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import { HiMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { useFormik } from "formik";
import axios from "axios";
import { emailRegex, strongPasswordRegex } from "../constants/regex";
import { useDispatch } from "react-redux";
import { addUser } from "../redux-toolkit/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/config";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      emailId: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.emailId) {
        errors.emailId = "Email is required!";
      } else if (!emailRegex.test(values.emailId)) {
        errors.emailId = "Invalid email address!";
      }

      if (!values.password) {
        errors.password = "Password is required!";
      } else if (!strongPasswordRegex.test(values.password)) {
        errors.password = "Password must be Strong";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const res = await axios.post(`${BASE_URL}/login`, values, {
          withCredentials: true,
        });
        // console.log(res.data);

        // If login successful:
        dispatch(addUser(res.data.data));
        toast.success("Login successful!", { autoClose: 2000 });

        // Small delay before navigating (so user sees toast)
        setTimeout(() => navigate("/feed"), 1500);
      } catch (error) {
        if (error?.response?.status == 401) {
          toast.error("Invalid credentials");
        } else if (error?.response?.status == 404) {
          toast.info("No account found, please sign up");
        } else if (error?.response?.status === 500) {
          toast.error("Server error, please try again later");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <div className="card bg-base-100/90 backdrop-blur-lg w-96 shadow-2xl border border-slate-700/40 rounded-2xl p-3">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-white">
            Welcome Back 👋
          </h2>
          <p className="text-center text-white mb-3">
            Login to continue your journey
          </p>

          {/* ✅ Formik Form */}
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <label className="input input-bordered flex items-center gap-2">
              <HiMail className="text-slate-400 text-lg" />
              <input
                id="emailId"
                name="emailId"
                type="email"
                placeholder="mail@site.com"
                required
                onChange={formik.handleChange}
                value={formik.values.emailId}
                className="grow focus:outline-none bg-transparent"
              />
              {formik.errors.emailId && (
                <div className="text-red-500 text-sm">
                  {formik.errors.emailId}
                </div>
              )}
            </label>

            {/* Password */}
            <label className="input input-bordered flex items-center gap-2">
              <MdLockOutline className="text-slate-400 text-lg" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={formik.handleChange}
                value={formik.values.password}
                className="grow focus:outline-none bg-transparent"
              />
              {formik.errors.password && (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`btn btn-primary w-full text-lg font-semibold transition-all duration-200 ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 border-none"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider text-sm text-slate-400">or continue with</div>

          <p className="text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <a
              href="#"
              className="text-indigo-500 hover:underline hover:text-indigo-600"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
