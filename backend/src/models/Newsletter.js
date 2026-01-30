const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email address is required'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address'
        ]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for better search performance
newsletterSchema.index({ email: 1 }, { unique: true });
newsletterSchema.index({ createdAt: -1 });

// Virtual for formatted date
newsletterSchema.virtual('formattedDate').get(function() {
    return this.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
});

// Virtual for formatted time
newsletterSchema.virtual('formattedTime').get(function() {
    return this.createdAt.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
});

// Ensure virtual fields are included in JSON output
newsletterSchema.set('toJSON', { virtuals: true });
newsletterSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Newsletter', newsletterSchema);
