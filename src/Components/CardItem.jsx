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
    const [hasMore, setHasMore] = useState(true);
  let filtre = props.filtre;
  let filterPlateform = props.plateform;
  let search = props.search;
  let tag = props.tag;
  let creators = props.creators
  let page = 1

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
  else if(filtre != undefined && filterPlateform != undefined && tag.length==0 && creators.length == 0)
  {
    request = 'https://api.rawg.io/api/games?token&key=fd4fe01def1f461ab24d08167b2b29f5&genres='+filtre+'&platforms='+filterPlateform
  }
  
 
  
  useEffect(()=>{

    window.addEventListener('scroll',handleScroll)
      axios.get(request)
     
      .then(res => {
      setGames(res.data.results)
      })
  },[filtre,filterPlateform,search,tag])

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && hasMore) {
      console.log('Fetching more data...');
      const nextPage = page + 1; // Increment the page
      axios
        .get(`${request}&page=${nextPage}`) // Include the updated page in the API request
        .then(res => {
          if (res.data.results.length > 0) {
            // If new data is available, add it to the existing games list
            setGames(prevGames => [...prevGames, ...res.data.results]);
          } else {
            // If no new data, set hasMore to false to stop infinite scrolling
            setHasMore(false);
          }
        })
        .catch(error => {
          console.log('Error fetching more data:', error);
        });
    }
  };



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