import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Styles from "./Sidebar.module.css";

const Sidebar = () => {
  const userId = localStorage.getItem("userId");
  const [isActive, setIsActive] = useState(false); // State to manage sidebar visibility

  // Toggle sidebar visibility
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <button className={Styles.toggleButton} onClick={handleToggle}>
        {isActive ? "menu" : ""} {/* Switch between icons */}
      </button>
      
      <div className={`${Styles.sidebar} ${isActive ? Styles.active : ""}`}>
        
        <button className={Styles.toggleButton} onClick={handleToggle}>
          {isActive ? <button></button> : <button>X</button>} {/* Switch between icons */}
        </button>

        <NavLink
          to={`/home/scan/${userId}`}
          className={({ isActive }) => (isActive ? Styles.active : "")}
        >
          Scan
        </NavLink>
        <NavLink
          to={`/home/view-warranties`}
          className={({ isActive }) => (isActive ? Styles.active : "")}
        >
          View Warranties
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
