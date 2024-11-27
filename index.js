const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/findid', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await axios.get(`https://deku-apis.onrender.com/api/findid?url=${encodeURIComponent(url)}`);
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch data from the external API',
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
