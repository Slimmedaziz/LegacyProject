import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 

const styles = {
  header: {
    textAlign: 'center',
  
    color: 'black',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  paper: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  tableHeadRow: {
    backgroundColor: 'black',
  },
  tableHeadCell: {
    color: 'white',
    fontWeight: 'bold',
  }
,
  deleteButton: {
    color: 'red',
  },
  switchButton: {
    color: 'black',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
};
interface Sellers{
    id:number;
    userName:string;
    email:string;
    password:string;

}

const Sellers:React.FC = () => {
  const [sellers, setSellers] = useState<Sellers[]>([]);

  const fetchUsersByRole = async (role:string) => {
    try {
      const response = await axios.get<Sellers[]>(`http://localhost:5000/admin/users/${role}`);
      setSellers(response.data);
    } catch (error) {
      console.log('error fetching: ', error);
    }
  };

  const handleDeleteUser = async (userId:number) => {
    try {
      await axios.delete<Sellers[]>(`http://localhost:5000/Sellers/${userId}`);
      setSellers(sellers.filter(seller => seller.id !== userId));
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  const handleSwitchToClient = async (userId:number) => {
    try {
      await axios.put<Sellers[]>(`http://localhost:5000/admin/users/switch/${userId}`, { role: 'client' });
      fetchUsersByRole('seller');
    } catch (error) {
      console.error('Error switching user to client: ', error);
    }
  };
  

  useEffect(() => {
    fetchUsersByRole('seller');
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      
      <Paper style={styles.paper}>
        <Table>
          <TableHead>
            <TableRow style={styles.tableHeadRow}>
              <TableCell style={styles.tableHeadCell}>ID</TableCell>
              <TableCell style={styles.tableHeadCell}>Name</TableCell>
              <TableCell style={styles.tableHeadCell}>Email</TableCell>
              <TableCell style={styles.tableHeadCell}>Password</TableCell>
              <TableCell style={styles.tableHeadCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.map(seller => (
              <TableRow key={seller.id} >
                <TableCell>{seller.id}</TableCell>
                <TableCell>{seller.userName}</TableCell>
                <TableCell>{seller.email}</TableCell>
                <TableCell>{seller.password}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    style={styles.deleteButton}
                    onClick={() => handleDeleteUser(seller.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    style={styles.switchButton}
                    onClick={() => handleSwitchToClient(seller.id)}
                  >
                    Switch to Client
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default Sellers;
