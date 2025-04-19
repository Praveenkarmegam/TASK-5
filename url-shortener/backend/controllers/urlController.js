const shortid = require('shortid');
const Url = require('../models/Url');

exports.createShortUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
    return res.status(400).json({ message: 'Invalid URL. Must start with http:// or https://'});
  }

  const shortCode = require('shortid').generate();
  const newUrl = await new Url({
    userId: req.user.userId,
    longUrl,
    shortCode
  }).save();

  res.json({
    shortUrl: `${process.env.BASE_URL}/u/${shortCode}`,
    longUrl: newUrl.longUrl
  });
};


exports.redirectToLongUrl = async (req, res) => {
  const { code } = req.params;

  try {
    const url = await Url.findOne({ shortCode: code });

    if (!url) {
      return res.status(404).send('<h1>Short URL not found</h1>');
    }

    // Increment click count
    url.clickCount += 1;
    await url.save();

    // Redirect to the original long URL
    return res.redirect(url.longUrl);
  } catch (err) {
    console.error('Redirect Error:', err);
    res.status(500).send('<h1>Server Error</h1>');
  }
};


exports.getUserUrls = async (req, res) => {
  const urls = await Url.find({ userId: req.user.userId }).sort({ createdAt: -1 });
  res.json(urls);
};
