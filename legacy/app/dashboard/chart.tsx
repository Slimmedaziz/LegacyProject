import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Card, CardContent, Typography, Box, Grid ,Paper} from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  picture: string;
  userId: number;
}
const styles = {
  
  paper: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },}
interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: string[];
}

const Charts: React.FC = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsResponse = await axios.get<Product[]>('http://localhost:5000/admin/products');
      const usersResponse = await axios.get<User[]>('http://localhost:5000/admin/users');
      setProductsData(productsResponse.data);
      setUsersData(usersResponse.data);
      console.log(usersResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const productsChartData = {
    labels: productsData.map(product => product.name),
    datasets: [
      {
        label: 'Stock',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: productsData.map(product => product.stock),
      },
    ],
  };

  const userRoleCounts = usersData.reduce(
    (acc, user) => {
      if (user.role.includes('client')) {
        acc.buyers += 1;
      } else if (user.role.includes('seller')) {
        acc.sellers += 1;
      }
      return acc;
    },
    { sellers: 0, buyers: 0 }
  );

  const usersChartData = {
    labels: ['Sellers', 'Buyers'],
    datasets: [
      {
        label: 'Users',
        backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)'],
        borderWidth: 2,
        data: [userRoleCounts.buyers, userRoleCounts.sellers],
      },
    ],
  };

  return (
    <Paper style={styles.paper}>
    <Box sx={{ flexGrow: 1, padding: '20px', marginTop: '10px',width:'90%', justifyContent: 'center' ,ml:7 }}>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom sx={{textAlign:'center'}}>
                Users (Sellers vs Buyers)
              </Typography>
              <Doughnut data={usersChartData}  />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%'}}>
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom sx={{textAlign:'center',mb:17}}>
                Products by Stock
              </Typography>
              <Bar data={productsChartData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
    </Paper>
  );
};

export default Charts;
