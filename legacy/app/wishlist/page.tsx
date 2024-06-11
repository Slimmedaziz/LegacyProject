"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Box, Button } from "@mui/material";
import ProductCard from "../ProductCard";
import Navbar from "../Navbar";
import {jwtDecode} from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const [wishes, setWishes] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<{ id: string }>(token);
      setUserId(decoded.id);
    }
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (userId) {
        try {
          const response = await axios.get<any[]>(
            `http://localhost:5000/Client/wishlist/${userId}`
          );
          setWishlistItems(response.data);
          setWishes(response.data.length);
          localStorage.setItem('wish', JSON.stringify(response.data));
        } catch (error) {
          console.error('Error fetching wishlist items', error);
        }
      }
    };

    fetchWishlist();
  }, [userId]);

  const moveAllToBag = async () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("Items") || "[]") as any[];
      for (const product of wishlistItems) {
        cartItems.push({
          ...product,
          quantity: 1,
          discountedPrice: product.discountedPrice,
          discount: product.discount,
        });
      }
      localStorage.setItem("Items", JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error moving all items to cart', error);
    }
  };

  const handleRemoveFromWishlist = (productId: number) => {
    setWishlistItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  return (
    <div>
      <Navbar />
      <div style={{ width: '90%', margin: '0 auto' }}>
        <Box sx={{ padding: 3, marginTop: '50px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <h2>My Wishlist</h2>
            </Box>
            <Link href="/cart">
              <Button
                variant="contained"
                style={{ color: "white", backgroundColor: "red" }}
                onClick={moveAllToBag}
              >
                Move All to Bag
              </Button>
            </Link>
          </Box>
          <Grid container spacing={3}>
            {wishlistItems.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard
                  product={product}
                  isWishlist={true}
                  onClick={() => router.push(`/Oneproduct/${product.id}`)}
                  onRemove={handleRemoveFromWishlist} // Pass the function as a prop
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Wishlist;
