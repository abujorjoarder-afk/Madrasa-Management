const express = require('express');
const path = require('path');
const app = express();

// এক্সপ্রেসকে বলুন যে এই ফোল্ডারেই ফাইলগুলো আছে
app.use(express.static(__dirname));

// হোম পেজ - Index.html ফাইল পাঠানো (বড় হাতের I দিয়ে)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

// রেন্ডারের জন্য পোর্ট বাইন্ডিং
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});