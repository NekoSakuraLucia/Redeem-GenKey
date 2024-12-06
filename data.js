const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/keys.db', (err) => {
    if (err) {
        console.error('ไม่สามารถเปิดฐานข้อมูลได้:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS keys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT UNIQUE,
            isUsed BOOLEAN
        )`);
    }
});

module.exports = { db };