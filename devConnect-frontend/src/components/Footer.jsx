import { motion } from "framer-motion";
import { Twitter, Youtube, Facebook, Code2, Github } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-base-200/70 backdrop-blur-md border-t border-slate-700/30 shadow-inner text-slate-300 py-6 px-6 w-full mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <Code2 className="text-indigo-400" size={22} />
          <p className="text-sm">
            © {year}{" "}
            <span className="font-semibold text-white tracking-wide">
              DevConnect
            </span>
            . All rights reserved.
          </p>
        </motion.div>

        {/* Right Section (Social Links) */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-5 text-slate-400 text-xl"
        >
          <SocialIcon
            href="#"
            icon={<Twitter size={20} />}
            hover="text-sky-400"
          />
          <SocialIcon
            href="#"
            icon={<Youtube size={20} />}
            hover="text-red-500"
          />
          <SocialIcon
            href="#"
            icon={<Facebook size={20} />}
            hover="text-blue-500"
          />
          <SocialIcon href="#" icon={<Github size={20} />} hover="text-white" />
        </motion.div>
      </div>
    </footer>
  );
};

/* --- Reusable Social Icon Component --- */
const SocialIcon = ({ href, icon, hover }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.9 }}
    className={`transition-colors duration-200 hover:${hover}`}
  >
    {icon}
  </motion.a>
);

export default Footer;
