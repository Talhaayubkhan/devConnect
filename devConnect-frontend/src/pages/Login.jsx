import React, { useState } from "react";
import { HiMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaUser, FaUserEdit } from "react-icons/fa";
import { useFormik } from "formik";
import axios from "axios";
import { emailRegex, strongPasswordRegex } from "../constants/regex";
import { useDispatch } from "react-redux";
import { addUser } from "../redux-toolkit/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/config";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      // Common Validation
      if (!values.emailId) {
        errors.emailId = "Email is required!";
      } else if (!emailRegex.test(values.emailId)) {
        errors.emailId = "Invalid email address!";
      }

      if (!values.password) {
        errors.password = "Password is required!";
      } else if (!strongPasswordRegex.test(values.password)) {
        errors.password =
          "Password must include upper, lower, number & symbol!";
      }

      // Signup-only Validation
      if (!isLoginForm) {
        if (!values.firstName.trim()) errors.firstName = "First name required!";
        if (!values.lastName.trim()) errors.lastName = "Last name required!";
      }

      return errors;
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);

        const endpoint = isLoginForm ? "/login" : "/signup";
        const res = await axios.post(`${BASE_URL}${endpoint}`, values, {
          withCredentials: true,
        });

        toast.success(
          isLoginForm ? "Login successful!" : "Signup successful! Welcome 🎉",
          { autoClose: 2000 }
        );

        resetForm();

        if (isLoginForm) {
          dispatch(addUser(res?.data?.data));
          setTimeout(() => navigate("/feed"), 1500);
        } else {
          // formik.setFieldValue("emailId", values.emailId); // keep email for login
          setTimeout(() => setIsLoginForm(true), 1500);
        }
      } catch (error) {
        const status = error?.response?.status;

        if (status === 400)
          toast.warn(
            isLoginForm
              ? "Invalid credentials. Try again!"
              : "Email already registered!"
          );
        else if (status === 404)
          toast.info("No account found. Try signing up first!");
        else if (status === 500) toast.error("Server error. Please try later!");
        else toast.error("Something went wrong!");

        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="card bg-base-100/90 backdrop-blur-lg w-96 shadow-2xl border border-slate-700/40 rounded-2xl p-6">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center text-white">
          {isLoginForm ? "Welcome Back 👋" : "Create an Account 🚀"}
        </h2>
        <p className="text-center text-white/80 mb-3">
          {isLoginForm
            ? "Login to continue your journey"
            : "Join us and start your journey"}
        </p>

        {/* ✅ Formik Form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          {/* 👤 Signup-only fields */}
          {!isLoginForm && (
            <>
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <FaUser className="text-slate-400 text-md" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    className="grow focus:outline-none bg-transparent"
                  />
                </label>
                {formik.errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <FaUserEdit className="text-slate-400 text-lg" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    className="grow focus:outline-none bg-transparent"
                  />
                </label>
                {formik.errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>
            </>
          )}

          {/* ✉️ Email */}
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <HiMail className="text-slate-400 text-lg" />
              <input
                id="emailId"
                name="emailId"
                type="email"
                placeholder="mail@site.com"
                onChange={formik.handleChange}
                value={formik.values.emailId}
                className="grow focus:outline-none bg-transparent"
              />
            </label>
            {formik.errors.emailId && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.emailId}
              </p>
            )}
          </div>

          {/* 🔒 Password */}
          <div>
            <label className="input input-bordered flex items-center gap-2 relative">
              <MdLockOutline className="text-slate-400 text-lg" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="grow focus:outline-none bg-transparent pr-8"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </label>

            {formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

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
            {isLoading
              ? isLoginForm
                ? "Logging in..."
                : "Creating Account..."
              : isLoginForm
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        {/* 🔄 Toggle */}
        <div className="divider text-sm text-slate-400">or continue with</div>

        <p className="text-center text-sm text-slate-500">
          {isLoginForm
            ? "Don’t have an account? "
            : "Already have an account? "}
          <button
            onClick={() => setIsLoginForm((prev) => !prev)}
            className="text-indigo-500 hover:underline hover:text-indigo-600 cursor-pointer"
          >
            {isLoginForm ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
