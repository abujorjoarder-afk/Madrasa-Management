const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

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