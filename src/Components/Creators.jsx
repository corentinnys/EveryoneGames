import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div>
      <h1>les createurs </h1>
      {/* Add additional content related to creators */}
      {/* For example, you can display a list of creators */}
      <ul>
        {data.map((element,index)=>(
            <li>
                {element.name}
                <img src={element.image}/>

                <Link to={`/creator/${element.id}`}>
    <a href='#'class='btn btn-primary' id={element.id}>creator</a>

    </Link>
               
            </li>
        ))}
        {/* Add more creators as needed */}
      </ul>
    </div>
  );
}

export default Creators;