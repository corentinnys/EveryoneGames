import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './creators.css'
import {Container,Row,Col} from 'react-bootstrap';

function Creators() {
  // You can add state, useEffect, and other logic related to creators here
const [data, setData]=useState([])

useEffect(()=>{
    axios
    .get(`https://api.rawg.io/api/creators?key=fd4fe01def1f461ab24d08167b2b29f5`)
    .then(res => {
      setData(res.data.results); // Update this line
      console.log(res.data)
    })
    .catch(error => {
      console.log(error);
    })
},[])

  return (
    <Container>
      <Row>
        <h1>Liste des createurs</h1>
    {data.map((element,index)=>(
      <Col sm={3}>
      <Link to={`/creator/${element.id}`}>
<a href='#'id={element.id} >
  
   <div className="card">
     <div class="wrapper">
       <img src={element.image} className="cover-image" />
     </div> 
     <img src={element.image} className="character" />
   </div>
   <div class='text-center  text-primary'>
    {element.name}
   </div>
   </a>

</Link>
 </Col>
    ))}
    </Row>
    </Container>
 

  )   
}

export default Creators;