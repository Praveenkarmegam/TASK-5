import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link
} from '@mui/material';

function UrlList() {
  const [urls, setUrls] = useState([]);

  const fetchUrls = async () => {
    try {
      const res = await axios.get('/url/my-urls');
      setUrls(res.data);
    } catch (err) {
      console.error('Failed to load URLs:', err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>Your Shortened URLs</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url._id}>
                <TableCell>
                  <Link
                    href={`http://localhost:5000/u/${url.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  {url.shortCode}
                  </Link>
                </TableCell>
                <TableCell sx={{ wordBreak: 'break-word' }}>{url.longUrl}</TableCell>
                <TableCell>{url.clickCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default UrlList;