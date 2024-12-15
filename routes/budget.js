const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const dbPath = './database/cueball.db';
const db = new sqlite3.Database(dbPath);

// Get all budget rules
router.get('/', (req, res) => {
  db.all('SELECT * FROM budget_rules', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
