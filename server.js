const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json({ limit: '10mb' }));

// خليك تخدم ملفات الواجهة من فولدر public
app.use(express.static(path.join(__dirname, 'public')));

// مسار رفع الصور
app.post('/upload', (req, res) => {
  const { image, answer } = req.body;
  const base64Data = image.replace(/^data:image\/png;base64,/, "");
  const filename = `selfie_${Date.now()}_${answer}.png`;
  fs.writeFile(path.join(__dirname, 'uploads', filename), base64Data, 'base64', (err) => {
    if (err) return res.status(500).send('خطأ في حفظ الصورة');
    console.log('تم حفظ الصورة:', filename);
    res.send('تم الاستلام');
  });
});

// مش لازم تكتب app.get('/') لأننا نستخدم express.static

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`السيرفر يعمل على المنفذ ${PORT}`);
});
