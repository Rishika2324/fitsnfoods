const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Create uploads directory if it doesn't exist
const uploadDir = 'public/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Create data directory and uploads metadata file
const dataDir = path.join(__dirname, 'data');
const uploadsJson = path.join(dataDir, 'uploads.json');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsJson)) {
    fs.writeFileSync(uploadsJson, JSON.stringify([]), 'utf8');
}

function readUploadsMetadata() {
    try {
        const raw = fs.readFileSync(uploadsJson, 'utf8');
        return JSON.parse(raw || '[]');
    } catch (e) {
        console.error('Error reading uploads metadata:', e);
        return [];
    }
}

function writeUploadsMetadata(list) {
    try {
        fs.writeFileSync(uploadsJson, JSON.stringify(list, null, 2), 'utf8');
    } catch (e) {
        console.error('Error writing uploads metadata:', e);
    }
}

// Middleware to serve static files
app.use(express.static('public'));
app.use('/views', express.static(path.join(__dirname, 'views')));
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

app.get('/photobooth', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'photobooth.html'));
});

// API: return saved uploads metadata
app.get('/api/uploads', (req, res) => {
    const page = (req.query.page || '').toString().toLowerCase();
    if (!page || !['food', 'fashion'].includes(page)) {
        return res.status(400).json({ success: false, message: 'Valid page parameter (food/fashion) is required' });
    }
    const list = readUploadsMetadata();
    // Filter by saved page (case-insensitive)
    const filteredList = list.filter(item => item.page && item.page.toLowerCase() === page);
    console.log(`Serving ${filteredList.length} items for ${page} gallery`);
    res.json({ success: true, files: filteredList });
});

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Clean the filename
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        cb(null, `${Date.now()}-${safeName}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 5
    },
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.mimetype.startsWith('image/')) {
            cb(new Error('Only image files are allowed!'), false);
        } else {
            cb(null, true);
        }
    }
});

// Upload route
app.post('/upload', (req, res) => {
    console.log('Upload request received');
    
    upload.array('photos', 5)(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(400).json({
                success: false,
                message: err.message || 'Error uploading files'
            });
        }

        try {
            if (!req.files || !req.files.length) {
                return res.status(400).json({
                    success: false,
                    message: 'No files were uploaded'
                });
            }

            const uploadedFiles = req.files.map(file => ({
                filename: file.filename,
                path: '/uploads/' + file.filename
            }));

            // Persist metadata (title, category, description) for each uploaded file
            const existing = readUploadsMetadata();
            const title = (req.body && req.body.title) ? req.body.title : '';
            const category = (req.body && req.body.category) ? req.body.category : '';
            const description = (req.body && req.body.description) ? req.body.description : '';
            let page = (req.body && req.body.page) ? req.body.page.toString().toLowerCase() : '';

            // Enforce page to be either 'food' or 'fashion'
            if (!page || !['food', 'fashion'].includes(page)) {
                // If no page was supplied, try to infer from the Referer header (best-effort)
                const ref = (req.headers && req.headers.referer) ? req.headers.referer.toLowerCase() : '';
                if (ref.includes('/food')) page = 'food';
                else if (ref.includes('/fashion')) page = 'fashion';
            }

            if (!page) {
                return res.status(400).json({
                    success: false,
                    message: 'Page parameter is required (upload must come from /food or /fashion)'
                });
            }
            
            const now = Date.now();

            const newEntries = uploadedFiles.map(f => ({
                filename: f.filename,
                path: f.path,
                title: title,
                category: category,
                description: description,
                page: page,
                uploadedAt: now
            }));

            const merged = existing.concat(newEntries);
            writeUploadsMetadata(merged);

            console.log('Files uploaded successfully:', uploadedFiles);

            return res.json({
                success: true,
                message: 'Upload successful!',
                files: uploadedFiles
            });
        } catch (error) {
            console.error('Error processing upload:', error);
            return res.status(500).json({
                success: false,
                message: 'Error processing uploaded files'
            });
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});