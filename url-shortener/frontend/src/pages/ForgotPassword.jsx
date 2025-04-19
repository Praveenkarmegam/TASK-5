import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography, Alert } from '@mui/material';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post('/auth/forgot-password', { email });
      setMessage('Reset link sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card sx={{ maxWidth: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>Forgot Password</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Send Reset Link
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;
