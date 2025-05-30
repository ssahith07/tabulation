import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL || 'http://192.168.29.163:5000'}/api/auth/register`, form);
      setMessage('Registration successful.');
      setIsSuccess(true);
      setForm({ username: '', password: '' });
    } catch {
      setMessage('Registration failed.');
      setIsSuccess(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" mb={2}>Register</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          margin="normal"
          required
        />
        <Button type="submit" variant="outlined" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </Box>

      {message && (
        <Typography sx={{ mt: 2 }} color={isSuccess ? 'green' : 'error'}>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default Register;
