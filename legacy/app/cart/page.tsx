'use client';
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  IconButton,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  Paper,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Navbar from '../Navbar';
import '../globals.css'
interface Item {
  id: number;
  name: string;
  picture: string;
  price: number;
  discountedPrice?: number;
  discount?: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('Items') || '[]') as Item[];
    setItems(storedItems);
  }, []);

  const updateQuantity = (id: number, quantity: number) => {
    const updatedItems = items
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + quantity;
          if (newQuantity > 0) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setItems(updatedItems);
    localStorage.setItem('Items', JSON.stringify(updatedItems));
  };

  const removeItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('Items', JSON.stringify(updatedItems));
  };

  const confirmRemoveItem = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item from the cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(id);
        Swal.fire('Removed!', 'The item has been removed from your cart.', 'success');
      }
    });
  };

  const emptyCart = () => {
    setItems([]);
    localStorage.removeItem('Items');
  };

  const confirmEmpty = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to empty your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, empty it!',
    }).then((result) => {
      if (result.isConfirmed) {
        emptyCart();
        Swal.fire('Emptied!', 'Your cart has been emptied.', 'success');
      }
    });
  };

  const proceedToBuy = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = jwtDecode(token);
        const userId = decoded.id;
        const productsArray = items.map((item) => [item.id, item.quantity]);
  
        const response = await axios.post('http://localhost:5000/Client/order', {
          products: JSON.stringify(productsArray),
          totalAmount: TotalPrice(),
          quantity: items.reduce((acc, item) => acc + item.quantity, 0),
          status: 'Pending',
          userId: userId,
          date: new Date(),
        });
  
        if (response.data.success) {
          Swal.fire('Order Placed', 'Your order has been placed successfully', 'success');
          emptyCart();
        } else {
          Swal.fire('Error', 'Failed to place order', 'error');
        }
      } else {
      
        Swal.fire({
          icon: 'error',
          title: 'Not Logged In',
          text: 'You are not logged in. Please sign up or log in.',
          showCancelButton: true,
          confirmButtonText: 'Sign Up',
          cancelButtonText: 'Log In',
          reverseButtons: true,
          
          confirmButtonColor: 'darkred',
          cancelButtonColor: 'darkred',
        }).then((result) => {
          if (result.isConfirmed) {
          
            router.push('/auth/signUp');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            
            router.push('/auth/login');
          }
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      Swal.fire('Error', 'Failed to place order', 'error');
    }
  };

  const coupon = () => {
    if (couponCode === 'EXCLUSIVE2024') {
      setDiscount(0.2);
      Swal.fire("coupon applied","20% reduction applied",'success')
    } else {
      setDiscount(0);
      Swal.fire('Invalid Coupon', 'The coupon code you entered is not valid.', 'error');
    }
  };

  const Pricedicounted = (item: Item) => {
    return item.discountedPrice ? item.discountedPrice : item.price;
  };

  const SubTotal = () => {
    const subTotal = items.reduce((acc, item) => acc + Pricedicounted(item) * item.quantity, 0);
    return subTotal;
  };

  const TotalPrice = () => {
    const total = items.reduce((acc, item) => acc + Pricedicounted(item) * item.quantity, 0);
    return total - total * discount;
  };

  return (
    <div>
      <Navbar/>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <b>Cart</b>
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => router.push('/shop')}
            sx={{ color: 'red', borderColor: 'red' }}
          >
            Return To Shop
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={confirmEmpty}
            sx={{ color: 'red', borderColor: 'red' }}
          >
            Empty Cart
          </Button>
        </Box>
        {items.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Subtotal</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box
                          display="flex"
                          alignItems="center"
                        //   onClick={() =>
                        //     router.push({
                        //       pathname: '/oneProduct',
                        //       query: { productId: item.id },
                        //     })
                        //   }
                        >
                          <img
                            src={item.picture}
                            alt={item.name}
                            style={{ width: '50px', marginRight: '10px' }}
                          />
                          <Typography variant="body1">{item.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>${Pricedicounted(item)}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <IconButton onClick={() => updateQuantity(item.id, -1)}>
                            <RemoveIcon />
                          </IconButton>
                          <TextField
                            value={item.quantity}
                            variant="outlined"
                            size="small"
                            sx={{ width: '50px', mx: 1 }}
                            inputProps={{
                              readOnly: true,
                              style: { textAlign: 'center' },
                            }}
                          />
                          <IconButton onClick={() => updateQuantity(item.id, 1)}>
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>${Pricedicounted(item) * item.quantity}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => confirmRemoveItem(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="space-between" mt={3}>
              <TextField
                label="Coupon Code"
                variant="outlined"
                size="small"
                sx={{ flexGrow: 1, mr: 2 }}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={coupon} sx={{ backgroundColor: 'red' }}>
                Apply Coupon
              </Button>
            </Box>
            <Box mt={3} p={2} border="1px solid #ccc">
              <Typography variant="h5">
                <b>Cart Total</b>
              </Typography>
              <Typography>Subtotal: ${SubTotal().toFixed(2)}</Typography>
              <Typography>Discount: {discount * 100}%</Typography>
              <Typography>Shipping: Free</Typography>
              <Typography variant="h6">
                <b>Total: ${TotalPrice().toFixed(2)}</b>
              </Typography>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" onClick={()=>proceedToBuy()} sx={{ mt: 2, backgroundColor: 'red' }}>
                  Proceed to Checkout
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <Typography variant="h6" component="p">
            Your cart is empty.
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default Cart;
