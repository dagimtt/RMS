const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
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

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// -------------------------
// INCOMING LETTERS
// -------------------------

// Insert Incoming Letter
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
    res.json({ message: "Incoming letter inserted successfully!", letter: result.rows[0] });
  } catch (err) {
    console.error("Error inserting incoming letter:", err);
    res.status(500).json({ error: "Failed to insert incoming letter" });
  }
});

// Get all incoming letters
app.get("/api/letters", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id , reply_num, ref_num, from_person, to_person, date, main_idea, description, letter_type, status, scan_path 
       FROM letters ORDER BY date DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching letters:", err);
    res.status(500).json({ error: "Failed to fetch letters" });
  }
});

// -------------------------
// OUTGOING LETTERS
// -------------------------

// Insert Outgoing Letter
app.post("/api/outgoing", upload.single("scan"), async (req, res) => {
  try {
    const { reply_num, ref_num, from, to, subject, date, description } = req.body;
    const scanPath = req.file ? req.file.path : null;

    const query = `
      INSERT INTO outgoing
      (reply_num, ref_num, from_person, to_person, date, main_idea, description, scan_path)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
    `;

    const values = [
      reply_num,
      ref_num,
      from,
      to,
      date,
      subject,
      description,
      scanPath,
    ];

    const result = await pool.query(query, values);
    res.json({ message: "Outgoing letter inserted successfully!", letter: result.rows[0] });
  } catch (err) {
    console.error("Error inserting outgoing letter:", err);
    res.status(500).json({ error: "Failed to insert outgoing letter" });
  }
});


// Get single letter by ID
app.get("/api/letters/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM letters WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Letter not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching letter detail:", err);
    res.status(500).json({ error: "Failed to fetch letter detail" });
  }
});
// Get all outgoing letters
app.get("/api/outgoing", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        reply_num,
        ref_num,
        from_person,
        to_person,
        date,
        main_idea,
        description,
        scan_path,
        status
      FROM outgoing
      ORDER BY date DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching outgoing letters:", err);
    res.status(500).json({ error: "Failed to fetch outgoing letters" });
  }
});



// Get single outgoing letter by ID
app.get("/api/outgoing/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM outgoing WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Outgoing letter not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching outgoing detail:", err);
    res.status(500).json({ error: "Failed to fetch outgoing detail" });
  }
});


// Dashboard statistics
app.get("/api/dashboard-stats", async (req, res) => {
  try {
    const incomingCount = await pool.query(
      "SELECT COUNT(*) FROM letters "
    );

    const outgoingCount = await pool.query(
      "SELECT COUNT(*) FROM outgoing"
    );

    const pendingCount = await pool.query(
      "SELECT COUNT(*) FROM letters WHERE status = 'Pending'"
    );

    const totalRecords =
      parseInt(incomingCount.rows[0].count) +
      parseInt(outgoingCount.rows[0].count);

    res.json({
      totalRecords,
      incoming: incomingCount.rows[0].count,
      outgoing: outgoingCount.rows[0].count,
      pending: pendingCount.rows[0].count,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Failed to load dashboard stats" });
  }
});

// get all user
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, first_name, last_name, email, role, created_at FROM users ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// add user
app.post("/api/users", async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, role)
       VALUES ($1,$2,$3,$4,$5)`,
      [first_name, last_name, email, hashedPassword, role || "user"]
    );

    res.json({ message: "User added successfully" });
  } catch (err) {
    console.error("Add user error:", err);

    if (err.code === "23505") {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(500).json({ error: err.message });
  }
});


// -------------------------
// Start server
// -------------------------
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
