import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useFetchProfile } from "../hooks/useFetchProfile";
const MainLayout = () => {
  const { loading } = useFetchProfile();

  if (loading) return <div> Loading... </div>;

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
