const express = require('express');
const cors = require('cors');
require('dotenv').config();

const analyzeRouter = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/analyze', analyzeRouter);

app.get('/', (req, res) => {
  res.json({ message: 'BuildNext AI server running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
