import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post(`${'http://localhost:5000' || 'http://192.168.29.163:5000'}/api/auth/login`, form);
      const res = await axios.post(`${'http://192.168.29.163:5000' || 'http://localhost:5000'}/api/auth/login`, form);
      localStorage.setItem('auth', JSON.stringify({ token: res.data.token, role: res.data.role }));
      onLogin();
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth label="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} margin="normal" />
        <TextField fullWidth label="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} margin="normal" />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
      </Box>
    </Container>
  );
};

export default Login;
