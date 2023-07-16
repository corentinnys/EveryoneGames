import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Container,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import Genres from './Genres';

function CardItem()
{
  const [games,setGames] = useState([])



if(games.length == 0){
  var myHeaders = new Headers();

  var myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' };
  
  var myRequest = new Request('https://api.rawg.io/api/games?token&key=1caef2900c0e4f7fa226a7fe166c67dc',myInit);
  
  fetch(myRequest,myInit)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
   setGames(json.results)
  })
}


console.log(games)


return(
  <Container>
    <Row>
    <div class="card-group">
    {games.map((element, index) => (
      <Col xs={4} >
          <div class="card">
    <img class="card-img-top" src={element.background_image} alt="Card image cap"/>
    <div class="card-body">
      <h5 class="card-title">{element.name}</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <Genres key={index} element={element.genres}/>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  
  </Col>


))}
</div>
    </Row>
  </Container>
  )
  
  }
export default CardItem