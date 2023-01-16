import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

export const Menu = () => {
  return (
    <div className="main-menu-wrapper">
      <div className="main-menu-btns-container">
        <Link to="/offline-game">
          <button className="main-menu-btn">Play Offline</button>
        </Link>
        <Link to="/online-game">
          <button className="main-menu-btn">Play Online</button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
