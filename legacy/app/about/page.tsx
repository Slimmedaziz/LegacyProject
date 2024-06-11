import React from "react";
import Navbar from "../Navbar";
import { Grid, Box, Typography } from "@mui/material";
import Services from "../Services";


export default function About(){
 return (
   <div className="App" style={{backgroundColor:'darkred'}}>
     <Navbar/>
     <div style={{backgroundColor:'darkred',paddingBottom:'1%',paddingTop:'5%'}}>
     <Box
              sx={{
                 width: "90%",
                  margin: "0 auto" ,
                  marginBottom:"50px",
                boxShadow: 3,
                p: 2,
                bgcolor: "background.paper",
                minHeight: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                float:"center"
              }}
            >
     <Box sx={{ width: "80%", margin: "0 auto", mt: 4 }}>
       <Grid container spacing={4} alignItems="center">
         <Grid item xs={12} md={6}>
           <Typography variant="h3" gutterBottom>Our Story</Typography>
           <Typography paragraph>
             Launched in 2015, Exclusive is South Asia's premier online shopping
             marketplace with an active presence in Bangladesh. Supported by a wide
             range of tailored marketing, data, and service solutions, Exclusive has
             10,500 sellers and 300 brands and serves 3 million customers across the
             region.
           </Typography>
           <Typography paragraph>
             Exclusive has more than 1 million products to offer, growing at a very
             fast pace. Exclusive offers a diverse assortment in categories ranging
             from consumer goods to electronics and fashion.
           </Typography>
         </Grid>
         <Grid item xs={12} md={6}>
           <img 
             src="https://media.istockphoto.com/id/945682204/photo/young-attractive-girls-with-shopping-bags-in-the-city.jpg?s=612x612&w=0&k=20&c=FwM34xir1Jx36lLPLhZOQ8-5i_wnG_siQ1CarT2NuBw=" 
             alt="Shopping"
             style={{ width: '100%', height: 'auto' }}
           />
         </Grid>
       </Grid>
     </Box>
    
     

     <Services />
     </Box>
     </div>
   </div>
 );
}