import React, { useState } from 'react';
import axios from '../axiosConfig';
import { TextField, Button, Alert, Box, Snackbar, Link } from '@mui/material';

function Shortener({ onShorten }) {
  const [longUrl, setLongUrl] = useState('');
  const [shortCode, setShortCode] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/url/shorten', { longUrl });
      setShortCode(res.data.shortUrl.split('/').pop());
      setLongUrl('');
      setOpen(true);
      if (onShorten) onShorten();
    } catch (err) {
      alert('Failed to shorten URL');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Enter Long URL"
        fullWidth
        margin="normal"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Shorten URL
      </Button>
      {shortCode && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Short URL:{' '}
          <Link
            href={`https://task-5-0g50.onrender.com/u/${shortCode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://task-5-0g50.onrender.com/u/{shortCode}
          </Link>
        </Alert>
      )}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message="URL shortened successfully"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

export default Shortener;