import React from 'react';
import Shortener from './Shortener';
import { Container, Typography, Paper } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          URL Shortener
        </Typography>
        <Shortener />
      </Paper>
    </Container>
  );
}

export default Home;