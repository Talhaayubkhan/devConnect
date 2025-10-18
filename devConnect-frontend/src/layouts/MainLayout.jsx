import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useFetchProfile } from "../hooks/useFetchProfile";
const MainLayout = () => {
  useFetchProfile();

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Feed or other content */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
