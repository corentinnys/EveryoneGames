import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
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
  let filterPlateform = props.plateform;
  let search = props.search;
  let tag = props.tag;
console.log(tag)
  
  let request='';
  if (filtre == undefined && filterPlateform == undefined && search == undefined && tag.length==0){
    request = 'https://api.rawg.io/api/games?token&key=fd4fe01def1f461ab24d08167b2b29f5'
  }else if(filtre != undefined && filterPlateform == undefined && tag.length==0)
  {
    request = 'https://api.rawg.io/api/games?token&key=fd4fe01def1f461ab24d08167b2b29f5&genres='+filtre
  }
  else if (filtre == undefined && filterPlateform != undefined && tag.length==0)
  {
     request = 'https://api.rawg.io/api/games?token&key=fd4fe01def1f461ab24d08167b2b29f5&platforms='+filterPlateform
  }else if  (filtre == undefined && filterPlateform == undefined && tag.length==0 & search!=undefined)
  {
    request = 'https://api.rawg.io/api/games?token&key=fd4fe01def1f461ab24d08167b2b29f5&search='+search
  }
  else if (tag.length!=0 & filtre == undefined && filterPlateform == undefined && search==undefined)
  {
    request = 'https://api.rawg.io/api/games?token&key=fd4fe01def1f461ab24d08167b2b29f5&tags='+tag
  }
 
  
  useEffect(()=>{
      axios.get(request)
     
      .then(res => {
      setGames(res.data.results)
      })
  },[filtre,filterPlateform,search,tag])




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
<Link to={`/game/${element.id}`}>
    <a href='#'class='btn btn-primary' id={element.id}>voir le jeu</a>

    </Link>
  </div>  
  </Col>


))}
</div>
    </Row>
  </Container>
  )
  
  }
export default CardItem