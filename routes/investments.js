const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const dbPath = './database/cueball.db';
const db = new sqlite3.Database(dbPath);

// Get all investments
router.get('/', (req, res) => {
  const { sortByDate } = req.query;
  const query = sortByDate
    ? 'SELECT * FROM investments ORDER BY date'
    : 'SELECT * FROM investments';
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Fetch investments passing budget rules
// Fetch investments passing budget rules (including cumulative investments logic)
router.get('/pass', (req, res) => {
    const query = `
      SELECT i.*
      FROM investments i
      LEFT JOIN budget_rules b
      ON i.sector = b.sector
      WHERE i.amount <= b.amount
      AND NOT EXISTS (
        SELECT 1
        FROM investments prev
        WHERE prev.sector = i.sector
        AND prev.date <= i.date
        AND prev.amount + i.amount > b.amount
      )
    `;
    db.all(query, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });
  

// Fetch investments violating budget rules
// Fetch investments violating budget rules (checking cumulative investments)
router.get('/violate', (req, res) => {
  const query = `
    SELECT i.*
    FROM investments i
    LEFT JOIN budget_rules b
    ON i.sector = b.sector
    WHERE i.amount > b.amount
    OR EXISTS (
      SELECT 1
      FROM investments prev
      WHERE prev.sector = i.sector
      AND prev.date <= i.date
      AND prev.amount + i.amount > b.amount
    )
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


// Get all investments sorted by date (earliest date in calendar year)
router.get('/date', (req, res) => {
  const query = 'SELECT * FROM investments ORDER BY strftime("%Y-%m-%d", date) ASC';
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


// Get all investments sorted by amount
router.get('/amount', (req, res) => {
  const query = 'SELECT * FROM investments ORDER BY amount';
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});



module.exports = router;
