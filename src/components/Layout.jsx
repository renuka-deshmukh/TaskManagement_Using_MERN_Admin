import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="d-flex">
      <Sidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />

      <div className="flex-grow-1">
        {/* MUST pass toggleSidebar prop */}
        <Navbar toggleSidebar={() => setIsOpen(true)} />

        <div className="container-fluid mt-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
