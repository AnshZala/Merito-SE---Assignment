const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Load CSV files
const budgetCsv = path.join(__dirname, '../budget.csv');
const investmentsCsv = path.join(__dirname, '../investments.csv');
const dbPath = path.join(__dirname, 'cueball.db');

const db = new sqlite3.Database(dbPath);

// Helper to read CSV and convert to JSON
const parseCsv = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8').trim();
  const [header, ...rows] = data.split('\n');
  const keys = header.split(',');

  return rows.map((row) => {
    const values = row.split(',');
    return keys.reduce((acc, key, i) => {
      acc[key.trim()] = values[i].trim();
      return acc;
    }, {});
  });
};

// Create tables and seed data
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS budget_rules (
      id INTEGER PRIMARY KEY,
      amount REAL NOT NULL,
      time_period TEXT,
      sector TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS investments (
      id INTEGER PRIMARY KEY,
      date TEXT NOT NULL,
      amount REAL NOT NULL,
      sector TEXT
    )
  `);

  const budgetRules = parseCsv(budgetCsv);
  const investments = parseCsv(investmentsCsv);

  // Insert Budget Rules
  const budgetStmt = db.prepare(`
    INSERT INTO budget_rules (id, amount, time_period, sector)
    VALUES (?, ?, ?, ?)
  `);
  budgetRules.forEach((rule) => {
    budgetStmt.run(rule.ID, rule.Amount, rule['Time Period'], rule.Sector || null);
  });
  budgetStmt.finalize();

  // Insert Investments
  const investmentStmt = db.prepare(`
    INSERT INTO investments (id, date, amount, sector)
    VALUES (?, ?, ?, ?)
  `);
  investments.forEach((investment) => {
    investmentStmt.run(investment.ID, investment.Date, investment.Amount, investment.Sector);
  });
  investmentStmt.finalize();
});

db.close(() => console.log('Database seeded successfully.'));
