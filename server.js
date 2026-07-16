const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// হোম পেজ - Index.html ফাইল পাঠানো
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

// লগ-ইন পেজ দেখানোর জন্য
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// লগ-ইন ফর্ম সাবমিট হলে চেক করার জন্য
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "1234") {
        res.send("স্বাগতম! লগ-ইন সফল হয়েছে।");
    } else {
        res.send("ভুল ইউজারনেম বা পাসওয়ার্ড।");
    }
});

// ভর্তি ফরম পেজ দেখানোর জন্য
app.get('/admission', (req, res) => {
    res.sendFile(path.join(__dirname, 'admission.html'));
});

// ভর্তি ফরম ডাটা জমা নেওয়ার পোস্ট রুট
app.post('/admission', (req, res) => {
    const formData = JSON.stringify(req.body) + ",\n";
    
    fs.appendFile('admissions.txt', formData, (err) => {
        if (err) {
            console.error(err);
            res.send("দুঃখিত, ফরম জমা নিতে সমস্যা হয়েছে।");
        } else {
            console.log('নতুন ভর্তি তথ্য জমা হয়েছে!');
            res.send("আপনার ভর্তি ফরমটি সফলভাবে জমা হয়েছে!");
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});