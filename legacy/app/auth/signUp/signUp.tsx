"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/authContext/authContext';
import Navbar from '../../Navbar';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
} from '@mui/material';

interface SignupData {
  userName: string;
  email: string;
  password: string;
  role: string;
  address: string; 
  CIN?: string;
}

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('Client');
  const [password, setPassword] = useState<string>('');
  const [address, setAddress] = useState<string>(''); 
  const [message, setMessage] = useState<string>('');
  const [CIN, setCIN] = useState<string>('');
  const [adress, setAdress]=useState<string>('')
  const router = useRouter();
  const { loginAction } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginAction(
        {
          userName: username,
          email: email,
          password: password,
          role: role,
          address: address,
          CIN: CIN
        } as SignupData,
        'signup'
      ).then(() => {
        setMessage('Signup successful!');
      });
    } catch (error) {
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
    <div style={{backgroundColor:'darkred',paddingBottom:'6%',paddingTop:'4%'}}>
      
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
                   <Typography variant="h5" gutterBottom>
                        Membership Application
                      </Typography>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/75f3/94c0/a1c7dc5b68a42239311e510f54d8cd59?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nxMmcLhDtU4rZjNqF~3dko2JRdwdfpOvZKhGTpTt1aHOlqVteTtrRlBp3HeK~hYWrTe7a8rpwm7LFLhnHGTGVc~NcfXoWkEMV1ibyMuNzL92tUIQ-O4H9fbZ1FRiyJEYfAotxkSleK15Z~REekYxnCE5yYmsDBfRLkgOFYUHOqm1veciY3mvSruMfp0d8ivEFPyP58797yqnYeAnlVR4kYi0F588gMvxhjpUcKk8FHRAorAPnnBhQKe2SEs9UkKmJyQ6PEEAPc04~Zfh9plGg9K6WtZ2rwjU70Y6VhuG~HnaAqlnJ5n2fj5kw0D6zVDiTA-oEDeLoj4uPhVPNb51-A__"
                    alt="Signup"
                    style={{ width: '320px', height: '350px' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <form onSubmit={handleSignup}>
                    <Grid justifyContent="center" display="flex">
                     
                    </Grid>
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
                      label="Email"
                      variant="outlined"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{ marginBottom: 2 }}
                    >
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        labelId="role-label"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value as string)}
                        label="Role"
                      >
                        <MenuItem value="Client">Client</MenuItem>
                        <MenuItem value="Seller">Seller</MenuItem>
                      </Select>
                    </FormControl>

                    {role === 'Seller' ? (
                      <TextField  

                        fullWidth
                        label="CIN"
                        variant="outlined"
                        type="text"
                        value={CIN}
                        onChange={(e) => setCIN(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />
                    ):  <TextField
                    fullWidth
                    label="Adress"
                    variant="outlined"
                    type="text"
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                    sx={{ marginBottom: 2 }}
                  />}
                    <Button
                      type="submit"
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
                    <Typography variant="body1" sx={{marginTop:'15%'}}>
                      Already have an account?{' '}
                      <Link
                        component="button"
                        onClick={() => router.push('/auth/login')}
                        sx={{ float:'right'}}
                      >
                        <Button 
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
                        Log In
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

export default Signup;
