'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import OrdersList from './Orders';
import {jwtDecode} from 'jwt-decode';
import Navbar from '../../Navbar';
import AddProduct from './AddProduct';

interface User {
  id: number;
  userName: string;
  email: string;
  address: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<Partial<User>>({});
  const [showOrders, setShowOrders] = useState<boolean>(false);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem('role'))
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const userId: number = decoded.id;
      fetchUser(userId);
    }
  }, []);

  const fetchUser = async (userId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Client/get/${userId}`
      );
      if (response.data) {
        setUser(response.data);
      } else {
        console.error('No user data found in response:', response);
      }
    } catch (error) {
      console.error('Error fetching user information', error);
    }
  };

  const logOut = () => {
    setUser({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    router.push('/auth/login');
    localStorage.removeItem('wish');
  };

  return (
    <div style={{backgroundColor:'darkred'}}>
  <Navbar />
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', margin: '0 auto', padding: 3, marginTop: '50px' }}>
    <Card sx={{ width: '100%', maxWidth: '1200px', padding: 3, boxShadow: 3, mb: showOrders ? 3 : 0  }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3  }}>
          <Avatar sx={{ width: 86, height: 86, mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {user.userName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body1" color="textSecondary" sx={{ mr: 2 }}>
                {user.email}
              </Typography>
              <Button
                variant="contained"
                sx={{ color: 'white', bgcolor: 'red' ,
                  '&:hover': {
                            backgroundColor: 'darkred',
                          }}}
                onClick={logOut}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Address: {user.address}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Password: ********
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            sx={{ color: 'white', bgcolor: 'black', mr: 1,
              '&:hover': {
                            backgroundColor: 'white',
                            color: 'black',
                          } }}
            onClick={() => router.push('/auth/editProfile')}
          >
            Modify Info
          </Button>
          {role === 'seller' ? (
            <Button
              variant="contained"
              sx={{ color: 'white', bgcolor: 'black', mr: 1 ,
                '&:hover': {
                            backgroundColor: 'white',
                            color: 'black',
                          }
              }}
              onClick={() => setOpen(true)}
            >
              Add Product
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ color: 'white', bgcolor: 'black', mr: 1,
                '&:hover': {
                            backgroundColor: 'white',
                            color: 'black',
                          }
               }}
              onClick={() => setShowOrders(!showOrders)}
            >
              {showOrders ? 'Hide Orders' : 'Check Orders'}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
    {showOrders && (
      <Card sx={{ width: '100%', maxWidth: '1200px', padding: 3, boxShadow: 3 }}>
        <CardContent>
          <OrdersList />
        </CardContent>
      </Card>
    )}
  </Box>
  <AddProduct open={open} setopen={setOpen} />
</div>

  );
};

export default UserProfile;
