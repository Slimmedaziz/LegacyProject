"use client";
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, Grid, CardMedia } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    [key: string]: any;
}

interface Order {
    id: number;
    userId: number;
    products: string;
    status: string;
    totalAmount: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    picture: string;
}

const OrdersList: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded: User = jwtDecode(token);
            setUser(decoded);
            fetchOrders(decoded.id);
        }
    }, []);

    const fetchOrders = async (userId: number) => {
        try {
            const response = await axios.get<Order[]>("http://localhost:5000/admin/orders");
            const userOrders = response.data.filter(order => order.userId === userId);
            setOrders(userOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        axios.get<Product[]>('http://localhost:5000/Client/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const prodNames = (id: number): string | undefined => {
        const product = products.find(prod => prod.id === id);
        return product ? product.name : undefined;
    };

    const prodImages = (id: number): string | undefined => {
        const product = products.find(prod => prod.id === id);
        return product ? product.picture : undefined;
    };

    const prodPrices = (id: number): number | undefined => {
        const product = products.find(prod => prod.id === id);
        return product ? product.price : undefined;
    };

    return (
        <Box sx={{ width: '90%', margin: '0 auto', padding: 3, marginTop: '50px' }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>My Orders List</Typography>
    </Box>
    <List>
        {orders.map(order => (
            <ListItem key={order.id} sx={{ padding: 0 }}>
                <Card sx={{ width: '100%', mb: 2, padding: 2, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                           <b> Order ID:</b> {order.id}
                        </Typography>
                        <Grid container spacing={2}>
                            {JSON.parse(order.products).map((product: [number, number]) => {
                                const productId = product[0];
                                const quantity = product[1];
                                const price = prodPrices(productId);
                                const subtotal = price ? price * quantity : 0;
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={productId} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, boxShadow: 3 }}>
                                            <CardMedia
                                                component="img"
                                                image={prodImages(productId)}
                                                alt={prodNames(productId)}
                                                sx={{ width: 120, height: 120, objectFit: 'cover', marginRight: 2 }}
                                            />
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography variant="body1">{prodNames(productId)}</Typography>
                                                <Typography variant="body2">Quantity: {quantity}</Typography>
                                                <Typography variant="body2">Price: ${price}</Typography>
                                                <Typography variant="body2">Subtotal: ${subtotal}</Typography>
                                            </Box>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                            <b>Status:</b> {order.status}
                        </Typography>
                        <Typography variant="h4" sx={{ float: 'right', color:'darkred' }}>
                            Total: ${order.totalAmount}
                        </Typography>
                    </CardContent>
                </Card>
            </ListItem>
        ))}
    </List>
</Box>

    
    
    );
};

export default OrdersList;
