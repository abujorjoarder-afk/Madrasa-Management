const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// এক্সপ্রেসকে বলুন যে এই ফোল্ডারেই ফাইলগুলো আছে
app.use(express.static(__dirname));

// হোম পেজ - index.html ফাইল পাঠানো
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// MySQL ডেটাবেস কানেকশন (এটি আপাতত বন্ধ করে দিলাম)

// /*
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'qawmi_madrasa_db'
// });

// app.get('/api/dashboard', (req, res) => {
//    // ... সব কোড
// });
// */
// // ১. ড্যাশবোর্ড ডেটা (স্ট্যাটিস্টিকস)
//                 db.query('SELECT SUM(amount) as total FROM transactions WHERE transaction_type="expense"', (err, r4) => {
//                     data.total_expense = r4[0].total || 0;
//                     data.current_cash = data.total_income - data.total_expense;
//                     res.json(data);
//                 });
//             });
//         });
//     });
// });

// ২. ছাত্র ভর্তি রুট
app.post('/admission', (req, res) => {
    const { full_name, guardian_name, phone_number, address } = req.body;
    const student_id_no = 'MID-' + Math.floor(1000 + Math.random() * 9000);
    const sql = `INSERT INTO students (student_id_no, full_name, guardian_name, phone_number, address, status) VALUES (?, ?, ?, ?, ?, 'active')`;
    db.query(sql, [student_id_no, full_name, guardian_name, phone_number, address], (err) => {
        if (err) return res.status(500).send('ভর্তি করতে সমস্যা হয়েছে।');
        res.send(`
            <div style="text-align:center; padding:50px; font-family:Arial;">
                <h2 style="color:#2b7a78;">ভর্তি সফল হয়েছে!</h2>
                <p>ছাত্রের আইডি নম্বর: <b>${student_id_no}</b></p>
                <a href="/" style="background:#2b7a78; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">ফিরে যান</a>
            </div>
        `);
    });
});

// ৩. শিক্ষক নিবন্ধন রুট
app.post('/add-staff', (req, res) => {
    const { name, phone, designation } = req.body; // আপনার ইনপুট অনুযায়ী
    const sql = "INSERT INTO staff (name, phone, designation) VALUES (?, ?, ?)";
    db.query(sql, [name, phone, designation], (err, result) => {
        if (err) {
            console.error(err); // এখানে এররটি দেখাবে
            res.send("সংরক্ষণ করতে সমস্যা হয়েছে");
        } else {
            res.send("সফলভাবে সংরক্ষিত হয়েছে");
        }
    });
});

// ৪. দৈনিক হিসাব রুট
app.post('/add-transaction', (req, res) => {
    const { title, amount, transaction_type, fund_type, transaction_date } = req.body;
    const sql = `INSERT INTO transactions (title, amount, transaction_type, fund_type, transaction_date) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [title, amount, transaction_type, fund_type, transaction_date], (err) => {
        if (err) return res.status(500).send('হিসাব সংরক্ষণ করতে সমস্যা হয়েছে।');
        res.send(`
            <div style="text-align:center; padding:50px; font-family:Arial;">
                <h2 style="color:#e67e22;">হিসাব সফলভাবে রাখা হয়েছে!</h2>
                <a href="/" style="background:#e67e22; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">ফিরে যান</a>
            </div>
        `);
    });
});

// ৫. ডেটা তালিকার API (ভর্তি হওয়া ছাত্র, শিক্ষক এবং লেনদেন)
app.get('/api/students', (req, res) => {
    db.query('SELECT * FROM students ORDER BY id DESC', (err, results) => res.json(results));
});
app.get('/api/staff', (req, res) => {
    db.query('SELECT * FROM staff ORDER BY id DESC', (err, results) => res.json(results));
});
app.get('/api/transactions', (req, res) => {
    db.query('SELECT * FROM transactions ORDER BY transaction_date DESC', (err, results) => res.json(results));
});

app.listen(3000, () => {
    console.log('মাদ্রাসা ম্যানেজমেন্ট সার্ভার রেডি: http://localhost:3000');
});