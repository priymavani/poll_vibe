import multer from 'multer';
import path from 'path';

// File type validation
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`), false);
    }
};

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use absolute path to uploads directory
        const uploadPath = path.join(process.cwd(), 'uploads');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Multer configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit per file
        files: 10 // Maximum number of files
    }
});

// Error handling middleware
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        switch (err.code) {
            case 'LIMIT_FILE_SIZE':
                return res.status(400).json({
                    success: false,
                    error: 'File size exceeds 5MB limit'
                });
            case 'LIMIT_FILE_COUNT':
                return res.status(400).json({
                    success: false,
                    error: 'Too many files. Maximum is 10 files'
                });
            default:
                return res.status(400).json({
                    success: false,
                    error: 'Error uploading file'
                });
        }
    }
    if (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
    next();
};

export { upload, handleUploadError };
