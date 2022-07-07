import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Api, { endpoints } from '../config/Api';
import { useNavigate, useParams} from 'react-router-dom';
import ModalComponent  from '../components/ModalComponent';
import ImageUpload from "../components/ImageUpload";
import CenterDiv from '../components/CenterDiv'
import { UserContext } from '../App'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function DashboardModify() {

  let {id } = useParams();
  let navigate = useNavigate();
  const uploadImageRef = React.useRef()



  const [open, setOpen] = React.useState(false);
  const [user, dispatch] = React.useContext(UserContext)
  const [userModified, setUserModified] = React.useState(user)
  const [password, setPassword] = React.useState("")

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);





  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);


    let updateUser = async () => {

      var formData = new FormData();
      // formData.append("avatar", uploadImageRef.current.files[0])
      formData.append("avatar", uploadImageRef.current.files[0])
      formData.append("first_name", userModified.firstname)
      formData.append("last_name", userModified.lastname)
      formData.append("username", userModified.username)
    //   formData.append("email", data.get('email'))
      formData.append("password", password)
      
      const res = await Api.patch(endpoints['user-detail'](id)
      , formData,
      {
        headers: {
           'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      }
      ).then((res) => {
        handleOpen()
        console.log("Res: "+res.data)
  
      }).catch(err => {
        if(err.response.status === 400){
          alert("Avatar required")
        }
      })

    }

      if(userModified.username.lenght!==0 &&password.length!==0 ){
      
          updateUser()


    }
    else{
        alert("Username or password is invalid")
    }



  };


  const handleLogout = () => {
    dispatch({
      "type": "logout",
      "payload": {
          "username": ""
      }
  })
  }

  const handleSignIn = () => {
    handleLogout()
    navigate('/sign-in')
  }

  console.log(userModified)


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
           <ModalComponent handleOpen={handleOpen} open={open} handleClose={handleClose}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
             Tài khoản của bạn đã cập nhật thành công
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Vui lòng đăng nhập lại
            </Typography>
            <Button
              type=""
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </ModalComponent>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cập nhật thông tin tài khoản
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
              
                  autoFocus
                  value={userModified.firstname}
                  onChange={(e) => {
                      setUserModified({...userModified, firstname: e.target.value})
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  value={userModified.lastname}
                  onChange={(e) => {
                      setUserModified({...userModified, lastname: e.target.value})
                  }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
         
                  name="username"
                  autoComplete="username"
                  value={userModified.username}
                  onChange={(e) => {
                      setUserModified({...userModified, username: e.target.value})
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                     setPassword(e.target.value)
                  }}
                />
              </Grid>
                <Grid item xs={12}>

                <Typography align="center" >
                Avatar
              </Typography>
              </Grid>

              <Grid item xs={12}>
              <CenterDiv>
         
               <ImageUpload cardName="Input Image"  ref={uploadImageRef}  />
             </CenterDiv>
             </Grid>

   
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cập nhật
            </Button>

          </Box>
        </Box>
        
        <Copyright sx={{ mt: 5 }} />
      </Container>

  );
}