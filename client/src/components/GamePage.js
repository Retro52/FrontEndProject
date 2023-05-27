import React from "react";
import { useParams } from 'react-router-dom';

import '../css/game.css'

export default function GamePage() {
  const { id } = useParams();


  return (
    <div className="game-page">
      <div class="game-info">
        <h2>Very well game: {id} </h2>

        <div class="game-data">
          <img src="../../resources/img/placeholder_1.jpg" alt="Game Image" />

          <div class="descrittion">
            <h3>Game Description</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor dignissim massa, eu sagittis nisl tristique ac. Ut bibendum congue diam, id hendrerit nisi.</p>
            <h3>Game Details</h3>
            <ul>
              <li>Developer: John Smith</li>
              <li>Genre: Action</li>
              <li>Platform: PC</li>
              <li>Release Date: January 1, 2023</li>
            </ul>
            <button>Play Game</button>
          </div>
        </div>
      </div>
    </div>
  );
}