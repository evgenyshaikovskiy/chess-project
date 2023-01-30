import React from "react";
import { Link } from "react-router-dom";
import "./home.styles.scss";

function Home() {
  return (
    <div className="menu-wrapper">
      <div className="links-wrapper">
        <div className="link-wrapper">
          <Link to="/chess?type=classic">Classic Chess</Link>
        </div>
        <div className="link-wrapper">
          <Link to="/chess?type=custom">Custom Chess</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
