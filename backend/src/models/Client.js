const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Client name is required'],
        trim: true,
        maxlength: [100, 'Client name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Client description is required'],
        trim: true,
        maxlength: [500, 'Client description cannot exceed 500 characters']
    },
    designation: {
        type: String,
        required: [true, 'Client designation is required'],
        trim: true,
        maxlength: [100, 'Client designation cannot exceed 100 characters']
    },
    image: {
        type: String,
        required: [true, 'Client image is required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
clientSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Index for better search performance
clientSchema.index({ name: 'text', description: 'text', designation: 'text' });

// Virtual for formatted date
clientSchema.virtual('formattedDate').get(function() {
    return this.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
});

// Ensure virtual fields are included in JSON output
clientSchema.set('toJSON', { virtuals: true });
clientSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Client', clientSchema);
