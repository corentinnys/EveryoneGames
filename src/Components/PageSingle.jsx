import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Figure from 'react-bootstrap/Figure';
import { Col, Container, Row } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const SingleCard = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState({});
  const [screenShots, setScreenShots] = useState(null);
  const [gameSerie, setGameSerie] = useState([]);
  const [gameDevelopment, setGameDevelopment] = useState([]);
  const [gameMovie, setGameMovie] = useState([]);

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

    axios
      .get(`https://api.rawg.io/api/games/${id}/movies?key=fd4fe01def1f461ab24d08167b2b29f5`)
      .then(res => {
        setGameMovie(res.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <img src={gameData.background_image} alt="" />
      <h1>{gameData.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: gameData.description }} />
      <h2>Disponible sur</h2>
      <ListGroup>
        {gameData.platforms && gameData.platforms.length > 0 ? (
          gameData.platforms.map((element, index) => (
            <ListGroup.Item key={index}>{element.platform.name}</ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>Plateformes non disponibles</ListGroup.Item>
        )}
      </ListGroup>


      <ul>
        {gameSerie && gameSerie.length > 0 ? (
          gameSerie.map((element, index) => <li key={index}>{element.name}</li>)
        ) : (
          <li>pas de serie similaire</li>
        )}
      </ul>

      <h2>Team development</h2>

      <Container>
        <Row>
          {gameDevelopment.map((element, index) => (
            <Col key={index}>
              <Figure>
                <Figure.Image src={element.image} alt={element.name} />
                <Figure.Caption>{element.name}</Figure.Caption>

                <Link to={`/game/devloppers/${element.id}`}>
                  <a href='#'class='btn btn-primary'>voir le profils</a>
               </Link>
                
              </Figure>
            </Col>
          ))}
        </Row>
      </Container>

      <h2>Movies</h2>
      {gameMovie.map((element, index) => (
        <video key={index} controls width="250">
          <source src={element.data.max} />
        </video>
      ))}
       
      
    </>
  );
};

export default SingleCard;
