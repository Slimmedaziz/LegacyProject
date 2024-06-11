import React, { useState } from 'react';
import { useAuth } from '../../context/authContext/authContext';
import { useRouter } from 'next/navigation';
import Navbar from '../../Navbar';
import axios from 'axios';

import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Link,
} from '@mui/material';

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('Client');
  const [message, setMessage] = useState<string>('');

  const { setToken,fetchUser,loginAction } = useAuth();
  const router = useRouter();

  const handleLogIn = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/Client/${username}`);
      const user = response.data;
      const loginResponse : any = await loginAction({
        userName: username ,
        password: password,
        email:user.email,
        role: user.role,
      },'login');
      const token = loginResponse.data.token;
      setToken(token);
      localStorage.setItem('token', token);
      await fetchUser(user);
      
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setMessage('User not found. Please check your username.');
      } else {
        setMessage(`Log in failed.wrong password  `);
      }
    }
  };

  return (
    <div>
    <Navbar />
    <div style={{backgroundColor:'darkred',paddingBottom:'11%',paddingTop:'11%'}}>
      
      <Box mt={4}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={9}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="background.paper"
              boxShadow={4}
              borderRadius={2}
              p={4}
              width="90%"
              maxWidth="900px"
              margin="0 auto"
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Grid>
                    <img
                      src="https://s3-alpha-sig.figma.com/img/75f3/94c0/a1c7dc5b68a42239311e510f54d8cd59?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nxMmcLhDtU4rZjNqF~3dko2JRdwdfpOvZKhGTpTt1aHOlqVteTtrRlBp3HeK~hYWrTe7a8rpwm7LFLhnHGTGVc~NcfXoWkEMV1ibyMuNzL92tUIQ-O4H9fbZ1FRiyJEYfAotxkSleK15Z~REekYxnCE5yYmsDBfRLkgOFYUHOqm1veciY3mvSruMfp0d8ivEFPyP58797yqnYeAnlVR4kYi0F588gMvxhjpUcKk8FHRAorAPnnBhQKe2SEs9UkKmJyQ6PEEAPc04~Zfh9plGg9K6WtZ2rwjU70Y6VhuG~HnaAqlnJ5n2fj5kw0D6zVDiTA-oEDeLoj4uPhVPNb51-A__"
                      alt="Login"
                      style={{ width: '320px', height: '350px' }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      Log in To Exclusive
                    </Typography>
                  </Box>
                  <form onSubmit={handleLogIn}>
                    <Typography variant="body1">
                      Enter your details below
                    </Typography>
                    <TextField
                      fullWidth
                      label="Username"
                      variant="outlined"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      sx={{ marginBottom: 2 }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      sx={{
                        backgroundColor: '#ff0000',
                        '&:hover': { backgroundColor: '#cc0000' },
                      }}
                    >
                      Login
                    </Button>
                    <Typography variant="body1" sx={{mt:2}}>
                      Don't have an account?{' '}
                      <Link
                        component="button"
                        onClick={() => router.push('/auth/signUp')}
                        sx={{ color: '#ff0000' ,float:'right'}}
                      ><Button 
                      variant="contained"
                      color="primary"
                      sx={{ bgcolor: 'red',
                       display:'block',
                       float:'right',
                       '&:hover': {
                           backgroundColor: 'darkred',
                         }
                      }}
                     >
                        Sign Up
                        </Button>
                      </Link>
                    </Typography>
                    {message && (
                      <Box mt={2}>
                        <Typography>{message}</Typography>
                      </Box>
                    )}
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
    </div>
  );
}

export default Login;