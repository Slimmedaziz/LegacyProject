import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Modal } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface DecodedToken {
    id: string;
}

interface Props {
    open: boolean;
    setopen: (a:boolean) => void;
  }
const AddProduct: React.FC<Props> = ({ open,setopen }) => {
    const [userId, setUserId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [picture, setPicture] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [stock, setStock] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode<DecodedToken>(token);
            setUserId(decoded.id);
        }
    }, []);

    const addProduct = async () => {
        const newProduct = {
            name,
            price,
            picture,
            category,
            stock,
            description,
            userId
        };

        try {
            await axios.post("http://localhost:5000/Seller/add", newProduct);
            setName("");
            setPrice("");
            setPicture("");
            setCategory("");
            setStock("");
            setDescription("");

            Swal.fire({
                title: 'Success!',
                text: 'Product added successfully',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-confirm-button',
                }
            }).then(() => {
                router.push('/shop');
            });

        } catch (error) {
            console.error("Error adding product:", error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error adding the product',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setopen(false)
        Swal.fire({
            title: 'Are you sure?',
            text: `Add the following product?\n
                   Name: ${name}\n
                   Price: ${price}\n
                   Picture: ${picture}\n
                   Category: ${category}\n
                   Stock: ${stock}\n
                   Description: ${description}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, add it!',
            cancelButtonText: 'No, cancel',
            customClass: {
                confirmButton: 'swal-confirm-button',
                cancelButton: 'swal-cancel-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                addProduct();
            }else if (result.dismiss === Swal.DismissReason.cancel) {
                setopen(true);
            }
        });
    };

    return (
        <Box   sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            margin: 'auto',
          }}>
            <Modal
                open={ open}
                onClose={() => setopen(false)} 
                aria-labelledby="add-new-product"
                aria-describedby="add-a-new-product-to-the-store"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
            >
                <Box sx={{ width: '50%', padding: 3, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
                    <Typography variant="h4" gutterBottom align="center">Add New Product</Typography>
                    <form onSubmit={submit}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            sx={{ '& .Mui-focused': { color: 'red' }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'red' } }}
                        />
                        <TextField
                            label="Price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            sx={{ '& .Mui-focused': { color: 'red' }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'red' } }}
                        />
                        <TextField
                            label="Picture URL"
                            value={picture}
                            onChange={(e) => setPicture(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            sx={{ '& .Mui-focused': { color: 'red' }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'red' } }}
                        />
                        <TextField
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            sx={{ '& .Mui-focused': { color: 'red' }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'red' } }}
                        />
                        <TextField
                            label="Stock"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            sx={{ '& .Mui-focused': { color: 'red' }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'red' } }}
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            sx={{ '& .Mui-focused': { color: 'red' }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'red' } }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>
                                Add Product
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
           
        </Box>
    );
};

export default AddProduct;
