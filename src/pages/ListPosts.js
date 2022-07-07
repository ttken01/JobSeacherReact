import React, { useEffect, useState } from 'react';
import Api, { endpoints } from '../config/Api';
import Footer from '../partials/Footer'
import Header from '../partials/Header'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import JobItem from '../components/JobItem'
import { useSearchParams, useParams } from 'react-router-dom';



export default function ListPosts() {
    const [posts, setPosts] = useState([])
    const [q] = useSearchParams()
    const { id } = useParams();
    
    useEffect(() => {

        let loadPosts = async () => {
            // let res = await Api.get(endpoints['posts'])
            let res = await Api.get(`${endpoints['posts']}?keyword=&major_id=${id}`)
            setPosts(res.data.results)
        }
        let loadPostsParam = async () => {
            let res = await Api.get(`${endpoints['posts']}?${q.toString()}`)
            setPosts(res.data.results)

        }
        
       if(q.toString()){
        loadPostsParam()
     
       }
       else{
        loadPosts()
       }
    
    }, []);
 

  return (
    <>
        <Header/>
            <main className="search-job">
            <Container fixed>
                <Typography variant="h3" textAlign="center" gutterBottom component="h1" className="name">
                {/* {props.heading} */}
                </Typography>
                <Box sx={{ width:'100%' }}>
                <Grid container spacing={1} >
                    {posts.length>0?(
                        posts.map((item, index) =>
                            <Grid item xs={6} key={index} >
                                <JobItem data={item}/>
                            </Grid>
                        )
                    ):(
                        <Typography variant="h3" textAlign="center" gutterBottom component="h1" className="name">
                       Không có kết quả
                        </Typography>
                    )}
                </Grid>
            </Box>
            </Container>
            </main>
        <Footer/>
     
    </>
  );
}