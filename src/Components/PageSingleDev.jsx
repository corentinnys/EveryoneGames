import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function PageSingleDev (){
    const { id } = useParams();
    const [data, setData] = useState({});
    
  
    useEffect(() => {
      axios
        .get(`https://api.rawg.io/api/developers/${id}?key=fd4fe01def1f461ab24d08167b2b29f5`)
        .then(res => {
          console.log(res.data)
          setData(res.data); // Update this line
        })
        .catch(error => {
          console.log(error);
        });

    }, [id]);


    return(
      <>
        <h1>Nom : {data.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </>
    )
} export default PageSingleDev