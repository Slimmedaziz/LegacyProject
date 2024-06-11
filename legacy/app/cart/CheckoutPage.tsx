// CheckoutPage.tsx
import { useState } from 'react';
import { Typography, Box, Grid, TextField, FormControl, Select, MenuItem, Button } from '@mui/material';
import Swal from 'sweetalert2';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handlePaymentMethodChange = (event: React.ChangeEvent<{ value: any }>) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayment = async () => {
    try {
      // Your payment logic here...
      Swal.fire('Payment Successful', 'Your payment has been processed successfully.', 'success');
    } catch (error) {
      console.error('Error processing payment:', error);
      Swal.fire('Error', 'Failed to process payment. Please try again.', 'error');
    }
  };

  const proceedToBuy = () => {
    Swal.fire({
      title: 'Proceed to Buy',
      text: 'Are you sure you want to proceed to buy?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handlePayment();
      }
    });
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Checkout
      </Typography>
      <Box maxWidth="600px" margin="0 auto">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Select
                value={paymentMethod}
                onChange={(e) => handlePaymentMethodChange(e)}
                displayEmpty
                inputProps={{ 'aria-label': 'Payment Method' }}
              >
                <MenuItem value="creditCard">Credit Card</MenuItem>
                <MenuItem value="payOnDelivery">Pay on Delivery</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {paymentMethod === 'creditCard' && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  variant="outlined"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  variant="outlined"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CVV"
                  variant="outlined"
                  value={cvv}
                  onChange={(e) => setCVV(e.target.value)}
                />
              </Grid>
            </>
          )}
        </Grid>
        <Button variant="contained" color="primary" onClick={proceedToBuy} sx={{ mt: 2 }}>
          Confirm Payment
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
