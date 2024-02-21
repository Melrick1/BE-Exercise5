const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware untuk request body menggunakan body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk file static
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Middleware untuk penanganan CORS
app.use(cors());

let data = [
    { id: 1, name: 'JavaScript', popularity: 9.8 },
    { id: 2, name: 'Python', popularity: 9.5 },
    { id: 3, name: 'Java', popularity: 8.7 },
    { id: 4, name: 'C#', popularity: 8.2 },
    { id: 5, name: 'PHP', popularity: 7.9 }
];

// Route untuk file statis
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contoh route untuk file upload
app.post('/upload', upload.single('file'), (req, res) => {
    // Akses detil file yang diupload melalui req.file
    console.log(req.file);
    res.send('File uploaded successfully!');
});

// Contoh route untuk API sederhana
app.get('/data', (req, res) => {
    res.json(data);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:3000`);
});