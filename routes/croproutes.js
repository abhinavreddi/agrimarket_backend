// routes/cropRoutes.js
const express = require("express");
const multer = require("multer");
const { createCrop, getAllCrops, getCropById } = require("../controllers/cropController");

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // files stored locally in /uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Create crop (with file upload)
router.post("/", upload.array("files", 5), createCrop);

// Get all crops
router.get("/", getAllCrops);

// Get crop by ID
router.get("/:id", getCropById);

module.exports = router;
