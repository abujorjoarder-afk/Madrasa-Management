const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs'); // নতুন লাইন
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
// ভর্তি ফরম জমা নেওয়ার পোস্ট রুট
app.post('/admission', (req, res) => {
    // ফর্মের ডাটাগুলোকে একটি ফরম্যাটে সাজিয়ে নিলাম
    const formData = JSON.stringify(req.body) + ",\n";
    
    // ডাটা 'admissions.txt' ফাইলে যোগ করা হচ্ছে
    fs.appendFile('admissions.txt', formData, (err) => {
        if (err) {
            console.error(err);
            res.send("দুঃখিত, ফরম জমা নিতে সমস্যা হয়েছে।");
        } else {
            console.log('নতুন ভর্তি তথ্য জমা হয়েছে!');
            res.send("আপনার ভর্তি ফরমটি সফলভাবে জমা হয়েছে!");
        }
    });
    // অন্যান্য রুটগুলো ঠিকঠাক থাকবে...
app.get('/admission', (req, res) => {
    res.sendFile(path.join(__dirname, 'admission.html'));
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

// মেইন পেজ বা ড্যাশবোর্ড
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// admission.html পেজটি দেখানোর জন্য
app.get('/admission', (req, res) => {
    res.sendFile(path.join(__dirname, 'admission.html'));
});

// ফর্ম থেকে ডাটা গ্রহণ করার জন্য (POST)
app.post('/admission', (req, res) => {
    // এখানে আপনি ডাটা প্রসেস করবেন বা ডাটাবেসে সেভ করবেন
    console.log(req.body); // ডাটা কনসোলে দেখা যাবে
    res.send("ভর্তি ফরম জমা হয়েছে!");
});
const fs = require('fs'); // ফাইলের উপরে এটি যোগ করুন

app.post('/admission', (req, res) => {
    const formData = JSON.stringify(req.body) + "\n";
    
    // ডাটা 'admissions.txt' ফাইলে জমা হবে
    fs.appendFile('admissions.txt', formData, (err) => {
        if (err) throw err;
        console.log('ডাটা সেভ হয়েছে!');
    });
    
    res.send("ভর্তি ফরম জমা হয়েছে!");
});