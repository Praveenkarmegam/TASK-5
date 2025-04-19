import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { TextField, Button, Card, CardContent, Typography, Alert } from '@mui/material';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/reset-password', { token, password });
      setMessage('Password reset successfully.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card sx={{ maxWidth: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>Reset Password</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetPassword;
