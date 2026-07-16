const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// হোম পেজ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

// লগ-ইন পেজ
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

// ভর্তি ফরম
app.get('/admission', (req, res) => {
    res.sendFile(path.join(__dirname, 'admission.html'));
});

app.post('/admission', (req, res) => {
    const formData = JSON.stringify(req.body) + ",\n";
    fs.appendFile('admissions.txt', formData, (err) => {
        if (err) {
            console.error(err);
            res.send("দুঃখিত, ভর্তি ফরম জমা নিতে সমস্যা হয়েছে।");
        } else {
            res.send("আপনার ভর্তি ফরমটি সফলভাবে জমা হয়েছে!");
        }
    });
});

// স্টাফ ফরম
app.get('/add-staff', (req, res) => {
    res.sendFile(path.join(__dirname, 'add-staff.html'));
});

app.post('/add-staff', (req, res) => {
    const staffData = JSON.stringify(req.body) + ",\n";
    fs.appendFile('staffs.txt', staffData, (err) => {
        if (err) {
            console.error(err);
            res.send("দুঃখিত, স্টাফ তথ্য জমা নিতে সমস্যা হয়েছে।");
        } else {
            res.send("স্টাফের তথ্য সফলভাবে জমা হয়েছে!");
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});