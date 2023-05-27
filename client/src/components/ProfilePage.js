import React, { useContext }  from "react";
// import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

import '../css/profile.css'

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  
  return (
    <div className="profile-page">
      <div class="profile-container">
        <div class="profile-image">
          <img src="resources/img/profile-placeholder.webp" alt="Profile" />
        </div>
        <div class="profile-details">
          <h1>{user.email}</h1>
          <h2>About me</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <div class="games-container">
        <h2>My Games</h2>
        <ul>
          <li>
            <img src="https://via.placeholder.com/200x200" alt="Game 1" />
              <h3>Game 1</h3>
          </li>
          <li>
            <img src="https://via.placeholder.com/200x200" alt="Game 2" />
              <h3>Game 2</h3>
          </li>
          <li>
            <img src="https://via.placeholder.com/200x200" alt="Game 3" />
              <h3>Game 3</h3>
          </li>
          <li>
            <img src="https://via.placeholder.com/200x200" alt="Game 4" />
              <h3>Game 4</h3>
          </li>
          <li>
            <img src="https://via.placeholder.com/200x200" alt="Game 5" />
              <h3>Game 5</h3>
          </li>
          <li>
            <img src="https://via.placeholder.com/200x200" alt="Game 6" />
              <h3>Game 6</h3>
          </li>
        </ul>
      </div>

    </div>
  );
}