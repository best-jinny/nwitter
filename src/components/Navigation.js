import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">{userObj.displayName} Profile </Link>
        <img
          src={userObj.photoURL}
          width="50px"
          height="50px"
          alt="profileImg"
        />
      </li>
    </ul>
  </nav>
);

export default Navigation;
