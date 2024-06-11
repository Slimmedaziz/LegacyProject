import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  products: string;
}

const Extra = () => {
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const ordersResponse = await axios.get<Order[]>('http://localhost:5000/Admin/orders');
      const orders: Order[] = ordersResponse.data;
      setTotalOrders(orders.length);

 
      const income = orders.reduce((total: number, order: Order) => total + order.totalAmount, 0);
      setTotalIncome(income);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h4">{totalOrders}</Typography>
              
                <Typography color="textSecondary">April 2022</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Income</Typography>
                <Typography variant="h4">${totalIncome.toFixed(2)}</Typography>
                <PieChart
  series={[
    {
      data: [
        { id: 0, value: 10, label: 'item' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
      ],
    },
  ]}
  width={400}
  height={200}
/>
                <Typography color="textSecondary">April 2022</Typography>
              </CardContent>
            </Card>
          </Grid>
          
        </Grid>
      </Box>
    </Container>
  );
};

export default Extra;
