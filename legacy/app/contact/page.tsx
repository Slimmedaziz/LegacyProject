import React from "react";
import Navbar from "../Navbar";
import { Grid, Box, Typography, TextField, Button, Divider } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function Contact(): JSX.Element {
  return (
    <div className="App">
      <Navbar />
      <div style={{backgroundColor:'darkred',paddingBottom:'1%',paddingTop:'1%'}}>
      <Box sx={{ width: "90%", margin: "0 auto" ,marginBottom:"50px"}}>
        <Typography variant="h4" sx={{ mb: 2 ,marginTop:"60px" ,color:"white"}}>
        <b>  Contact </b>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                boxShadow: 3,
                p: 2,
                bgcolor: "background.paper",
                minHeight: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box display="flex" alignItems="left" mb={2}>
                <PhoneIcon sx={{ color: "red" }} />
                <Typography variant="h5" sx={{ ml: 1 }}>
                  Call  us
                </Typography>
              </Box>
              <Typography variant="body1" textAlign="left" mb={2}>
                We are available 24/7,  7 days a week. <br />
                Phone: +8801611112222
              </Typography>
              <Divider sx={{ my: 2, width: '100%' }} />
              <Box display="flex" alignItems="left" mb={2}>
                <EmailIcon sx={{ color: "red" }} />
                <Typography variant="h5" sx={{ ml: 1 }}>
                  Write to us
                </Typography>
              </Box>
              <Typography variant="body1" textAlign="left">
                Fill out our form and we will  contact you <br /> within 24 hours. <br />
                Emails: customer@exclusive.com <br />
                Emails: support@exclusive.com
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box
              sx={{
                boxShadow: 3,
                p: 2,
                bgcolor: "background.paper",
                minHeight: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Your name"
                    sx={{ bgcolor: "lightgrey" }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Your email"
                    sx={{ bgcolor: "lightgrey" }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Your phone"
                    sx={{ bgcolor: "lightgrey" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    placeholder="Your message"
                    sx={{ bgcolor: "lightgrey" }}
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button variant="contained" sx={{ backgroundColor: "red" }}>
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      </div>
    </div>
  );
}

export default Contact;
