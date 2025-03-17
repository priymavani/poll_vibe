import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary upload function with error handling
const uploadToCloudinary = async (file) => {
    try {
        if (!file) throw new Error('No file provided');

        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'poll_images',
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
            max_bytes: 5 * 1024 * 1024, // 5MB
            resource_type: 'auto'
        });

        return {
            success: true,
            url: result.secure_url,
            public_id: result.public_id
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || 'Error uploading to Cloudinary'
        };
    }
};

// Function to delete image from Cloudinary
const deleteFromCloudinary = async (public_id) => {
    try {
        if (!public_id) throw new Error('No public_id provided');

        console.log('Attempting to delete from Cloudinary:', public_id);
        
        // Try to delete the image
        const result = await cloudinary.uploader.destroy(public_id, { 
            resource_type: 'image',
            invalidate: true 
        });
        console.log('Cloudinary delete result:', result);

        if (result.result !== 'ok') {
            console.error('Cloudinary delete failed:', result);
            return {
                success: false,
                error: `Cloudinary deletion failed: ${result.result}`
            };
        }

        return {
            success: true,
            message: 'Image deleted successfully'
        };
    } catch (error) {
        console.error('Error in deleteFromCloudinary:', error);
        return {
            success: false,
            error: error.message || 'Error deleting from Cloudinary'
        };
    }
};

export { uploadToCloudinary, deleteFromCloudinary }; 