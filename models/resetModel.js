const mongoose = require('mongoose');

const emsResetSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

// Define a TTL index for automatic data expiration after 5 minutes (300 seconds)
emsResetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const resetModel = mongoose.model('ems_reset', emsResetSchema);

module.exports = resetModel;
