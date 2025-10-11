import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-50 text-center p-6">
      <div role="alert" className="alert alert-error shadow-lg max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-lg font-semibold">Error! Page Not Found</span>
      </div>

      <p className="mt-6 text-gray-600 text-sm">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/feed"
        className="mt-6 btn btn-error text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Error;
