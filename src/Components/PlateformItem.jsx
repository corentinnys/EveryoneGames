import { Container,Row,Col } from 'react-bootstrap';
import './index.css'
function  PlateformItem(props)
{ 
 let link;
 switch(props.elements.platform.name )
 {
    case 'PlayStation':
        link = <img className='image' src='../../src/assets/logo-playstation.png' title='Playstation'/>
        break
    case 'Xbox':
        link =<img className='image' src='../../src/assets/Xbox-logo.png' title='Xbox'/>
        break
    case'PC':
        link =<img className='image' src='../../src/assets/pc-logo.jpg' title='Pc'/>
        break;
    case'iOS':
        link =<img className='image' src='../../src/assets/ios-logo.png' title='Ios'/>
        break;
    case'Android':
        link =<img className='image' src='../../src/assets/android-logo.png'title='Android'/>
        break;
    case'Apple Macintosh':
        link =<img className='image' src='../../src/assets/Apple-logo.png' title='Mac'/>
        break;
    case'Linux':
        link =<img className='image' src='../../src/assets/linux-logo.png'title='Linux'/>
        break;
    case'Nintendo':
        link =<img className='image' src='../../src/assets/nintendo-logo.png' title='Nintendo'/>
        break;
 }
  

  

 
    return(
       <>
       {link}
       </>
            
      
 
    )
}
export default PlateformItem