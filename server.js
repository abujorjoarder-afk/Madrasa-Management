const express = require('express');
const path = require('path');
const app = express();

// এক্সপ্রেসকে বলুন যে এই ফোল্ডারেই ফাইলগুলো আছে
app.use(express.static(__dirname));

// হোম পেজ - index.html ফাইল পাঠানো
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// রেন্ডারের জন্য পোর্ট বাইন্ডিং (এখানেই পোর্ট একবারই ঘোষণা করা হয়েছে)
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});