const express = require('express');
const router = express.Router();
const { createShortUrl, redirectToLongUrl, getUserUrls } = require('../controllers/urlController');
const auth = require('../middleware/authMiddleware');

router.post('/shorten', auth, createShortUrl);
router.get('/my-urls', auth, getUserUrls);
router.get('/u/:code', redirectToLongUrl);

module.exports = router;