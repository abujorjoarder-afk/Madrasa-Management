const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ১. হোম পেজ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

// ২. লগ-ইন
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "1234") {
        res.send("স্বাগতম! লগ-ইন সফল হয়েছে।");
    } else {
        res.send("ভুল ইউজারনেম বা পাসওয়ার্ড।");
    }
});

// ৩. ভর্তি কার্যক্রম
app.get('/admission', (req, res) => {
    res.sendFile(path.join(__dirname, 'admission.html'));
});

app.post('/admission', (req, res) => {
    const data = JSON.stringify(req.body) + ",\n";
    fs.appendFile('admissions.txt', data, (err) => {
        if (err) res.send("এরর হয়েছে।");
        else res.send("ভর্তি ফরম সফলভাবে জমা হয়েছে!");
    });
});

// ৪. স্টাফ কার্যক্রম
app.get('/add-staff', (req, res) => {
    res.sendFile(path.join(__dirname, 'add-staff.html'));
});

app.post('/add-staff', (req, res) => {
    const data = JSON.stringify(req.body) + ",\n";
    fs.appendFile('staffs.txt', data, (err) => {
        if (err) res.send("এরর হয়েছে।");
        else res.send("স্টাফের তথ্য সফলভাবে জমা হয়েছে!");
    });
});

// ৫. ট্রানজেকশন কার্যক্রম
app.get('/add-transaction', (req, res) => {
    res.sendFile(path.join(__dirname, 'add-transaction.html'));
});

app.post('/add-transaction', (req, res) => {
    const data = JSON.stringify(req.body) + ",\n";
    fs.appendFile('transactions.txt', data, (err) => {
        if (err) res.send("এরর হয়েছে।");
        else res.send("ট্রানজেকশন সফলভাবে জমা হয়েছে!");
    });
});

// ৬. ডাটা দেখার রুটসমূহ
app.get('/view-admissions', (req, res) => res.sendFile(path.join(__dirname, 'admissions.txt')));
app.get('/view-staffs', (req, res) => res.sendFile(path.join(__dirname, 'staffs.txt')));
app.get('/view-transactions', (req, res) => res.sendFile(path.join(__dirname, 'transactions.txt')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});