import { Col } from "react-bootstrap"
import Genres from "./Genres"
import PlateformItem from "./PlateformItem"
import { Link } from 'react-router-dom';
function Cards(props){
let element = props.element 
let index = props.index
    return (
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
    )
}
export default Cards