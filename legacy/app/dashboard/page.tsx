"use client";

import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Grid, CssBaseline } from "@mui/material";
import ClientsTable from "./clientsTable";
import ProductsTable from "./products";
import Sellers from "./sellers";
import Charts from "./chart";
import SideBar from "./sideBar";
import OrdersTable from "./ordersTable";
import Extra from "./extra";

const Dashboard: React.FC = () => {
  const [showClients, setShowClients] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showSellers, setShowSellers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showCharts,setShowCharts]=useState(true)
 

  const separateModule = (module: string) => {
    setShowClients(module === "clients");
    setShowProducts(module === "products");
    setShowSellers(module === "sellers");
    setShowOrders(module === "orders");
    setShowCharts(module==="statistics")
  };

  const cardStyle = {
    margin: "20px",
    textAlign: "center",
    color: "#333",
    border: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
  };

  const headerStyle = {
    margin: "20px",
    textAlign: "center",
    color: "#333",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const userChartData = {
    labels: ['Sellers', 'Buyers'],
    datasets: [
      {
        label: 'Users',
        backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(255,99,132,0.4)', 'rgba(54,162,235,0.4)'],
        hoverBorderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)'],
        data: [30, 70],
      },
    ],
  };

  const productChartData = {
    labels: ['Electronics', 'Clothing', 'Home Appliances', 'Books', 'Toys'],
    datasets: [
      {
        label: 'Products',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [100, 150, 80, 120, 90],
      },
    ],
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideBar
        onProductsClick={() => separateModule("products")}
        onClientsClick={() => separateModule("clients")}
        onSellersClick={() => separateModule("sellers")}
        onOrdersClick={() => separateModule("orders")}
        onChartsClick={()=>separateModule("statistics")}
      />
      <Box sx={{ flexGrow: 1, padding: "20px", marginTop: "10px" }}>
        
        <Grid container spacing={3} sx={{ marginTop: "20px" }}>
          <Grid item xs={12}>
            {showClients && <ClientsTable />}
            {showProducts && <ProductsTable />}
            {showSellers && <Sellers />}
            {showOrders && <OrdersTable />}
            {showCharts && <Charts userChartData={userChartData} productChartData={productChartData} />}
          </Grid>
     
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
