import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, UserPlus, Loader2 } from "lucide-react";
import { useFormik } from "formik";
import { emailRegex, strongPasswordRegex } from "../constants/regex";
import { useDispatch } from "react-redux";
import { addUser } from "../redux-toolkit/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InputField } from "../components/common/InputField";
import api from "../api/axios";

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
        const res = await api.post(endpoint, values);

        toast.success(
          isLoginForm ? "Login successful!" : "Signup successful! Welcome 🎉"
        );

        resetForm();

        if (isLoginForm) {
          dispatch(addUser(res?.data?.data));
          localStorage.setItem("user", JSON.stringify(res?.data?.data));
          setTimeout(() => navigate("/feed"), 1500);
        } else {
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
        else toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="card bg-base-100/90 backdrop-blur-lg w-[22rem] sm:w-96 shadow-2xl border border-slate-700/40 rounded-2xl p-6"
    >
      <motion.div
        key={isLoginForm ? "login" : "signup"}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="card-body"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-white flex items-center justify-center gap-2">
          {isLoginForm ? "Welcome Back" : "Create an Account"}
          {isLoginForm ? (
            <User className="text-indigo-400" />
          ) : (
            <UserPlus className="text-indigo-400" />
          )}
        </h2>
        <p className="text-center text-white/70 mb-3 text-sm">
          {isLoginForm
            ? "Login to continue your journey"
            : "Join us and start building connections"}
        </p>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 mt-3"
        >
          {!isLoginForm && (
            <>
              <InputField
                id="firstName"
                name="firstName"
                placeholder="First Name"
                icon={<User className="text-slate-400" size={18} />}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.errors.firstName}
              />

              <InputField
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                icon={<UserPlus className="text-slate-400" size={18} />}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.errors.lastName}
              />
            </>
          )}

          <InputField
            id="emailId"
            name="emailId"
            type="email"
            placeholder="mail@site.com"
            icon={<Mail className="text-slate-400" size={18} />}
            value={formik.values.emailId}
            onChange={formik.handleChange}
            error={formik.errors.emailId}
          />

          {/* Password Field */}
          <div>
            <label className="input input-bordered flex items-center gap-2 relative">
              <Lock className="text-slate-400" size={18} />
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
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </label>
            {formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.95 }}
            className={`btn btn-primary  w-full text-lg font-semibold border-none transition-all duration-200 ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2 ">
                <Loader2 className="animate-spin" size={20} />
                {isLoginForm ? "Logging in..." : "Creating..."}
              </span>
            ) : isLoginForm ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>

        {/* Switch Form */}
        <div className="divider text-sm text-slate-400">or continue with</div>

        <p className="text-center text-sm text-slate-500">
          {isLoginForm
            ? "Don’t have an account? "
            : "Already have an account? "}
          <button
            onClick={() => setIsLoginForm((prev) => !prev)}
            className="text-indigo-400 hover:text-indigo-500 hover:underline font-medium cursor-pointer"
          >
            {isLoginForm ? "Sign up" : "Login"}
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AuthForm;
