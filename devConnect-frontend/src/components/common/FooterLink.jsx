import { Link } from "react-router-dom";

export const FooterLink = ({ to, label }) => (
  <Link
    to={to}
    className="hover:text-indigo-400 transition-colors duration-200"
  >
    {label}
  </Link>
);
