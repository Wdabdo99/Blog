// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    secure: true
});


/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async imagePath => {
    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resource_type: "auto"
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);

        return result;
    } catch (error) {
        
        return error;
    }
};
const deleteImage = async id => {
    try {
        // Upload the image
        const result = await cloudinary.uploader.destroy(id);
        return result;
    } catch (error) {
        
        return error;
    }
};

module.exports = {
    uploadImage,
    deleteImage
};
