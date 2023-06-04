import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../css/game.css";

export default function GamePage() {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);

  console.log(id);

  useEffect(() => {
    fetchGameDetails();
  }, []);

  const fetchGameDetails = async () => {
    try {
      const response = await fetch(`/api/games/${id}`);
      const data = await response.json();
      setGameData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching game details:", error);
    }
  };

  if (!gameData) {
    return <div>Loading...</div>;
  }

  const { title, description, developer, release_year, poster } = gameData;

  return (
    <div className="game-page">
      <h2 className="title" >{title}</h2>

      <div className="game-info">
        <div className="left-column">
          <img src={poster} alt="Game Image" />
          <div className="description">
            <h3>Game Description</h3>
            <p>{description}</p>
          </div>
        </div>

        <div className="highlighted-column">
          <h3>Game Details</h3>
          <ul>
            <li>Developer: {developer}</li>
            <li>Release Date: {release_year}</li>
          </ul>
          <button>Play Game</button>
        </div>

      </div>
    </div>
  );
}
