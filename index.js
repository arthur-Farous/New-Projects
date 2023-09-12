require('./src/config/database.config')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const ap1Version1 = require('./src/config/versioning/v1')
const envConfig = require('./src/config/env/index')
// Middleware for parsing JSON request bodies
app.use(express.json());

// Mount your routes (v1, v2, etc.)
app.use('/api/v1', ap1Version1);
app.listen(port, () => {
  console.log(`This Application Server is running on port ${port}`);
});
