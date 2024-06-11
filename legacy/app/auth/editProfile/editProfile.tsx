"use client"

import React, { useState, useEffect } from 'react';
import { useProfile } from '../../context/profileContext/profileContext';
import { useRouter } from 'next/navigation';
import Navbar from '../../Navbar';
import { Container, Box, Typography, Grid, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';

const EditProfile: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { user, updateUser } = useProfile();
  const router = useRouter();
  const role =localStorage.getItem('role')||''

  
  useEffect(() => {
    if (user) {
      setUsername(user.userName || '');
      setEmail(user.email || '');
      setAddress(user.address || '');
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match.');
      return;
    }
    try {
      if(user){
        await updateUser(user.id, { 
        userName: username,
        email: email,
        address: address,
        ...(currentPassword && { currentPassword }),
        ...(newPassword && { newPassword }),
      });
      setMessage('Profile updated successfully!');
      router.push('/auth/profile');
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been successfully updated.',
      });
      }
      
    } catch (error) {
      setMessage('Profile update failed. Please try again.');
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'An error occurred while updating your profile. Please try again.',
      });
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Box mt={4}>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Edit Your Profile
            </Typography>
          </div>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="background.paper"
                boxShadow={4}
                borderRadius={2}
                p={4}
                width="100%"
              >
                <form onSubmit={handleProfileUpdate}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth 
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    {role === "client" &&
                      <TextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />}
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Password Changes
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        variant="outlined"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="New Password"
                        variant="outlined"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        variant="outlined"
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        sx={{ marginBottom: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ marginRight: 2 ,backgroundColor:"black",
                          '&:hover': {
                            backgroundColor: 'white',
                            color: 'black',
                          },
                        }}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => router.push('/auth/profile')}
                        sx={{ marginRight: 2 ,backgroundColor:"red",
                          '&:hover': {
                            backgroundColor: 'darkred',
                            
                          },
                        }}

                      >
                        Cancel
                      </Button>
                    </Grid>
                    {message && (
                      <Grid item xs={12}>
                        <Typography color="error">{message}</Typography>
                      </Grid>
                    )}
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default EditProfile;
