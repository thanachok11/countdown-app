require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("📦 MongoDB Connected"))
    .catch(err => console.error(err));

// สร้าง Schema สำหรับวันสำคัญ
const EventSchema = new mongoose.Schema({
    title: String,
    date: Date,
});

const Event = mongoose.model("Event", EventSchema);

// API เพิ่มวันสำคัญ
app.post("/events", async (req, res) => {
    const { title, date } = req.body;
    const newEvent = new Event({ title, date });
    await newEvent.save();
    res.json(newEvent);
});

// API ดึงข้อมูลวันสำคัญทั้งหมด
app.get("/events", async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
