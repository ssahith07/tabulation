// src/components/ProfileDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/profiles/${id}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error('Error fetching profile', err));
  }, [id]);

  if (!profile) return <Typography sx={{ mt: 8, textAlign: 'center' }}>Loading...</Typography>;

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', mt: 6 }}>
      <Paper sx={{ background: '#fff', p: 4, borderRadius: 2, boxShadow: 3, minWidth: 400 }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 400 }}>
          Profile of {profile.name}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 400 }}>Personal Info</Typography>
          <Typography variant="subtitle2" sx={{ mt: 1 }}>Email</Typography>
          <Typography variant="body2" color="text.secondary">{profile.email}</Typography>
          <Typography variant="subtitle2" sx={{ mt: 1 }}>Phone</Typography>
          <Typography variant="body2" color="text.secondary">{profile.phone}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 400 }}>Education</Typography>
          <Typography variant="subtitle2" sx={{ mt: 1 }}>Degree</Typography>
          <Typography variant="body2" color="text.secondary">{profile.degree}</Typography>
          <Typography variant="subtitle2" sx={{ mt: 1 }}>Institution</Typography>
          <Typography variant="body2" color="text.secondary">{profile.institution}</Typography>
          <Typography variant="subtitle2" sx={{ mt: 1 }}>Year</Typography>
          <Typography variant="body2" color="text.secondary">{profile.year}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 400 }}>Interests</Typography>
          <Typography variant="body2" color="text.secondary">{profile.interests.join(', ')}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 400 }}>Achievements</Typography>
          <Typography variant="body2" color="text.secondary">{profile.achievements.join(', ')}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileDetail;
