const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded files

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "letter",
  password: "5294",
  port: 5432,
});
// File upload config (stores uploaded scans in /uploads/)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// API: Insert Incoming Letter
app.post("/api/letters", upload.single("scan"), async (req, res) => {
  try {
    const { ref_num, from, to, subject, date, description } = req.body;
    const scanPath = req.file ? req.file.path : null;

    const query = `
      INSERT INTO letters 
      (ref_num, from_person, to_person, date, main_idea, description, letter_type, status, scan_path)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
    `;

    const values = [
      ref_num,
      from,
      to,
      date,
      subject,
      description,
      "Incoming",
      "Pending",
      scanPath,
    ];

    const result = await pool.query(query, values);
    res.json({ message: "Letter inserted successfully!", letter: result.rows[0] });
  } catch (err) {
    console.error("Error inserting letter:", err);
    res.status(500).json({ error: "Failed to insert letter" });
  }
});

// API: Get all letters
app.get("/api/letters", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT ref_num, from_person, to_person, date, main_idea, description, letter_type, status, scan_path 
       FROM letters ORDER BY date DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching letters:", err);
    res.status(500).json({ error: "Failed to fetch letters" });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
