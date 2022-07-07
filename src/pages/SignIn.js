import * as React from 'react';
import { useState, useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { UserContext } from '../App'
import Api, { endpoints, client } from '../config/Api';
import * as qs from 'qs'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Job Searcher
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function SignIn() {

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [user, dispatch] = useContext(UserContext)
  let navigate = useNavigate();


  const authUser = async () => {
    const res = await Api.post(endpoints['token'],
    qs.stringify({
      "grant_type":"password",
      "username":username,
      "password":password,
      "client_id":client.clientId,
      "client_secret":client.clientSecret
    })).then((res) => {
      console.log(res.data)
      localStorage.clear()
      localStorage.setItem("token", res.data.access_token)
      getUserDetails()

    }).catch(err => {
      if(err.response.status === 400){
        alert("Invalid username or password")
      }
    })


 }

 const convertUserRole = (numb) => {
  if(numb === 1){
    return "Admin"
  }else if(numb === 2){
     return "User"
   }
   else if(numb === 3){
     return "Hirer"
   }
}


 const getUserDetails = async () => {
  const res = await Api.get(endpoints['getUser'],
  { headers:{
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }}).catch(err => {
    alert(err)
  })

  let userDetail =res.data
  console.log(userDetail)
  userDetail["user_role"]=convertUserRole(userDetail.user_role)
  localStorage.setItem("user",JSON.stringify(userDetail))



  dispatch({
    "type": "login",
    "payload": {
        "username": userDetail.username,
        "avatar": userDetail.avatar_path,
        "email": userDetail.email,
        "id": userDetail.id,
        "role": userDetail.user_role,
        "firstname": userDetail.first_name,
        "lastname": userDetail.last_name
     
    }
})
 }




  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (username && password){
      authUser()

    }

  };

  if (user != null){
    navigate("/", { replace: true });
  }




  return (
 

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <RouterLink to="/" >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          </RouterLink>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="user name"
              autoFocus
              value={username} 
              onChange={(evt) => setUsername(evt.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password} 
               onChange={(evt) => setPassword(evt.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* <RouterLink to="/" className="deco-none " > */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            {/* </RouterLink> */}
    
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}