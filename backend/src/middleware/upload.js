const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Create unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter for images
const fileFilter = (req, file, cb) => {
    // Check if the file is an image
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
    },
    fileFilter: fileFilter
});

// Image cropping middleware (bonus feature)
const cropImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }

        const cropWidth = parseInt(process.env.CROP_WIDTH) || 450;
        const cropHeight = parseInt(process.env.CROP_HEIGHT) || 350;

        const inputPath = req.file.path;
        const outputPath = inputPath.replace(/\.[^/.]+$/, '-cropped.jpg');

        // Crop and resize the image
        await sharp(inputPath)
            .resize(cropWidth, cropHeight, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({ quality: 80 })
            .toFile(outputPath);

        // Update the file path in the request
        req.file.path = outputPath;
        req.file.filename = path.basename(outputPath);

        // Optionally, delete the original file
        const fs = require('fs');
        fs.unlinkSync(inputPath);

        next();
    } catch (error) {
        console.error('Image cropping error:', error);
        next(error);
    }
};

// Single image upload middleware
const uploadSingleImage = (fieldName) => {
    return [
        upload.single(fieldName),
        cropImage
    ];
};

module.exports = {
    uploadSingleImage,
    upload
};
