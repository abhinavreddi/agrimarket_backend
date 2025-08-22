const mongoose = require('mongoose');
const validator = require('validator');

const CropSchema = new mongoose.Schema({
  cropName: { type: String, required: true, trim: true },
  cropType: { type: String, required: true, enum: ['Cereal', 'Vegetable', 'Fruit', 'Spice', 'Other'] },
  cultivationSeason: { type: String, required: true, enum: ['Rabi', 'Kharif', 'Zaid', 'Other'] },
  fertilizerUsed: { type: String, default: '' },
  pesticidesUsed: { type: String, default: '' },

  phone: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const cleaned = v.replace(/[\s-()]/g, '');
        return validator.isMobilePhone(cleaned, ['en-IN']) || /^[+]?[\d]{7,15}$/.test(cleaned);
      },
      message: props => `${props.value} is not a valid phone number`
    }
  },

  files: [
    {
      originalName: { type: String, required: true },
      filename: { type: String, required: true },
      mimeType: { type: String, required: true },
      url: { type: String, required: true },
      size: { type: Number, required: true },
      uploadDate: { type: Date, default: Date.now }
    }
  ],

  basePrice: { type: Number, required: true, min: 0 },
  minimumExpectedPrice: { type: Number, required: true, min: 0 },
  maximumExpectedPrice: { type: Number, required: true, min: 0 },
  marketRegion: { type: String, required: true },
  bidTimeLimit: { type: Number, required: true, min: 1 },
  
  healthScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
    required: true
},

  createdAt: { type: Date, default: Date.now }
});

CropSchema.pre('validate', function (next) {
  if (this.minimumExpectedPrice > this.maximumExpectedPrice) {
    const err = new Error('Minimum Expected Price cannot exceed Maximum Expected Price');
    err.statusCode = 400;
    return next(err);
  }
  next();
});

module.exports = mongoose.model('Crop', CropSchema);
