const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxX8DdMpGlaaGb7BbpmtPYDf48XjvzIh7W5SY8QnQEOje8ySu7vabGFHF_hiDQNNIJT/exec";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// হোম ও লগ-ইন রাউট
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "1234") res.send("স্বাগতম! লগ-ইন সফল হয়েছে।");
    else res.send("ভুল ইউজারনেম বা পাসওয়ার্ড!");
});

// গুগল শিটে ডাটা পাঠানোর রাউট
app.post('/submit-form', async (req, res) => {
    try {
        await axios.post(WEB_APP_URL, new URLSearchParams(req.body).toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        res.send("অভিনন্দন! ডাটা সফলভাবে গুগল শিটে জমা হয়েছে। <a href='/'>হোম পেজে ফিরে যান</a>");
    } catch (error) {
        console.error(error);
        res.send("দুঃখিত, ডাটা পাঠাতে সমস্যা হয়েছে।");
    }
});

// স্টাফ ও লেনদেন সংক্রান্ত রাউট (আপনার আগের কোড অনুযায়ী)
app.post('/add-staff', (req, res) => {
    fs.appendFile('staffs.txt', JSON.stringify(req.body) + "\n", (err) => {
        if (err) res.send("এরর হয়েছে");
        else res.send("স্টাফ নিবন্ধন সফল হয়েছে!");
    });
});

app.post('/add-transaction', (req, res) => {
    fs.appendFile('transactions.txt', JSON.stringify(req.body) + "\n", (err) => {
        if (err) res.send("এরর হয়েছে");
        else res.send("ট্রানজেকশন সফল হয়েছে! <a href='/report'>রিপোর্ট দেখুন</a>");
    });
});

// রিপোর্ট পেজ
app.get('/report', (req, res) => {
    const readData = (file) => fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : "";
    res.send(`
        <h1>মাদ্রাসা ব্যবস্থাপনা রিপোর্ট</h1>
        <button onclick="window.print()">রিপোর্ট প্রিন্ট করুন</button>
        <h3>শিক্ষকদের বেতন ও স্টাফ তথ্য:</h3><pre>${readData('staffs.txt')}</pre>
        <h3>আয়-ব্যয়ের হিসাব:</h3><pre>${readData('transactions.txt')}</pre>
        <a href="/">হোম পেজে ফিরে যান</a>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));