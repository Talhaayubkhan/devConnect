import { motion } from "framer-motion";
import { Twitter, Youtube, Facebook, Code2, Github } from "lucide-react";
import { FooterLink } from "./common/FooterLink";
import { SocialIcon } from "./common/SocialIcon";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800 py-6 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        {/* Left Section — Branding */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <Code2 className="text-indigo-400" size={22} />
          <p>
            © {year}{" "}
            <span className="font-semibold text-white tracking-wide">
              DevConnect
            </span>
            . All rights reserved.
          </p>
        </motion.div>

        {/* Center Section — Legal Links */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-5 text-sm"
        >
          <FooterLink to="/privacy-policy" label="Privacy Policy" />
          <span className="text-gray-600">|</span>
          <FooterLink to="/terms-of-use" label="Terms of Use" />
        </motion.div>

        {/* Right Section — Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center gap-4"
        >
          <SocialIcon
            href="#"
            icon={<Twitter size={18} />}
            hover="text-sky-400"
          />
          <SocialIcon
            href="#"
            icon={<Youtube size={18} />}
            hover="text-red-500"
          />
          <SocialIcon
            href="#"
            icon={<Facebook size={18} />}
            hover="text-blue-500"
          />
          <SocialIcon href="#" icon={<Github size={18} />} hover="text-white" />
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
