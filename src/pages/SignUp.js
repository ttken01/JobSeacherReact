import * as React from 'react';
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
import Api, { endpoints } from '../config/Api';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../components/ModalComponent';
import ImageUpload from "../components/ImageUpload";
import CenterDiv from '../components/CenterDiv'

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


export default function SignUp() {

  let navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  // const [selectedFile, setSelectedFile] = React.useState()
  const avatar = React.useRef()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSignIn = () => {
    navigate('/sign-in')
  }

  // console.log("file: " + selectedFile)


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let createUser = async () => {

      var formData = new FormData();
      formData.append("avatar", avatar.current.files[0])
      formData.append("first_name", data.get('firstName'))
      formData.append("last_name", data.get('lastName'))
      formData.append("username", data.get('username'))
      formData.append("email", data.get('email'))
      formData.append("password", data.get('password'))


      let res = await Api.post(endpoints['users'], formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          handleOpen()
    
        }).catch(err => {
          if(err.response.status === 400){
            alert("Tên đăng nhập hơạc email đã tồn tại")
          }
        })
    }

    if(avatar.current.files[0] && data.get('firstName') && data.get('lastName')
    && data.get('email') && data.get('password') ){
      createUser()

   }
   else{
      alert("Please fill all fields")
   }

  };



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
            Tài khoản của bạn đã đăng kí thành công
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Bạn có thể đăng nhập ngay bây giờ
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
          Sign up
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
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
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
              />
            </Grid>
            <Grid item xs={12}>

              <Typography align="center" >
                Avatar
              </Typography>
            </Grid>

            <Grid item xs={12}>

              <CenterDiv>

                <ImageUpload cardName="Input Image" ref={avatar} />
              </CenterDiv>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Copyright sx={{ mt: 5 }} />
    </Container>

  );
}