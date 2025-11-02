import { motion } from "framer-motion";

export const SocialIcon = ({ href, icon, hover }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.9 }}
    className={`transition-colors duration-200 hover:${hover}`}
  >
    {icon}
  </motion.a>
);
