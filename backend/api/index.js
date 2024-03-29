const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('ok');
});

app.get('/get_master_nodes', async (req, res) => {
  try {
    const {data} = await axios.get('https://api.cakedefi.com/nodes?order=status&orderBy=DESC');
    res.json(data);
  } catch (error) {
    console.error('Error fetching master nodes:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get_rates', async (req, res) => {
    try {
      const {data} = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,defichain,dash&vs_currencies=sgd,eur,usd&precision=4');
      res.json(data);
    } catch (error) {
      console.error('Error fetching rates:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
