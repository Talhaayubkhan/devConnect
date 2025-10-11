import { FaTwitter, FaYoutube, FaFacebook, FaCode } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200/80 backdrop-blur-md border-t border-slate-700/30 shadow-md text-slate-300 py-4 px-6 fixed bottom-0 w-full">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <FaCode className="text-indigo-400 text-xl" />
          <p className="text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">DevConnect</span>. All
            rights reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5 text-slate-400 text-xl">
          <a
            href="#"
            className="hover:text-indigo-400 transition-colors hover:scale-110 duration-200"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="hover:text-red-500 transition-colors hover:scale-110 duration-200"
          >
            <FaYoutube />
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition-colors hover:scale-110 duration-200"
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
