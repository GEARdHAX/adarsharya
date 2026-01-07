const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true },
    // Storing style object (e.g., { backgroundColor: 'black' })
    imageStyle: { type: mongoose.Schema.Types.Mixed, default: {} },
    techCount: { type: Number, default: 0 },
    // Array of objects for tech icons
    techImages: [{
        src: String,
        alt: String
    }],
    description: { type: String, required: true },
    link: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);