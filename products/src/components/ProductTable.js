import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Typography, Container, TextField, Box,
  Button, Checkbox
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductTable = () => {
  const baseURL = 'http://192.168.29.163:5000' || 'http://localhost:5000';
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editRowId, setEditRowId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const token = JSON.parse(localStorage.getItem('auth'))?.token;

  const isAuthenticated = !!token;

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth'))?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const endpoint = search.trim()
        ? `/api/products/search?name=${search}`
        : '/api/products';

      const res = await axios.get(`${baseURL}${endpoint}`, config); // ✅ token added
      setProducts(res.data);
      setPage(0);
    } catch (err) {
      console.error('API error:', err);
    }
  };

  fetchData();
}, [search]);


  const enterEditMode = (product) => {
    setEditRowId(product._id);
    setEditValues({ ...product });
  };

  const handleEditChange = (field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: field === 'price' ? parseFloat(value) : value
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSave = async (id) => {
    try {
      const updatedData = {
        ...editValues,
        price: parseFloat(editValues.price)
      };
      const res = await axios.put(`${baseURL}/api/products/${id}`, updatedData, authConfig);
      const updatedProducts = products.map((p) =>
        p._id === id ? res.data : p
      );
      setProducts(updatedProducts);
      setEditRowId(null);
    } catch (err) {
      console.error('Update failed:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('auth');
        navigate('/');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/products/${id}`, authConfig);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('auth');
        navigate('/');
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Product List
      </Typography>

      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search Products by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>In Stock</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow key={product._id}>
                    {editRowId === product._id ? (
                      <>
                        <TableCell>
                          <TextField
                            value={editValues.name}
                            onChange={(e) => handleEditChange('name', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={editValues.price}
                            onChange={(e) => handleEditChange('price', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={editValues.category}
                            onChange={(e) => handleEditChange('category', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={editValues.inStock}
                            onChange={(e) => handleCheckboxChange('inStock', e.target.checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => handleSave(product._id)} variant="contained" size="small">
                            Save
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.inStock ? 'Yes' : 'No'}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => enterEditMode(product)}
                            variant="outlined"
                            size="small"
                            sx={{ mr: 1 }}
                            disabled={!isAuthenticated}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(product._id)}
                            variant="outlined"
                            color="error"
                            size="small"
                            disabled={!isAuthenticated}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={products.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Paper>
    </Container>
  );
};

export default ProductTable;



