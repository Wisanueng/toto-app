const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// เชื่อมต่อ MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo_db",
});

db.connect(err => {
    if (err) console.error("❌ MySQL เชื่อมต่อผิดพลาด:", err);
    else console.log("✅ เชื่อมต่อ MySQL สำเร็จ!");
});

// ดึงข้อมูล Task
app.get("/tasks", (req, res) => {
    db.query("SELECT * FROM tasks", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// เพิ่ม Task ใหม่
app.post("/tasks", (req, res) => {
    const { title } = req.body;
    db.query("INSERT INTO tasks (title) VALUES (?)", [title], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, title });
    });
});

// ลบ Task
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ success: true });
    });
});

app.listen(5000, () => console.log("🚀 Server started on port 5000"));
