const express = require('express');
const bodyParser = require('body-parser');
const budgetRoutes = require('./routes/budget');
const investmentRoutes = require('./routes/investments');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/budget', budgetRoutes);
app.use('/investments', investmentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
