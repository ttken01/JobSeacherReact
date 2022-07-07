import {useState, useEffect} from 'react'
import Typography from '@mui/material/Typography';
import Api, { endpoints } from '../config/Api';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import JobItem from './JobItem'

const DashboardPosted = () => {

    const [posts, setPosts] = useState([])

    //can them filter user

    let loadPosts = async () => {
        const res = await Api.get(endpoints['myPost'],
        { headers:{
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }})
        console.log(res)
        setPosts(res.data.results)
    }

    useEffect(() => {


    
    loadPosts()

}, [])

const handleDelete =()=>{
    loadPosts()
}


    return(
        <div>
            <Typography variant="h3" textAlign="center" gutterBottom component="h1" className="name">
            Các bài viết đã đăng
            </Typography>
            <Box sx={{ width:'100%' }}>
            <Grid container spacing={1} >
                {posts.length>0?(
                    posts.map((item, index) =>
                        <Grid item xs={6} key={index} >
                            <JobItem handleDelete={handleDelete} data={item} authenticated/>
                        </Grid>
                    )
                ):(
                    <p>Khong co ket qua</p>
                )}
            </Grid>
          </Box>
        </div>
    )


}


export default DashboardPosted