import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Container,Row,Col, Collapse} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './creatorSingle.css'
function CreatorSingle() {
  const [data, setData] = useState([]);
  const [game, setGame] = useState([]);
  const[gameData, setGameData] = useState([])
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/creators/${id}?key=fd4fe01def1f461ab24d08167b2b29f5`)
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`https://api.rawg.io/api/creators?key=fd4fe01def1f461ab24d08167b2b29f5`)
      .then(res => {
   
   //console.log(res.data.results[0].games)
   for ( const items of res.data.results )
   {
   
        if (items.id == id){
            setGame(items.games)
            let array = [];
            for (const gameID  of items.games)
            {
                axios
                .get('https://api.rawg.io/api/games/'+gameID.id+'?key=fd4fe01def1f461ab24d08167b2b29f5')
                .then(res => {
                   array.push(res.data)
                 })
                 .catch(error => {
                    console.log(error);
                  })
            }
            setGameData(array)
           
    
        }
   }
  
      })
      .catch(error => {
        console.log(error);
      });




  }, [id]);

console.log(gameData.slug)

  return (
    <Container>
        <Row>
            <Col sm={3}>
            <img src={data.image} alt={data.name} />
            </Col>
            <Col sm={9}>
            <h1>{data.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
            </Col >

      
     
    <h2>Jeux realiser</h2>
      {gameData.map((element,index)=>(
        <Col sm={2}>
        <Link to={`/game/${element.id}`}>
      <img src={element.background_image}/>  
     
        

</Link>
  
       </Col>
      ))}
      </Row>
    </Container>
  );
}

export default CreatorSingle;