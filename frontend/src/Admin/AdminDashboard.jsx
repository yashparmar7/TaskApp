import Navbar from "../components/Navbar";
import Sidebar from "./components/Sidebar";
import Cards from "./components/Cards";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-64 h-screen sticky top-0 bg-white shadow">
          <Sidebar />
        </aside>

        <main className="flex-1 bg-gray-100">
          <Cards />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
