import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Typography, Container, TextField, Box,
  Button, Checkbox
} from '@mui/material';

const ProductTable = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://192.168.29.163:5000';

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editRowId, setEditRowId] = useState(null);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = search.trim()
          ? `/api/products/search?name=${search}`
          : '/api/products';
        const res = await axios.get(`${baseURL}${endpoint}`);
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
      const res = await axios.put(`${baseURL}/api/products/${id}`, updatedData);
      const updatedProducts = products.map((p) =>
        p._id === id ? res.data : p
      );
      setProducts(updatedProducts);
      setEditRowId(null);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
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
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(product._id)}
                            variant="outlined"
                            color="error"
                            size="small"
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




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
//   TablePagination, Typography, Container, Box
// } from '@mui/material';

// const ProductTable = () => {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}/api/products`)
//       .then(res => setProducts(res.data))
//       .catch(err => console.error('API error:', err));
//   }, []);

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       {/* Top-left aligned heading */}
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h5" fontWeight="bold">
//           Product List
//         </Typography>
//       </Box>

//       <Paper elevation={3}>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell><strong>Name</strong></TableCell>
//                 <TableCell><strong>Price</strong></TableCell>
//                 <TableCell><strong>Category</strong></TableCell>
//                 <TableCell><strong>In Stock</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {products
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((product, i) => (
//                   <TableRow key={i}>
//                     <TableCell>{product.name}</TableCell>
//                     <TableCell>${product.price}</TableCell>
//                     <TableCell>{product.category}</TableCell>
//                     <TableCell>{product.inStock ? 'Yes' : 'No'}</TableCell>
//                   </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           component="div"
//           count={products.length}
//           page={page}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={e => {
//             setRowsPerPage(parseInt(e.target.value, 10));
//             setPage(0);
//           }}
//         />
//       </Paper>
//     </Container>
//   );
// };

// export default ProductTable;
