const mongoose = require('mongoose');

const emsTempSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

// Define a TTL index for automatic data expiration after 1 minute (60 seconds)
emsTempSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const tempModel = mongoose.model('ems_temp', emsTempSchema);

module.exports = tempModel;