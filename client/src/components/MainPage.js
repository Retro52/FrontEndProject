import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css';

export default function MainPage() {
  const [randomGames, setRandomGames] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRandomGames();
  }, []);

  const fetchRandomGames = async () => {
    try {
      const response = await fetch('/api/games/random/5');
      const data = await response.json();
      setRandomGames(data);
    } catch (error) {
      console.error('Error fetching random games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || randomGames === null) {
    console.log("IS loading");
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      <section id="games">
        <div className="games-container">
          <h2>Welcome to DevHub</h2>
          <p>
            DevHub is a community-driven platform for developers, where you can showcase your projects, collaborate with others,
            and explore a wide range of innovative solutions. Whether you are a seasoned developer or just starting your coding
            journey, DevHub provides a space to learn, connect, and grow together.
          </p>
          <div className="game-links">
            <h3>Explore Random Projects:</h3>
            {randomGames.map((game) => (
              <div key={game.id} className="randomGameItem">
                <Link to={`/game/${game.id}`}>
                  <img src={game.poster_link} alt={game.title} />
                </Link>
                <div className="textSection">
                  <Link to={`/game/${game.id}`}>
                    <h3>{game.title}</h3>
                  </Link>
                  <p>{game.description && game.description.length > 100 ? `${game.description.substring(0, 100)}...` : game.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="upload-link">
            <h3>Share Your Project:</h3>
            <p>
              Showcase your coding skills and contribute to the developer community. Upload your project now and get valuable
              feedback from fellow developers.
            </p>
            <Link to="/add_game">Upload Project</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
