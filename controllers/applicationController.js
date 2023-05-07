const fs = require("fs");
const Machine = require("../models/Machine");

exports.uploadPhotoController = async (req, res) => {
    const { machineId } = req.params;
    const { path: imagePath, mimetype } = req.file;

    try {
        // Read the image file as a buffer
        const imageBuffer = fs.readFileSync(imagePath);

        // Update the Machine document with the photo buffer and content type
        await Machine.findByIdAndUpdate(machineId, {
            photo: {
                data: imageBuffer,
                contentType: mimetype,
            },
        });

        // Delete the temporary file after storing the image buffer
        fs.unlinkSync(imagePath);

        res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to upload image" });
    }
};
