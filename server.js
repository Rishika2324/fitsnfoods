const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware to serve static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/food', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'food.html'));
});

app.get('/fashion', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'fashion.html'));
});

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'upload.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'game.html'));
});


// Multer setup (to save uploaded files in public/uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('media'), (req, res) => {
  console.log('File uploaded:', req.file);
  res.send('Upload successful!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

});