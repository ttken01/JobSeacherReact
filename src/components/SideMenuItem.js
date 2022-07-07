import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';




 const SideMenuItem =(props)=>{

    if(props.link){
      return(
        <Link to={props.link} className="deco-none black">
        <ListItemButton>
            <ListItemIcon>
              {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.name} />
        </ListItemButton>
      </Link>
    )
    }
    else{
      return(

          <ListItemButton onClick={(()=>{
            props.onClick()
          })}>
          <ListItemIcon>
            {props.icon}
          </ListItemIcon>
          <ListItemText primary={props.name} />
       </ListItemButton>

      )
    }


}


export default SideMenuItem