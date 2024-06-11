import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, TextField, Modal, Box ,Paper} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2'

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
  header: {
    textAlign: 'center',
    backgroundColor: '#0a0a0a',
    color: 'white',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
  tableHeadRow: {
    backgroundColor: 'black',
  },
  tableHeadCell: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },

  modal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: '#ffffff',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  },
  input: {
    marginBottom: '15px',
  },
  button: {
    marginTop: '15px',
    backgroundColor: '#5b3594',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#452780',
    },
  },
  actionButton: {
    marginLeft: '10px',
    backgroundColor: '#5e35b1',
    color: 'black',
    '&:hover': {
      backgroundColor: '#452780',
    },
  },
  addButton: {
    marginBottom: '20px',
    backgroundColor: '#5b3594',
    color: 'black',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  
  
    paper: {
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
};

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modify, setModify] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: 0,
    name: "",
    price: 0,
    picture: "",
    category: "",
    stock: 0,
    description: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    picture: "",
    category: "",
    stock: 0,
    description: "",
    userId: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>("http://localhost:5000/Admin/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId: number) => {
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#5e35b1',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete<Product[]>(`http://localhost:5000/admin/products/${productId}`);
          setProducts(products.filter((product) => product.id !== productId));
       
          Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
        } catch (error) {
          console.error("Error deleting product:", error);
       
          Swal.fire('Error!', 'Failed to delete the product.', 'error');
        }
      }
    });
  };

  const updateProduct = async () => {
    try {
      await axios.put<Product[]>(
        `http://localhost:5000/admin/products/${currentProduct.id}`,
        currentProduct
      );
      fetchProducts();
      handleCloseModify();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const addProduct = async () => {
    try {
      const { userId, ...productData } = newProduct;
      await axios.post<Product[]>("http://localhost:5000/admin/products/add", productData);
      fetchProducts();
      handleCloseAdd();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleOpenModify = (product: Product) => {
    setCurrentProduct(product);
    setModify(true);
  };

  const handleCloseModify = () => {
    setModify(false);
    setCurrentProduct({
      id: 0,
      name: "",
      price: 0,
      picture: "",
      category: "",
      stock: 0,
      description: "",
    });
  };

  const handleOpenAdd = () => {
    setAddModalOpen(true);
  };

  const handleCloseAdd = () => {
    setAddModalOpen(false);
    setNewProduct({
      name: "",
      price: 0,
      picture: "",
      category: "",
      stock: 0,
      description: "",
      userId: 0,
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      
      <Paper style={styles.paper}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={styles.tableHeadRow}>
              <TableCell style={styles.tableHeadCell}>Name</TableCell>
              <TableCell style={styles.tableHeadCell}>Image</TableCell>
              <TableCell style={styles.tableHeadCell}>Category</TableCell>
              <TableCell style={styles.tableHeadCell}>Price</TableCell>
              <TableCell style={styles.tableHeadCell}>Stock</TableCell>
              <TableCell style={styles.tableHeadCell}>Description</TableCell>
              <TableCell style={styles.tableHeadCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} >
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <img src={product.picture} alt={product.name} width={50} height={50} />
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenModify(product)}>
                    <Edit sx={{ color: 'black' }} />
                  </IconButton>
                  <IconButton onClick={() => deleteProduct(product.id)}>
                    <Delete sx={{ color: 'red' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modify} onClose={handleCloseModify}>
        <Box sx={styles.modal}>
          <Typography variant="h6" gutterBottom>
            Modify Product
          </Typography>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={currentProduct.name}
            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Price"
            margin="normal"
            type="number"
            value={currentProduct.price}
            onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Picture URL"
            margin="normal"
            value={currentProduct.picture}
            onChange={(e) => setCurrentProduct({ ...currentProduct, picture: e.target.value })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Category"
            margin="normal"
            value={currentProduct.category}
            onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Stock"
            margin="normal"
            type="number"
            value={currentProduct.stock}
            onChange={(e) => setCurrentProduct({ ...currentProduct, stock: parseInt(e.target.value) })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            value={currentProduct.description}
            onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
            sx={styles.input}
          />
          <Button variant="contained" sx={styles.button} onClick={updateProduct}>
            Update Product
          </Button>
        </Box>
      </Modal>
      <Modal open={addModalOpen} onClose={handleCloseAdd}>
        <Box sx={styles.modal}>
          <Typography variant="h6" gutterBottom>
            Add Product
          </Typography>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Price"
            margin="normal"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Picture URL"
            margin="normal"
            value={newProduct.picture}
            onChange={(e) => setNewProduct({ ...newProduct, picture: e.target.value })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Category"
            margin="normal"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Stock"
            margin="normal"
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
            sx={styles.input}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            sx={styles.input}
          />
          <Button variant="contained" sx={styles.button} onClick={addProduct}>
            Add Product
          </Button>
        </Box>
      </Modal>
      </Paper>
    </div>
  );
};

export default ProductsTable;