import React, { useEffect, useState} from 'react';
import Api, { endpoints } from '../config/Api';
import Footer from '../partials/Footer'
import Header from '../partials/Header'
import Tags from '../components/Tags'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function SearchJobs(props) {

    const [categories, setCategories] = useState([])
   


    useEffect(() => {
        let loadCategories = async () => {
            let res = await Api.get(endpoints['categories'])
            setCategories(res.data)
        }
        
        loadCategories()
    
    }, [])

    console.log(categories)




  return (
    <>
        <Header/>
            <main className="search-job">
            <Container fixed>
                <section className="header">
                <Typography variant="h1" component="h1" className="heading">Tất cả danh mục việc làm</Typography>
                </section>
                <section className="body">
                {
                    categories.map((item,index)=> 
                        <div  key={index}>
                            <Typography variant="h2" component="h2" >{item.name}</Typography>
                            <Tags data={item.majors}/>   
                        </div> 
                    )}
                </section>
            </Container>
            </main>
        <Footer/>
     
    </>
  );
}