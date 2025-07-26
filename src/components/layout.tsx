import Header from "./header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white !text-white"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div>
        <Header />

        <main className="flex-grow">
          <div className="backdrop-blur-sm bg-black/50 min-h-screen flex items-center justify-center">
            <Outlet />
          </div>
        </main>
        <footer className="backdrop-blur-sm bg-transparent border-t border-border py-6 text-center text-white !text-white ">
          <p>© 2025 Quiz App</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
