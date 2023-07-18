
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
  const [filterPlateform,setFilterPlateform]=useState();
  const [search,setSearch]=useState();
  const [tagsList,setTagsList]=useState([]);
  const [tag,setTag]=useState([]);





useEffect(()=>{
  axios.get('https://api.rawg.io/api/genres?token&key=fd4fe01def1f461ab24d08167b2b29f5')
  .then(res => {
  SetGenres(res.data.results)
  })

  axios.get('https://api.rawg.io/api/platforms?token&key=fd4fe01def1f461ab24d08167b2b29f5')
  .then(res =>{
    SetPlateformes(res.data.results)
  })
  axios.get('https://api.rawg.io/api/tags?token&key=fd4fe01def1f461ab24d08167b2b29f5')
  .then(res=>
    {
      setTagsList(res.data.results)
      
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
   
 
   let value = e.currentTarget.value;
   SetFiltreGenre(value)

    
  }
  function handleChangeSelectPlateforms(e)
  {
    let value = e.currentTarget.value;
    setFilterPlateform(value)
  }
  function handleChangeSearch(e)
  {
    let value = e.currentTarget.value;
    setSearch(value)
  }

  function handleChangeTags(e)
  {
    let name = e.currentTarget.getAttribute('data-id')
    console.log(name)
    setTag(name)
  }

  return(
    <Container>
      <Row>
        <Col  sm={8}>
         <CardItem tag={tag} search={search} filtre={filtreGenre} plateform={filterPlateform} />
        </Col>
        <Col sm={4}>
          <h1>Filtres</h1>
        
          <div class="input-group mb-3">

          <label class="input-group-text" for="inputGroupSelect01">plateforms</label>
          <select class="form-select" id="inputGroupSelect01" onChange={handleChangeSelectPlateforms}>
          <option selected>Choose...</option>
         {plateformes.map((plateform,index)=>(
          <Options key={index} name={plateform.name} dataId={plateform.id}/>

          ))}
      </select>
      </div>
      <div class="input-group mb-3">

<label class="input-group-text" for="inputGroupSelect02">Genres</label>
<select class="form-select" id="inputGroupSelect02" onChange={handleChangeSelect}>
<option selected>Choose...</option>
{genres.map((genre,index)=>(
<Options key={index} name={genre.name}  dataId={genre.id}/>

))}
</select>
</div>
<input type="search" id="search" onChange={handleChangeSearch}/>
{
  tagsList.map((element,index)=>(
   <div>
      <input type="checkbox" data-id={element.id} name={element.name} data onChange={handleChangeTags} />
    <label>{element.name}</label>
  
   </div>
 
))}
        </Col>
      </Row>
      
    </Container>
  )

  
}

export default App
