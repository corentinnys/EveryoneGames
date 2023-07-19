import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Figure from 'react-bootstrap/Figure';
// Importez la fonction 'request' depuis le fichier approprié.
import { request } from './request';
import CardItem from './CardItem';

const SingleCard = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState({});
  const [screenShots, setScreenShots] = useState(null);
  const [gameSerie, setGameSerie] = useState([]);
  const [gameDevelopment, setGameDevelopment] = useState([]);

  useEffect(() => {
    axios
    .get(`https://api.rawg.io/api/games/${id}?key=fd4fe01def1f461ab24d08167b2b29f5`)
    .then(res => {
      setGameData(res.data); // Update this line
    })
    .catch(error => {
      console.log(error);
    });
    

      axios
        .get(`https://api.rawg.io/api/games/${id}/screenshots?key=fd4fe01def1f461ab24d08167b2b29f5`)
        .then(res => {
          setScreenShots(res.data.results);
        })
        .catch(error => {
          console.log(error);
        });

      axios
        .get(`https://api.rawg.io/api/games/${id}/game-series?key=fd4fe01def1f461ab24d08167b2b29f5`)
        .then(res => {
          setGameSerie(res.data.results);
        })
        .catch(error => {
          console.log(error);
        });

      axios
        .get(`https://api.rawg.io/api/games/${id}/development-team?key=fd4fe01def1f461ab24d08167b2b29f5`)
        .then(res => {
          setGameDevelopment(res.data.results);
        })
        .catch(error => {
          console.log(error);
        });
   


  }, [id]);



  return (
    <div>
      <img src={gameData.background_image} alt="" />
      <h1>{gameData.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: gameData.description }} />
      <h2>Disponible sur</h2>
      <ul>
        {gameData.platforms && gameData.platforms.length > 0 ? (
          gameData.platforms.map((element, index) => (
            <li key={index}>{element.platform.name}</li>
          ))
        ) : (
          <li>Plateformes non disponibles</li>
        )}
      </ul>
      <h2>Meme series</h2>
      <ul>
    
       {gameSerie.map((element,index)=>(
        <li key={index}>{element.name}</li>
       ))}
      </ul>
      <ul>
    
    {gameDevelopment.map((element,index)=>(
     <li key={index}>{element.name}</li>
    ))}
   </ul>
 
    </div>
  );
};

export default SingleCard;
