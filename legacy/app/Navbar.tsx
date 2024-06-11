'use client';
import {
  Badge,
  AppBar,
  Toolbar,
  Button,
  Box,
  InputBase,
  IconButton,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar: React.FC = () => {
 const [user,setUser]= useState('')
  const[counter,setCounter]=useState(JSON.parse(localStorage.getItem('Items')|| '[]').length)
  const [wishes, setWishes] = useState(
    JSON.parse(localStorage.getItem('wish') || '[]').length
  );
  useEffect(() => {  
    
    const storedUser = localStorage.getItem('user')|| '';
    if(storedUser)setUser(JSON.parse(storedUser));
    setCounter(counter)
    setWishes(wishes);
  },[counter,wishes]);
  return (
    <AppBar
      position="sticky"
      style={{ color: 'black', backgroundColor: 'white' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit">
            <b>exclusive</b>
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'black' }}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link
            href="/contact"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <Button color="inherit">Contact</Button>
          </Link>
          <Link
            href="/about"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <Button color="inherit">About</Button>
          </Link>
          {user? <Link
            href="/shop"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <Button color="inherit">Shop</Button>
          </Link>:
          <Link
            href="/auth/signUp"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <Button color="inherit">SignUp</Button>
          </Link>
          }
          
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'lightgrey',
            borderRadius: 1,
            marginLeft: 25,
            padding: '0 10px',
          }}
        >
          <InputBase placeholder="What are you looking for?" />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
          <Link
            href="/wishlist"
            style={{ textDecoration: 'none', color: 'black' }}
          >
           <IconButton color="inherit">
              <Badge
                badgeContent={wishes}
                color="primary"
                sx={{ '& .MuiBadge-badge': { backgroundColor: 'red' } }}
              >
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link href='/cart'  style={{textDecoration:"none",color:"black"}}>
          <IconButton color="inherit">
            
            <Badge badgeContent={counter} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: 'red' } }}>
            <ShoppingCartIcon />
            </Badge>
          </IconButton>
          </Link>
          {user && (
            <Link
              href="/auth/profile"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
