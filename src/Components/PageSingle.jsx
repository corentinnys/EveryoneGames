import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleCard = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/games/${id}?token&key=fd4fe01def1f461ab24d08167b2b29f5`)
      .then(res => {
        setGameData(res.data);
        console.log(res.data.platforms)
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <img src={gameData.background_image}/>
      {/* Utilisez les donnÃ©es de jeu ici */}
      <h1>Game Name: {gameData.name}</h1>
      <p>Release Date: {gameData.released}</p>
      {/* ... autres informations de jeu */}
        

      {gameData.description}
      <ul>
            <li>{gameData.playtime} hours</li>
        </ul>
        <h2>mes reseaux</h2>
        <ul>
            <li>
                <a href={gameData.reddit_url}>{gameData.reddit_name}</a>
              
            </li>
        </ul>

        <h2>disponible sur :</h2>
        <ul>
           
          </ul>
        
      <h2>Jeux similaires</h2>

    </div>
  );
};

export default SingleCard;
