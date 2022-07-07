import Typography from '@mui/material/Typography';
import { UserContext } from '../App'
import  { useState, useContext, useEffect } from 'react'
import Api, { endpoints } from '../config/Api';
import { Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CenterDiv from './CenterDiv'
import Item from './Item';




const DashboardApplied = () => {
  const [user, dispatch] = useContext(UserContext)
  const [applies, setApplies] = useState([]);





  console.log(user)



    const handleDelete =(id )=>{
        const handleDeleteApply = async () => {
            const res = await Api.delete(endpoints['applies-detail'](id)
            ,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            
            })
            console.log(res.data)
            loadApplied()
        }
        handleDeleteApply()
    }




  const loadApplied= async () => {
    const res = await Api.get(endpoints['my-applies'],
    { headers:{
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }})
    console.log(res.data)
    setApplies(res.data)
}

    
    useEffect(() => {
        loadApplied()
    
    }, [])


    return (
        <div className="dashboard-Applied">
        <Typography variant="h3" textAlign="center" gutterBottom component="h1" className="name">
            Các việc làm đã ứng tuyển
            </Typography>
            <Box sx={{ width:'100%' }}>
            <Grid container spacing={1} >
            {applies!=null && applies.length > 0?(
                    applies.map((item, index) => (
                    <Grid item xs={2} sm={6} md={6} key={index}>
                          <Link to={`/job-detail/${item.post}`} className="link">
                        
                            <Item>
                                <p className="heading">{item.user}</p>
                                <p>{item.description}</p>
                            </Item>
                        </Link>
                        <CenterDiv>
                        {
                            item.CV_path?(
                                    <Button onClick={()=>{
                                
                                        let link = document.createElement("a");
                                        link.target = "_blank";
                                        link.download = `CV-${item.user}.txt`;
                                        link.href = `${item.CV_path}`;
                                        link.click();
                                    }} variant="contained" >Tải CV</Button>
                            ):(
                            <></>
                            )
                        }
                         <Button  variant="contained" onClick={()=>handleDelete(item.id)} >Xóa</Button>
                       
                        </CenterDiv>

                     

                    </Grid>
                    ))
                ):(
                <Typography variant="h2"  gutterBottom component="h2">Chưa có apply</Typography>


                )}
            </Grid>
          </Box>

        </div>
    )
}


export default DashboardApplied