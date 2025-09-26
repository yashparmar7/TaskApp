import Navbar from "../components/Navbar";
import Sidebar from "./components/Sidebar";
import Cards from "./components/Cards";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 bg-gray-100">
          <Cards />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
