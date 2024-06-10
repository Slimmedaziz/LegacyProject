'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  Rating,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import Shop from './shop/page';
import Wishlist from './wishlist/page';
interface Product {
  id: number;
  name: string;
  picture: string;
  price: number;
  discountedPrice?: number;
  discount?: number;
  stock: number;
  userId: number;
  rating: GLfloat;
  numOfRating: number;
  // quantity: number;
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  isWishlist: Boolean;
  setUpdate?: Function;
  update?: Boolean;
}

interface Item extends Product {
  quantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  isWishlist,
  update,
  setUpdate,
}) => {
  const router = useRouter();
  const [AddToCart, setAddToCart] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [numOfRate, setNumOfRate] = useState(0);
  const [newRate, setNewRate] = useState<GLfloat>(0);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [counter, setCounter] = useState(localStorage.getItem('counter') || 0);
  const [wishes, setWishes] = useState(localStorage.getItem('wish') || 0);

  useEffect(() => {
    localStorage.setItem('counter', JSON.stringify(counter));
    localStorage.setItem('wishes', JSON.stringify(wishes));
  }, [counter, wishes]);
  localStorage.removeItem('counter');
  localStorage.removeItem('wishes');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      setUserId(decoded.id as number);
    }
  }, []);

  const MouseHover = () => {
    setAddToCart(!AddToCart);
  };

  const addToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (user) {
      let cartItems: Item[] = JSON.parse(localStorage.getItem('Items') || '[]');
      setCounter(cartItems.length);
      const existingItem = cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          ...product,
          quantity: 1,
        });
      }
      localStorage.setItem('Items', JSON.stringify(cartItems));
      Swal.fire({
        icon: 'success',
        title: 'Added to cart',
        text: `${product.name} has been added to your cart!`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const addToWishlist = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (user) {
      console.log('userId:', userId);
      console.log('product.id:', product.id);
      try {
        await axios.post('http://localhost:5000/Client/wishlist/add', {
          userId: userId,
          productId: product.id,
        });
        let wishlistItems: Item[] = JSON.parse(
          localStorage.getItem('wish') || '[]'
        );
        const existingItem = wishlistItems.find(
          (item) => item.id === product.id
        );
        if (!existingItem) {
          wishlistItems.push({
            ...product,
            quantity: 1,
          });
          setWishes(wishlistItems.length);
          localStorage.setItem('wish', JSON.stringify(wishlistItems));
        }

        Swal.fire({
          icon: 'success',
          title: 'Added to wishlist',
          text: `${product.name} has been added to your wishlist!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error: any) {
        console.error('Error adding to wishlist:', error);
        let errorMessage =
          'There was an error adding the item to your wishlist.';
        if (
          error.response &&
          error.response.data === 'Item is already in the wishlist'
        ) {
          errorMessage = 'Item is already in your wishlist.';
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else router.push('/signup');
  };

  const removeFromWishlist = async (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    try {
      await axios.delete('http://localhost:5000/Client/wishlist/remove', {
        data: { userId: userId, productId: productId },
      });
      Swal.fire({
        icon: 'success',
        title: 'Removed from wishlist',
        text: 'Product has been removed from your wishlist!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error removing the item from your wishlist.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const addRatings = async (rate: number) => {
    const productId: number = product.id;
    console.log(rate,"ratee");
    
    console.log("rate",(product.rating * product.numOfRating + rate) /
    (product.numOfRating+ 1),);
    
    if (user) {
      try {
        await axios
          .put(`http://localhost:5000/Client/rati/${productId}`, {
            rating:
              (product.rating * product.numOfRating + rate) /
              (product.numOfRating + 1),
          })
          .then(() => {
            setUpdate ? setUpdate(!update) : null;
          });
        // setNewRate(rate);
        Swal.fire({
          icon: 'success',
          title: 'rating updated',
          text: `${product.name} ${rate} stars !!`,
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        console.error('Error updating rating:', error);
      }
    } else router.push('/signup');
  };

  return (
    <Card
      onClick={onClick}
      onMouseEnter={MouseHover}
      onMouseLeave={MouseHover}
      sx={{ position: 'relative', maxWidth: '340px', cursor: 'pointer' }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '340px',
          height: '340px',
          margin: 'auto',
        }}
      >
        <img
          src={product.picture}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {product.discount && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: 'red',
              color: 'white',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.875rem',
            }}
          >
            -{product.discount}%
          </Box>
        )}
        <Button
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'black',
            color: 'white',
            display: AddToCart ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': { backgroundColor: 'black' },
          }}
          disableRipple
          onClick={(e) => {
            addToCart(e, product);
          }}
        >
          Add to cart <ShoppingCartIcon sx={{ ml: 1 }} />
        </Button>
      </div>
      <CardContent sx={{ textAlign: 'center', padding: '10px' }}>
        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
          {product.name}
        </Typography>

        <Rating
          name="simple-controlled"
          precision={0.5}
          defaultValue={product.rating}
          max={5}
          // value={newRate}
          onClick={(e) => {
            e.stopPropagation();
            const value = parseFloat((e.target as HTMLInputElement).value);
            
            console.log(value);
            
            if (value) setNewRate((value));
            if (value ) {
              setNumOfRate(numOfRate + 1);
              addRatings(value);
              // console.log('target value', parseInt(newRate));
              console.log(
                'numOfRate',
                numOfRate,
                `rating ${product.name}`,
                newRate
              );
            }
          }}
          // onClick={(e) => {

          //   e.stopPropagation();
          //   if (newRate !== null) {
          //     setNumOfRate(numOfRate + 1);
          //     addRatings(e, newRate);
          //   console.log('numOfRate', numOfRate, 'newrate', newRate);
          //   }
          // }}
        ></Rating>
        <Typography>{product.numOfRating}</Typography>

        {product.discount ? (
          <>
            <Typography
              variant="body2"
              sx={{ textDecoration: 'line-through', color: 'black' }}
            >
              ${product.price}
            </Typography>
            <Typography variant="h6" sx={{ color: 'red' }}>
              ${product.discountedPrice}
            </Typography>
          </>
        ) : (
          <Typography variant="h6" sx={{ color: 'red' }}>
            ${product.price}
          </Typography>
        )}
        {isWishlist ? (
          <IconButton
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              color: 'black',
              display: 'block',
            }}
            onClick={(e) => removeFromWishlist(e, product.id)}
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              color: 'black',
              display: 'block',
            }}
            onClick={(e) => addToWishlist(e, product)}
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
