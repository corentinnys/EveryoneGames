import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreatorSingle() {
  const [data, setData] = useState([]);
  const [game, setGame] = useState([])
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/creators/${id}?key=fd4fe01def1f461ab24d08167b2b29f5`)
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`https://api.rawg.io/api/creators?key=fd4fe01def1f461ab24d08167b2b29f5`)
      .then(res => {
   
   //console.log(res.data.results[0].games)
   for ( const items of res.data.results )
   {
    console.log(items)
        if (items.id == id){
            setGame(items.games)
            //console.log(items.games)
        }
   }
   console.log(res.data.results[0].id)
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <h1>nom : {data.name}</h1>
      <img src={data.image} alt={data.name} />
      <div dangerouslySetInnerHTML={{ __html: data.description }} />
      {game.map((element,index)=>(
       <span> {element.name}</span> 
      
      ))}
    </>
  );
}

export default CreatorSingle;