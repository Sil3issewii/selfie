const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const path = require('path');

cloudinary.config({ 
  cloud_name: 'dbu3lr13i', 
  api_key: '738414349564117', 
  api_secret: '03HmeWpOp9P74f1saeOGWzzAfp0' 
});

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', (req, res) => {
  try {
    const { image, answer } = req.body;
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    const stream = cloudinary.uploader.upload_stream(
      { folder: 'selfie', public_id: `selfie_${Date.now()}_${answer}`, resource_type: 'image' },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send('خطأ في رفع الصورة');
        }
        console.log('تم رفع الصورة إلى Cloudinary:', result.secure_url);
        res.send('تم رفع الصورة بنجاح');
      }
    );

    stream.end(buffer);

  } catch (err) {
    console.error('خطأ:', err);
    res.status(500).send('خطأ داخلي');
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`السيرفر يعمل على المنفذ ${PORT}`));
