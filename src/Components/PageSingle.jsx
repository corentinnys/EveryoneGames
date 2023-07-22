import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Figure from 'react-bootstrap/Figure';
import { Col, Container, Row } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const SingleCard = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState({});
  const [screenShots, setScreenShots] = useState(null);
  const [gameSerie, setGameSerie] = useState([]);
  const [gameDevelopment, setGameDevelopment] = useState([]);
  const [gameMovie, setGameMovie] = useState([]);
  const [plateformes ,SetPlateformes] = useState([])


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
        console.log('Screenshots API Response:', res.data);
        setScreenShots(res.data.results);
      })
      .catch(error => {
        console.log('Screenshots API Error:', error);
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



      axios.get('https://api.rawg.io/api/platforms?token&key=fd4fe01def1f461ab24d08167b2b29f5')
      .then(res => {
        SetPlateformes(res.data.results)
      })




  }, [id]);

  return (
    <Container>
      <Row>
        <Col>
        <img src={gameData.background_image} alt="" />
        </Col>
        <Col>
        <h1>{gameData.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: gameData.description }} />
        </Col>
      </Row>

     

      <h2>Disponible sur</h2>
      <Row>
        <Col >
        <ListGroup horizontal>
        {gameData.platforms && gameData.platforms.length > 0 ? (
          gameData.platforms.map((element, index) => (
            <ListGroup.Item key={index}>{element.platform.name}</ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>Plateformes non disponibles</ListGroup.Item>
        )}
      </ListGroup>

        </Col>
      </Row>
      <Row>
      {screenShots !== null ? (
  screenShots.map((element, index) => (
    <Col key={index}>
      <img src={element.image} alt={`Screenshot ${index + 1}`} />
    </Col>
  ))
) : (
  <p>Loading screenshots...</p>
)}
    
</Row>
      

      

      <ul>
        {gameSerie && gameSerie.length > 0 ? (
          gameSerie.map((element, index) => <li key={index}>{element.name}</li>)
        ) : (
          <li>pas de serie similaire</li>
        )}
      </ul>

      <h2>Team development</h2>

     

      <h2>Movies</h2>
      {gameMovie.map((element, index) => (
        <video key={index} controls width="250">
          <source src={element.data.max} />
        </video>
      ))}
       
      
    </Container>
  );
};

export default SingleCard;
