


function Genres(props)
{
  
    
    return (
        props.element.map((item,index)=>(
           <span key={props.key}>{item.name}</span> 
        ))
    )
}
export default Genres