import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Container,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import Genres from './Genres';
import PlateformItem from './PlateformItem';
import './index.css'


function CardItem(props)
{
  const [games,setGames] = useState([])
  let filtre = props.filtre;

  let request = ''
  if (filtre == undefined){
    request = 'https://api.rawg.io/api/games?token&key=f0bd0222c07f4b3d850d79e7cc7c68b1'
  }else{
     request ="https://api.rawg.io/api/games?token&key=f0bd0222c07f4b3d850d79e7cc7c68b1&genres="+filtre
  }
  useEffect(()=>{
   console.log(request)
      axios.get(request)
      .then(res => {
        console.log('passe')
      setGames(res.data.results)
      })
  },[filtre])


/*
if(games.length == 0){
  let myHeaders = new Headers();

  let myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' };

  
  
     let myRequest = new Request('https://api.rawg.io/api/games?token&key=f0bd0222c07f4b3d850d79e7cc7c68b1',myInit);
  

   

  fetch(myRequest,myInit)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    setGames(json.results)
  })
}*/

/*
if(props.filtreGenre !=undefined)
{
  let myHeaders = new Headers();

  let myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' };

  let myRequest = new Request('https://api.rawg.io/api/games?token&key=f0bd0222c07f4b3d850d79e7cc7c68b1&genres='+props.filtreGenre,myInit);
  fetch(myRequest,myInit)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json)
    
    setGames(json.results)
  })
  //console.log('passe')

}*/


return(
  <Container>
    <Row>
    <div class="card-group">
    {games.map((element, index) => (
      <Col xs={6} >
          <div class="card">
    <img class="card-img-top" src={element.background_image} alt="Card image cap"/>
    <div class="card-body">
      <h5 class="card-title">{element.name}</h5>
      <Genres key={index} element={element.genres}/>
    </div>
    <h2>Disponible sur :</h2>
    <div className='flexContainer'>
    {
        element.parent_platforms.map((items,index)=>(
          <PlateformItem elements={items} index={index}/>
         
       
        ))
      }
</div>
    <a href='#'class='btn btn-primary' id={element.id}>voir le jeu</a>
  </div>
      
                 
      
    
      
  </Col>


))}
</div>
    </Row>
  </Container>
  )
  
  }
export default CardItem