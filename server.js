const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// --- ১. হোম ও লগ-ইন রুটস ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "1234") res.send("স্বাগতম! লগ-ইন সফল হয়েছে।");
    else res.send("ভুল ইউজারনেম বা পাসওয়ার্ড।");
});

// --- ২. ভর্তি কার্যক্রম ---
app.get('/admission', (req, res) => res.sendFile(path.join(__dirname, 'admission.html')));
app.post('/admission', (req, res) => {
    fs.appendFile('admissions.txt', JSON.stringify(req.body) + "\n", (err) => {
        if (err) res.send("এরর হয়েছে।");
        else res.send("ছাত্র ভর্তি সফল হয়েছে! <a href='/report'>রিপোর্ট দেখুন</a>");
    });
});

// --- ৩. স্টাফ কার্যক্রম ---
app.get('/add-staff', (req, res) => res.sendFile(path.join(__dirname, 'add-staff.html')));
app.post('/add-staff', (req, res) => {
    fs.appendFile('staffs.txt', JSON.stringify(req.body) + "\n", (err) => {
        if (err) res.send("এরর হয়েছে।");
        else res.send("শিক্ষক/স্টাফের তথ্য জমা হয়েছে! <a href='/report'>রিপোর্ট দেখুন</a>");
    });
});

// --- ৪. ট্রানজেকশন কার্যক্রম ---
app.get('/add-transaction', (req, res) => res.sendFile(path.join(__dirname, 'add-transaction.html')));
app.post('/add-transaction', (req, res) => {
    fs.appendFile('transactions.txt', JSON.stringify(req.body) + "\n", (err) => {
        if (err) res.send("এরর হয়েছে।");
        else res.send("ট্রানজেকশন সফল হয়েছে! <a href='/report'>রিপোর্ট দেখুন</a>");
    });
});

// --- ৫. প্রিন্ট সুবিধাসহ সমন্বিত রিপোর্ট পেজ ---
app.get('/report', (req, res) => {
    const readData = (file) => fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : "কোনো ডাটা নেই।";
    
    res.send(`
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            pre { background: #f4f4f4; padding: 15px; border-radius: 5px; border: 1px solid #ddd; white-space: pre-wrap; }
            button { padding: 12px 25px; font-size: 16px; cursor: pointer; background: #28a745; color: white; border: none; border-radius: 5px; }
            @media print { .no-print { display: none; } }
        </style>
        <h1>মাদ্রাসা ব্যবস্থাপনা রিপোর্ট</h1>
        <button class="no-print" onclick="window.print()">রিপোর্ট প্রিন্ট করুন</button>
        
        <h3>ছাত্র ভর্তির তালিকা:</h3>
        <pre>${readData('admissions.txt')}</pre>
        
        <h3>শিক্ষকদের বেতন ও স্টাফ তথ্য:</h3>
        <pre>${readData('staffs.txt')}</pre>
        
        <h3>আয়-ব্যয়ের হিসাব:</h3>
        <pre>${readData('transactions.txt')}</pre>
        
        <br><br>
        <a href="/" class="no-print">হোম পেজে ফিরে যান</a>
    `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));