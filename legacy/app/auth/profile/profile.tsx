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
import { jwtDecode } from 'jwt-decode';

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
    // const storedRole = localStorage.getItem('role');
    // if (storedRole) {
    //   setRole(JSON.parse(storedRole));
    // }
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
    <div>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
          margin: '0 auto',
          padding: 3,
          marginTop: '50px',
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: '600px',
            padding: 3,
            boxShadow: 3,
            mb: showOrders ? 3 : 0,
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ width: 56, height: 56, mr: 2 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {user.userName}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {user.email}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Address:
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {user.address}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Password:
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              *********
            </Typography>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
            >
              <Button
                variant="contained"
                sx={{ color: 'white', bgcolor: 'black' }}
                onClick={() => router.push('/auth/editProfile')}
              >
                Modify Info
              </Button>
              {role === 'Seller' ? (
                <Button
                  variant="contained"
                  sx={{ color: 'white', bgcolor: 'black' }}
                  onClick={() => setOpen(true)}
                >
                  Add Product
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ color: 'white', bgcolor: 'black' }}
                  onClick={() => setShowOrders(!showOrders)}
                >
                  {showOrders ? 'Hide Orders' : 'Check Orders'}
                </Button>
              )}
              <Button
                variant="contained"
                sx={{ color: 'white', bgcolor: 'red' }}
                onClick={logOut}
              >
                Logout
              </Button>
            </Box>
          </CardContent>
        </Card>
        {showOrders && (
          <Card
            sx={{ width: '100%', maxWidth: '600px', padding: 3, boxShadow: 3 }}
          >
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
