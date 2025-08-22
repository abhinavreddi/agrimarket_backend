const Crop = require('../models/Crop');

exports.createCrop = async (req, res) => {
  try {
    // Ensure multer uploaded files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one file is required.' });
    }

    // Map multer file objects to schema's files array
    const fileData = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      mimeType: file.mimetype,
      url: `/uploads/${file.filename}`, // adjust if you serve differently
      size: file.size
    }));

    const {
      cropName,
      cropType,
      cultivationSeason,
      fertilizerUsed,
      pesticidesUsed,
      phone,
      basePrice,
      minimumExpectedPrice,
      maximumExpectedPrice,
      marketRegion,
      bidTimeLimit,
      healthScore,
    } = req.body;

    // Create crop
    const crop = new Crop({
      cropName,
      cropType,
      cultivationSeason,
      fertilizerUsed,
      pesticidesUsed,
      phone,
      files: fileData,
      basePrice,
      minimumExpectedPrice,
      maximumExpectedPrice,
      marketRegion,
      bidTimeLimit,
      healthScore
    });

    await crop.save();

    res.status(201).json({ success: true, data: crop });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all crops
exports.getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().sort({ createdAt: -1 });
    res.json({ success: true, data: crops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get specific crop by ID
exports.getCropById = async (req, res) => {
  try {
    const { id } = req.params;
    const crop = await Crop.findById(id);

    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop not found' });
    }

    res.json({ success: true, data: crop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
