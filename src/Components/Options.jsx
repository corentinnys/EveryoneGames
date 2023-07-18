function Options(props)
{
   
    return(
     
     
            <option key={props.index} value={props.dataId}>{props.name}</option>
        
    )
} 
export default Options