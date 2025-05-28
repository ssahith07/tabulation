import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, Typography, Container, Box
} from '@mui/material';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL || 'http://192.168.29.163:5000'}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('API error:', err));
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Top-left aligned heading */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Product List
        </Typography>
      </Box>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>In Stock</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, i) => (
                  <TableRow key={i}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.inStock ? 'Yes' : 'No'}</TableCell>
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
          onRowsPerPageChange={e => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Container>
  );
};

export default ProductTable;
