// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => (
  <AppBar position="static" sx={{ background: '#1976d2', boxShadow: 3 }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h6" sx={{ color: '#fff', fontWeight: 500 }}>
        Profile Manager
      </Typography>
      <div>
        <Button component={Link} to="/" sx={{ color: '#fff', fontSize: '0.9rem', fontWeight: 400, mr: 2 }}>
          New Profile
        </Button>
        <Button component={Link} to="/profiles" sx={{ color: '#fff', fontSize: '0.9rem', fontWeight: 400 }}>
          All Profiles
        </Button>
      </div>
    </Toolbar>
  </AppBar>
);

export default Navbar;
