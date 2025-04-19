const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const { redirectToLongUrl } = require('./controllers/urlController');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

// Public Redirect Route for Shortened URLs
app.get('/u/:code', redirectToLongUrl);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => console.log('DB connection error:', err));
