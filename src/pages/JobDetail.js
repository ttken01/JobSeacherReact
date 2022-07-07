import Footer from '../partials/Footer'
import Header from '../partials/Header'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CkeditorHtml from '../components/CkeditorHtml';
import Item from '../components/Item';
import { useParams  } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
import Api, { endpoints } from '../config/Api';
import {Link} from 'react-router-dom'
import Typography from '@mui/material/Typography';
import CenterDiv from '../components/CenterDiv';
import { UserContext } from '../App'
import ModalComponent  from '../components/ModalComponent';
import CkeditorComponent from '../components/CkeditorComponent'
import img from '../images/404.jpg';
import Avatar from '@mui/material/Avatar';
import Moment from 'react-moment';




export default function JobDetails(props) {

    const { id } = useParams();
    const cvRef = useRef()

    const [post, setPost] = useState(null)
    const [applies, setApplies] = useState(null)
    const [user, dispatch] = useContext(UserContext)
    const [openDialog, setOpenDialog] = useState(false);
    const [dataCkeditor, setDataCkeditor] = useState('')

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    const loadPostAppliessById = async () => {
        const res = await Api.get(endpoints['post-detail-applies'](id))
        console.log("applies", res.data)
        setApplies(res.data)

    }


    useEffect(() => {

        const loadPostDetailsById = async () => {
            const res = await Api.get(endpoints['post-detail'](id))
            setPost(res.data)
            if(props.authenticated){
                loadPostAppliessById()
            
           }
    
    
        }
        
       
        loadPostDetailsById()
  

    }, [])

    const handleApplyFormOpen = () => {
        handleOpen()
    }

    const handleApplySubmit = async () => {

        var formData = new FormData();

        if(props.authenticated){
            alert('Khong the apply vao viec lam cua chinh ban')
        }
        
        else if(cvRef.current.files[0] && id && user.id && dataCkeditor){
            formData.append("CV", cvRef.current.files[0])
            formData.append("post",id)
            formData.append("user",user.id)
            formData.append("description",dataCkeditor)


            let res = await Api.post(endpoints['applies']
            ,formData,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                },
            
            }).then((res) => {
                console.log(res.data)
                handleClose()
                alert('Apply thanh cong')
          
              }).catch(err => {
                alert(err)
              })


        
        }
 

        else{
            alert('Vui lòng nhập các trường ')
       
        }
    }

    console.log(post)


    if(!post) {
        return <div>Loading...</div>
    }


 


   

  return (
    <>
            {
                props.authenticated?(
                    <></>
                ):(
                    <Header/>

                )
            }
  
            <main className="job-detail">
            {
                props.authenticated?(
                        <section>
                        
                            <Typography variant="h4"  gutterBottom component="h4" align="center">Danh sách ứng viên</Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    {applies!=null && applies.length > 0?(
                                        applies.map((item, index) => (
                                        <Grid item xs={2} sm={4} md={4} key={index}>
                                            
                                                <Item>
                                                    <Link to={`/profile/${item.user}`} className="link">
                                                            <CenterDiv>
                                                            {
                                                            post.avatar_user?(
                                                                <Avatar alt="Remy Sharp" src={ item?.avatar_user}
                                                                style={{ height: '170px', width: '170px' }}
                                                                />

                                                            ):(
                                                                <Avatar alt="alt" src={img}
                                                                style={{ height: '170px', width: '170px' }}
                                                                />
                                                                

                                                            )
                                                            }
                                                        
                                                            </CenterDiv>
                                                    
                                                        <p className="heading">{item.user}</p>
                                                        <p>{item?.description}</p>
                                                    </Link>
                                                </Item>
                                            {
                                                item.CV_path?(
                                                      <Button onClick={()=>{
                                                   
                                                            let link = document.createElement("a");
                                                            link.target = "_blank";
                                                            link.download = `CV-${item.user}.txt`;
                                                            link.href = `${item.CV_path}`;
                                                            link.click();
                                                      }} variant="contained" fullWidth>Tải CV</Button>
                                                ):(
                                                <></>
                                                )
                                            }
                                        </Grid>
                                        ))
                                    ):(
                                    <Typography variant="h2"  gutterBottom component="h2">Chưa có ứng viên nào apply</Typography>

 
                                    )}
                                </Grid>
                            </Box>
                        </section>
              
                ):(
                    <></>
                )
            }
                <section className="header">
                    <h1>{post.title}</h1>
                    <Link to={`/profile/${post.user}`} className="link">
                    <CenterDiv>
                    {
                    post.avatar_user?(
                        <Avatar alt="Remy Sharp" src={ post.avatar_user}
                        style={{ height: '170px', width: '170px' }}
                        />

                    ):(
                        <Avatar alt="alt" src={img}
                        style={{ height: '170px', width: '170px' }}
                        />
                        

                    )
                    }
                
                    </CenterDiv>
                    <h2>Công ty: {post.company}</h2>
                    </Link>

                    {props.authenticated?(<></>):(
                        <Button onClick={handleApplyFormOpen} variant="contained">Nộp đơn ứng tuyển ngay</Button>
                    )}
                </section>
                <section className="body">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                             <Grid item xs={2} sm={4} md={4} >
                                 <Link to={`/job-list/posts?keyword=&major_id=${post?.major}`} className="link">
                                     <Item><p className="heading">Ngành nghề</p><p>{post?.major_name}</p></Item>
                               </Link>

                            </Grid>
                            <Grid item xs={2} sm={4} md={4} >
                              <Link to={`/job-list/posts?keyword=&from_salary=${post?.from_salary}`} className="link">
                                <Item><p className="heading">Lương từ</p><p>{post?.from_salary}</p></Item>
                               </Link>
                            </Grid>
                            <Grid item xs={2} sm={4} md={4} >
                              <Link to={`/job-list/posts?keyword=&to_salary=${post?.to_salary}`} className="link">
                                <Item><p className="heading">Lương đến</p><p>{post?.to_salary}</p> </Item>
                               </Link>
                            </Grid>             
                            <Grid item xs={2} sm={4} md={4} >
                                <Item><p className="heading">Giới tính</p><p>{post?.gender}</p></Item>
                            </Grid>             
                            <Grid item xs={2} sm={4} md={4} >
                                <Link to={`/job-list/posts?keyword=&location=${post?.location}`} className="link">
                                  <Item><p className="heading">Địa điểm</p><p>{post?.location}</p></Item>
                               </Link>
                            </Grid>             <Grid item xs={2} sm={4} md={4} >
                                <Item><p className="heading">Số lượng</p><p>{post?.quantity}</p></Item>
                            </Grid> 
                              <Grid item xs={2} sm={4} md={4} >
                                <Item><p className="heading">Thời gian làm việc</p><p>{post?.time_work}</p></Item>
                            </Grid>
                            <Grid item xs={2} sm={4} md={4} >
                                <Item><p className="heading">Trình độ</p><p>{post?.type}</p></Item>
                            </Grid>
                            <Grid item xs={2} sm={4} md={4} >
                                <Item><p className="heading">Ngày hết hạn</p>
                                <Moment >{post?.due}</Moment>
                               </Item>
                            </Grid>
                            
                            
                    
                        </Grid>
                    </Box>
                    <h2>MÔ TẢ CÔNG VIỆC</h2>
                    <CkeditorHtml data={post.description} />
                    {/* <h2>JOB TAGS / SKILLS</h2>
                    <Tags/> */}
                    <ModalComponent handleOpen={handleOpen} open={openDialog} handleClose={handleClose}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Mô tả chi tiết
                        </Typography>
                        <CkeditorComponent name="desc" value={dataCkeditor} setDataCkeditor={setDataCkeditor}/>
                        <input
                            // accept="image/*"
                            // style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            ref ={cvRef}
                        />
                        {/* <label htmlFor="raised-button-file">
                            <Button fullWidth variant="contained" component="div" sx={{ mt: 3, mb: 2 }}>
                            Upload CV
                            </Button>
                        </label> */}
    
                        <Button onClick={handleApplySubmit} variant="contained">Nộp đơn ứng tuyển ngay</Button>
                    </ModalComponent>
                
                </section>
            </main>

            {
                props.authenticated?(
                    <></>
                ):(
                    <Footer/>
     

                )
            }
          
    </>
  );
}


