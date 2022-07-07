import CkeditorComponent from './CkeditorComponent'
import Button from '@mui/material/Button';
import SeclectGroup  from './SelectGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SelectComponent from './SelectComponent';
import Api, { endpoints } from '../config/Api';
import React, { useEffect, useState ,useContext} from 'react';
import TextField from '@mui/material/TextField';
import { location, salary, level  } from '../data/data';
import { UserContext } from '../App'
import DatePicker  from './DatePicker';
import {useParams} from 'react-router-dom';
import ModalComponent  from '../components/ModalComponent';



const DashboardPostModify = ()=>{

    const [categories, setCategories] = useState([])
    const [post, setPost] = useState(null)
    const [dataCkeditor, setDataCkeditor] = useState('')
    const [dataMajorId, setDataMajorId] = useState(null)
    const [user, dispatch] = useContext(UserContext)
    const [dateValue, setDateValue] = useState(new Date())
    const {id} =useParams();
    const [openDialog, setOpenDialog] = useState(false);



    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    useEffect(() => {
        let loadCategories = async () => {
            let res = await Api.get(endpoints['categories'])
            setCategories(res.data)
        }
        
        loadCategories()
        

        const loadPostDetailsById = async () => {
            const res = await Api.get(endpoints['post-detail'](id))
            setPost(res.data)
            setDataCkeditor(res.data.description)
            console.log(res.data)
        }
        loadPostDetailsById()
        if(post && post.description){
            setDataCkeditor(post.description)

        }

    

        
    }, [])

    let from_salary, to_salary

    const convertSalary =(string) => {
        let arr = string.split(',')
        if(arr.length === 1){
            let salaryIndex= salary.findIndex(item => item.name===string)
              from_salary= salary[salaryIndex].data


        }
        else{
            let salaryIndex= salary.findIndex(item => item.name===arr[0])
            let salaryIndex2= salary.findIndex(item => item.name===arr[1])
            from_salary=salary[salaryIndex].data
            to_salary=salary[salaryIndex2].data
    }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('salary')){
            convertSalary(data.get('salary'))
        }

    //     console.log(            {
    //         title: data.get('title'),
    //         major: dataMajorId,
    //         location : data.get('location'),
    //         from_salary: from_salary,
    //         to_salary: to_salary,
    //         type: data.get('type'),
    //         time_work:data.get('timeWork'),
    //         description: dataCkeditor,
    //         company: user.username,
    //         user: user.id,
    //         quantity: data.get('quantity'),
    //         due: dateValue


    // })
        
        const postPost = async () => {
            const res = await Api.patch(endpoints['post-detail'](id)
             ,   {
                    title: data.get('title'),
                    major: dataMajorId,
                    location : data.get('location'),
                    from_salary: from_salary,
                    to_salary: to_salary,
                    type: data.get('type'),
                    time_work:data.get('timeWork'),
                    description: dataCkeditor,
                    // company: user.username,
                    // user: user.id,
                    quantity: data.get('quantity'),
                    due: dateValue,
                    gender: data.get('gender'),
        
            }
            ,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            
            }).then(function (response) {
                handleOpen()
            }
            ).catch(err => alert(err))
    
            console.log(res.data)
        }

            if(data.get('title') &&  data.get('location')
            && data.get('type') && dataMajorId && dataCkeditor && user.id
            && data.get('timeWork')){
                postPost()

        }
        else{
                alert('Please fill all required fields')
        }

      

    };
    


    return(
        <div className="post-component">
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
             <Box sx={{ flexGrow: 1 }}>
               <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Vị trí cần tuyển
                    </Typography>
                    <TextField required name="title" className="search" fullWidth id="outlined-search" type="search"
                        value={post?.title}
                        onChange={(e) => {
                            setPost({...post, title: e.target.value})
                        }}
                    />

                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Chọn ngành nghề cần tuyển
                    </Typography>
                   <SeclectGroup required name="major" data={categories} setDataMajorId={setDataMajorId} />

                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Chọn nơi làm việc
                    </Typography>
                   <SelectComponent required name="location" data={location} value={post?.location} />
                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                    Chọn mức lương
                    </Typography>
                    <SelectComponent label="Chọn mức lương" name="salary" data={salary} fullWidth/>
                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                    Chọn cấp bậc
                    </Typography>
                    <SelectComponent required label="Cấp bậc" name="type" data={level} fullWidth/>
                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Thời gian làm việc
                    </Typography>
                    <TextField required name="timeWork" className="search"
                    value={post?.time_work}
                    onChange={(e) => {
                        setPost({...post, time_work: e.target.value})
                    }}
                    fullWidth id="outlined-search" />
                    </div>
                </Grid>

                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Giới tính
                    </Typography>
                    <TextField name="gender" className="search" fullWidth
                    value={post?.gender}
                    onChange={(e) => {
                        setPost({...post, gender: e.target.value})
                    }}
                    id="outlined-search"  />
                    </div>
                </Grid>
                       
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Số lượng
                    </Typography>
                    <TextField type="number"
                    value={post?.quantity}
                    onChange={(e) => {
                        setPost({...post, quantity: e.target.value})
                    }}
                    name="quantity" className="search" fullWidth id="outlined-search"
                     />
                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                       Ngày hết hạn
                    </Typography>
                    <DatePicker value={dateValue} setDateValue={setDateValue}/>
                    </div>
                </Grid>
            </Grid>
        </Box>
     
        <Typography variant="h5" gutterBottom component="div" className="name">
            Mô tả chi tiết
        </Typography>
        
         <CkeditorComponent name="detail" value={dataCkeditor} setDataCkeditor={setDataCkeditor}/>
         <div className='center-div'>
          <Button className="post" variant="contained"   type="submit" >Sửa ngay</Button>
        </div>
        <ModalComponent handleOpen={handleOpen} open={openDialog} handleClose={handleClose}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
             Sửa bài đăng thành công
            </Typography>
          </ModalComponent>
        </Box>
        </div>
    )
}

export default DashboardPostModify