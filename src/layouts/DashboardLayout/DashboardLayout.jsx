/** @format */

import React, { useState } from "react"; // Ensure useState is imported
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import "./DashboardLayout.css";
const DashboardLayout = ({ children }) => {
  
  // Re-add state for sidebar collapse status
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Changed default to true

  // Re-add function to toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  return (
    // Add class based on the collapsed state
    <div
      className={`dashboard-layout ${
        isSidebarCollapsed ? "sidebar-collapsed" : "sidebar-open"
      }`}
    >
      {/* Pass state and toggle function to Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className='dashboard-main'>
        {/* Pass state and toggle function to Header */}
        <Header
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
        <main className='dashboard-content'>{children}</main>
        {/* Overlay for mobile when sidebar is open */}
        {!isSidebarCollapsed && (
          <div className='mobile-sidebar-overlay' onClick={toggleSidebar}></div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
