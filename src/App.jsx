
import './App.css'

import {Container,Row,Col} from 'react-bootstrap';
import{ useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import React from 'react';
import Options from './Components/Options';
import CardItem from './Components/CardItem';
function App() {

  const [plateformes ,SetPlateformes]= useState([]);
  const [genres ,SetGenres]= useState([]);
  const [filtreGenre,SetFiltreGenre] = useState();





useEffect(()=>{
  axios.get('https://api.rawg.io/api/genres?token&key=f0bd0222c07f4b3d850d79e7cc7c68b1')
  .then(res => {
  SetGenres(res.data.results)
  })

  axios.get('https://api.rawg.io/api/platforms?token&key=f0bd0222c07f4b3d850d79e7cc7c68b1')
  .then(res =>{
    SetPlateformes(res.data.results)
  })
},[])




//if(genres.length == 0){
  /*let myHeaders = new Headers();

  let myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' };
  
  let myRequest = new Request('https://api.rawg.io/api/genres?token&key=f0bd0222c07f4b3d850d79e7cc7c68b1',myInit);
  
  fetch(myRequest,myInit)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    SetGenres(json.results)
  })
}*/
  
/*if(plateformes.length == 0){
  let myHeaders = new Headers();

  let myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' };
  
  let myRequest = new Request('https://api.rawg.io/api/platforms?token&key=f0bd0222c07f4b3d850d79e7cc7c68b1',myInit);
  
  fetch(myRequest,myInit)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    SetPlateformes(json.results)
  })
}*/

  function handleChangeSelect(e)
  {
   
 
   let value = e.currentTarget.value.toLowerCase();
   SetFiltreGenre(value)

    
  }

  return(
    <Container>
      <Row>
        <Col  sm={8}>
         <CardItem  filtre={filtreGenre} />
        </Col>
        <Col sm={4}>
          <h1>Filtres</h1>
        
          <div class="input-group mb-3">

          <label class="input-group-text" for="inputGroupSelect01">plateforms</label>
          <select class="form-select" id="inputGroupSelect01">
          <option selected>Choose...</option>
         {plateformes.map((plateform,index)=>(
          <Options key={index} name={plateform.name}/>

          ))}
      </select>
      </div>
      <div class="input-group mb-3">

<label class="input-group-text" for="inputGroupSelect01">Genres</label>
<select class="form-select" id="inputGroupSelect01" onChange={handleChangeSelect}>
<option selected>Choose...</option>
{genres.map((genre,index)=>(
<Options key={index} name={genre.name}/>

))}
</select>
</div>

        </Col>
      </Row>
      
    </Container>
  )

  
}

export default App
