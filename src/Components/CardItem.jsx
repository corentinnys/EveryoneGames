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
  let creators = props.creators

  console.log(creators)
  let request='';
  if (filtre == undefined && filterPlateform == undefined && search == undefined && tag.length==0 && creators.length == 0){
    request = 'https://api.rawg.io/api/games?token&key=fd4fe01def1f461ab24d08167b2b29f5'
  }else if(filtre != undefined && filterPlateform == undefined && tag.length==0 && creators.length == 0)
  {
    request = 'https://api.rawg.io/api/games?token&key=fd4fe01def1f461ab24d08167b2b29f5&genres='+filtre
  }
  else if (filtre == undefined && filterPlateform != undefined && tag.length==0 && creators.length == 0)
  {
     request = 'https://api.rawg.io/api/games?token&key=fd4fe01def1f461ab24d08167b2b29f5&platforms='+filterPlateform
  }else if  (filtre == undefined && filterPlateform == undefined && tag.length==0 & search!=undefined && creators.length == 0)
  {
    request = 'https://api.rawg.io/api/games?token&key=fd4fe01def1f461ab24d08167b2b29f5&search='+search
  }
  else if (tag.length!=0 & filtre == undefined && filterPlateform == undefined && search==undefined && creators.length == 0)
  {
    request = 'https://api.rawg.io/api/games?token&key=fd4fe01def1f461ab24d08167b2b29f5&tags='+tag
  }
  else if(creators.length!=0 &filtre == undefined && filterPlateform == undefined && tag.length==0 & search!=undefined)
  {
    request = 'https://api.rawg.io/api/games?token&key=fd4fe01def1f461ab24d08167b2b29f5&creators='+creators
  }
  {

  }
 
  
  useEffect(()=>{
      axios.get(request)
     
      .then(res => {
      setGames(res.data.results)
      })
  },[filtre,filterPlateform,search,tag])





  return (
    <Container>
      <Row>
      {games.map((element, index) => (
        <Col>
      <div className="flip-card-container">
      <div className="flip-card">
        <div className="card-front">
          <figure>
            <div className="img-bg"></div>
            <img src={element.background_image} alt="Brohm Lake"/>
            <figcaption>{element.name}</figcaption>
          </figure>
  
          <ul>
           <Genres key={index} element={element.genres}/>
            <li>
            {
element.parent_platforms.map((items,index)=>(
<PlateformItem elements={items} index={index}/>
))
}
            </li>
          </ul>
        </div>
  
        <div className="card-back">
          <figure>
            <div className="img-bg"></div>
            <img src={element.background_image} alt="Brohm Lake"/>
          </figure>
  
          <Link to={`/game/${element.id}`}>
<a href='#'class='btn btn-primary' id={element.id}>voir le jeu</a>

</Link>
  
          <div className="design-container">
            <span className="design design--1"></span>
            <span className="design design--2"></span>
            <span className="design design--3"></span>
            <span className="design design--4"></span>
            <span className="design design--5"></span>
            <span className="design design--6"></span>
            <span className="design design--7"></span>
            <span className="design design--8"></span>
          </div>
        </div>
      </div>
    </div>
    </Col>
      ))}
      </Row>
    </Container>
  );
  
  
 
  }
export default CardItem