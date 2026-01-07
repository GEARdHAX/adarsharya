const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Cloudinary Imports
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const Project = require('./models/Project');

const app = express();

// --- 1. CONFIGURATION ---
// Debugging logs to ensure .env is loaded
console.log("Cloudinary Config Check:");
console.log("- Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "✅ Loaded" : "❌ Missing");
console.log("- API Key:", process.env.CLOUDINARY_API_KEY ? "✅ Loaded" : "❌ Missing");

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/adarsharya';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";
const PORT = process.env.PORT || 5000;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// --- 2. STORAGE ENGINE (Dynamic Folders) ---
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Default folder
        let folderName = 'adarsharya/others';

        // Sort into specific folders based on field name
        if (file.fieldname === 'imageFile') {
            folderName = 'adarsharya/ProjectImage';
        } else if (file.fieldname.startsWith('techImage_')) {
            folderName = 'adarsharya/IconImage';
        }

        return {
            folder: folderName,
            resource_type: 'auto', // IMPORTANT: Allows jpg, png, svg, etc.
            // allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'], // Commented out to prevent errors during testing
        };
    },
});

const upload = multer({ storage: storage });

// --- 3. MIDDLEWARE ---
app.use(cors({
    origin: [
        "https://adarsharya.vercel.app", // Your deployed frontend
        "http://localhost:3000",         // Local React
        "http://localhost:5173"          // Local Vite
    ],
    credentials: true
}));

app.use(express.json());

// Keep this line to serve old local files if you have any left
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- 4. AUTH MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


// --- 5. ROUTES ---

// GET ALL UNIQUE TECH ICONS
app.get('/api/icons', async (req, res) => {
    try {
        const projects = await Project.find({}, 'techImages');
        const iconMap = new Map();

        projects.forEach(p => {
            if (p.techImages) {
                p.techImages.forEach(img => {
                    // Use URL as key to ensure uniqueness
                    if (img.src && !iconMap.has(img.src)) {
                        iconMap.set(img.src, { src: img.src, alt: img.alt });
                    }
                });
            }
        });

        // Convert map values to array
        const uniqueIcons = Array.from(iconMap.values());
        res.json(uniqueIcons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// LOGIN
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        // Token valid for 1 hour
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token: token });
    } else {
        res.status(401).json({ success: false, message: "Invalid Password" });
    }
});

// GET PUBLIC PROJECTS
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE PROJECT (Protected + Uploads)
app.post('/api/projects', authenticateToken, upload.any(), async (req, res) => {
    try {
        // Parse JSON strings from FormData
        const techImages = req.body.techImages ? JSON.parse(req.body.techImages) : [];
        const imageStyle = req.body.imageStyle ? JSON.parse(req.body.imageStyle) : {};

        // 1. Handle Main Image (Cloudinary URL is in file.path)
        const mainImageFile = req.files.find(f => f.fieldname === 'imageFile');
        let mainImagePath = req.body.image || '';
        if (mainImageFile) mainImagePath = mainImageFile.path;

        // 2. Handle Tech Icons
        const updatedTechImages = techImages.map((tech, index) => {
            const techFile = req.files.find(f => f.fieldname === `techImage_${index}`);
            if (techFile) return { ...tech, src: techFile.path };
            return tech;
        });

        const newProject = new Project({
            ...req.body,
            image: mainImagePath,
            imageStyle: imageStyle,
            techImages: updatedTechImages
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        // Pass error to the global handler below
        next(err);
    }
});

// UPDATE PROJECT (Protected + Uploads)
app.put('/api/projects/:id', authenticateToken, upload.any(), async (req, res) => {
    try {
        const techImages = req.body.techImages ? JSON.parse(req.body.techImages) : [];
        const imageStyle = req.body.imageStyle ? JSON.parse(req.body.imageStyle) : {};

        const mainImageFile = req.files.find(f => f.fieldname === 'imageFile');
        let mainImagePath = req.body.image;
        if (mainImageFile) mainImagePath = mainImageFile.path;

        const updatedTechImages = techImages.map((tech, index) => {
            const techFile = req.files.find(f => f.fieldname === `techImage_${index}`);
            if (techFile) return { ...tech, src: techFile.path };
            return tech;
        });

        const updatedData = {
            ...req.body,
            image: mainImagePath,
            imageStyle: imageStyle,
            techImages: updatedTechImages
        };

        const updatedProject = await Project.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json(updatedProject);
    } catch (err) {
        next(err);
    }
});

// DELETE PROJECT (Protected)
app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        next(err);
    }
});

// --- 6. GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
    // This prints the actual error object instead of [object Object]
    console.error("🔥 ERROR DETAILS:", JSON.stringify(err, null, 2));

    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            message: "File Upload Error",
            error: err.message
        });
    }

    res.status(500).json({
        message: "Server Error",
        error: err.message || "Unknown Error"
    });
});

// --- 7. START SERVER ---
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));