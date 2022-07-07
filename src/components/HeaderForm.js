import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SelectComponent from './SelectComponent'
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import Api, { endpoints } from '../config/Api';
import { location, salary  } from '../data/data';
import { useNavigate} from 'react-router-dom';
import SeclectGroup  from './SelectGroup';





export default function HeaderForm() {


    const [categories, setCategories] = useState([])
    const [dataMajorId, setDataMajorId] = useState(null)



    let navigate = useNavigate();

    useEffect(() => {
        let loadCategories = async () => {
            let res = await Api.get(endpoints['categories'])
            // let res = await fetch("/categories.json")
            // let data = await res.json()
            setCategories(res.data)
        }
        
        loadCategories()
    
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


    const handleSubmit =(event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('salary')) {
            convertSalary(data.get('salary'))
        }
    //     console.log({
    //         title: data.get('title'),
    //         major: dataMajorId,
    //         location : data.get('location'),
    //         from_salary: from_salary,
    //         to_salary: to_salary,
    //         // type: data.get('type'),
    //  })
       let param = {
           keyword: data.get('title'),
           major_id: dataMajorId    || null,
           location : data.get('location')?data.get('location'):null,
            from_salary: from_salary    ?from_salary:null,
            to_salary: to_salary    ?to_salary:null,
            // type: data.get('type'),
     }
        let o = Object.fromEntries(Object.entries(param).filter(([_, v]) => v != null));
         let queryString = new URLSearchParams(o).toString();
        //  console.log(`/job-list/?${queryString}`)
        navigate(`/job-list/posts?${queryString}`);
    }

    return(
     <Box component="form" noValidate onSubmit={handleSubmit} className='react-form header-form'>
      <h2>Đón lấy thành công với
            các cơ hội nghề nghiệp</h2>
  
      <TextField name="title" className="search" fullWidth id="outlined-search" label="Chức danh" type="search" />
    
      <Box sx={{ width:'100%' }}>
      <Grid container spacing={1} >
        <Grid item xs={6}>
           <SelectComponent name="location" label="Địa điểm" data={location} fullWidth/>
        </Grid>
        <Grid item xs={6}>
          <div className="major-wrapper">
           <SeclectGroup  required name="major" data={categories} setDataMajorId={setDataMajorId} />
         </div>
        </Grid>
        <Grid item xs={6}>
       <SelectComponent name="salary" label="Chọn mức lương" data={salary} fullWidth/>
        </Grid>
        {/* <Grid item xs={6}>   
            <SelectComponent name="type" label="Cấp bậc" data={level} fullWidth/>
        </Grid> */}
    </Grid>
        </Box>
      <div className='form-group'>
        <div className='center-div'>
          <Button variant="contained"  type="submit">Tìm việc ngay</Button>
        </div>
      </div>
      </Box>
    )
   
}
  

const ReactFormLabel =(props) =>{
    return(
        <label htmlFor={props.htmlFor}>{props.title}</label>
        )

}