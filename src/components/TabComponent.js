import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import JobItem from './JobItem'
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import CenterDiv from './CenterDiv';
import Api, { endpoints } from '../config/Api';
import TextField from '@mui/material/TextField';
import HirerCardItem from './HirerCardItem'
import Button from '@mui/material/Button';
import TabItem from './TabItem'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabComponent() {
  const [value, setValue] = React.useState(0);
  const [posts, setPosts] = React.useState([])
  const [oldPosts, setOldPosts] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [numpages, setNumpages] = React.useState(0)
  const [hirer, setHirer] = React.useState([])
  const [kw, setKw] = React.useState("")



  const numItemsPerPage= 20;




  React.useEffect(() => {
    const loadOlderPost = async () => {
      const res = await Api.get(`${endpoints['posts-page'](page)}&old=true`)
      console.log(res.data)
      setNumpages (Math.ceil(res.data.count/numItemsPerPage))
      setOldPosts(res.data.results)
    
  }

    let loadPostsPage = async () => {
      const res = await Api.get(endpoints['posts-page'](page))
      console.log(res.data)
      setNumpages (Math.ceil(res.data.count/numItemsPerPage))
      setPosts(res.data.results)
  }

  

    if(value===1){
      loadOlderPost()
    }
    if(value===2){

    }
    else{
      loadPostsPage()
    }
 
  
  }, [page,value])


  







  let loadHirer = async () => {
    const res = await Api.get(endpoints['hirer'])
    setHirer(res.data)
    console.log(res.data)
  
}


const handleFindHirer=() =>{
      let loadHirerByKeyword = async () => {
        let res = await Api.get(`${endpoints['hirer']}?keyword=${kw}`)
        setHirer(res.data)
        console.log(res.data)
      
    }

    loadHirerByKeyword()

}

  // const formatDateList =  posts.map(post=>{
  //   let localdate = new Date(post.created_date);
  //   const copy ={date: localdate, ...post}
  //   return copy
  // })

  //oldest first
  // let sortedDateList= formatDateList.sort((a,b) =>b.date.getTime() -  a.date.getTime())


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newValue) => {
    setPage(newValue)
  }


  return (
    <Container maxWidth="">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Việc làm mới đăng " {...a11yProps(0)} />
            <Tab  label="Tất cả việc làm" {...a11yProps(1)} />
            <Tab onClick={loadHirer} label="Các nhà tuyển dụng" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{ width:'100%' }}>
            <Grid container spacing={1} >
                  {posts.map((item, index) =>
                  <Grid item xs={12} sm={6} md={6} key={index} >
                      <TabItem data={item}/>
                  </Grid>
              )}
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
        <Box sx={{ width:'100%' }}>
        <Grid container spacing={1} >
                  {oldPosts.map((item, index) =>
                  <Grid item xs={12} sm={6} md={6} key={index} >
                      <TabItem data={item}/>
                  </Grid>
              )}
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <Box sx={{ width:'100%' }}>
          <CenterDiv>
         <TextField onChange={e=>{setKw(e.target.value)}} name="title" className="search" fullWidth id="outlined-search" label="Tên công ty" type="search" />
          <Button variant="contained" size="small" onClick={handleFindHirer}>Tìm ngay</Button>

          </CenterDiv>
          <Grid container spacing={1} >
         
                    {hirer.map((item, index) =>
                    <Grid item xs={12} sm={6} md={6} key={index} >
                        <HirerCardItem data={item}/>
                    </Grid>
                )}
            </Grid>
          </Box>
        </TabPanel>
        
      </Box>
      <CenterDiv ><Pagination count={numpages} page={page} onChange={handleChangePage}/></CenterDiv>
    </Container>
  );
}
