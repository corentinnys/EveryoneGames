
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


if(genres.length == 0){
  let myHeaders = new Headers();

  let myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' };
  
  let myRequest = new Request('https://api.rawg.io/api/genres?token&key=1caef2900c0e4f7fa226a7fe166c67dc',myInit);
  
  fetch(myRequest,myInit)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    SetGenres(json.results)
  })
}
  
if(plateformes.length == 0){
  let myHeaders = new Headers();

  let myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' };
  
  let myRequest = new Request('https://api.rawg.io/api/platforms?token&key=1caef2900c0e4f7fa226a7fe166c67dc',myInit);
  
  fetch(myRequest,myInit)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    SetPlateformes(json.results)
  })
}

  function handleChangeSelect(e)
  {
   
   
    
  }

  return(
    <Container>
      <Row>
        <Col  sm={8}>
         <CardItem/>
        </Col>
        <Col sm={4}>
          <h1>Recherche</h1>
        
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
