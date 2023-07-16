


function Genres(props)
{
  
    
    return (
        props.element.map((item,index)=>(
           <li key={props.key}>{item.name}</li> 
        ))
    )
}
export default Genres