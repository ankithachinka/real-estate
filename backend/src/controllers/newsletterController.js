const Newsletter = require('../models/Newsletter');

// Get all newsletter subscribers
const getAllNewsletters = async (req, res) => {
    try {
        const newsletters = await Newsletter.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: newsletters,
            count: newsletters.length
        });
    } catch (error) {
        console.error('Error fetching newsletters:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch newsletter subscribers'
        });
    }
};

// Get a single newsletter subscriber by ID
const getNewsletterById = async (req, res) => {
    try {
        const newsletter = await Newsletter.findById(req.params.id);
        
        if (!newsletter) {
            return res.status(404).json({
                success: false,
                message: 'Newsletter subscriber not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: newsletter
        });
    } catch (error) {
        console.error('Error fetching newsletter:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch newsletter subscriber'
        });
    }
};

// Create a new newsletter subscription
const createNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Validate email
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }
        
        // Check if email already exists
        const existingNewsletter = await Newsletter.findOne({ email });
        if (existingNewsletter) {
            return res.status(400).json({
                success: false,
                message: 'This email is already subscribed'
            });
        }
        
        const newsletter = new Newsletter({
            email
        });
        
        await newsletter.save();
        
        res.status(201).json({
            success: true,
            message: 'Successfully subscribed to newsletter',
            data: newsletter
        });
    } catch (error) {
        console.error('Error creating newsletter subscription:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: errors
            });
        }
        
        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'This email is already subscribed'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to subscribe to newsletter'
        });
    }
};

// Delete a newsletter subscription
const deleteNewsletter = async (req, res) => {
    try {
        const newsletterId = req.params.id;
        
        const newsletter = await Newsletter.findById(newsletterId);
        if (!newsletter) {
            return res.status(404).json({
                success: false,
                message: 'Newsletter subscriber not found'
            });
        }
        
        await Newsletter.findByIdAndDelete(newsletterId);
        
        res.status(200).json({
            success: true,
            message: 'Newsletter subscription deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting newsletter:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete newsletter subscription'
        });
    }
};

// Update newsletter subscription status (activate/deactivate)
const updateNewsletterStatus = async (req, res) => {
    try {
        const { isActive } = req.body;
        const newsletterId = req.params.id;
        
        const newsletter = await Newsletter.findById(newsletterId);
        if (!newsletter) {
            return res.status(404).json({
                success: false,
                message: 'Newsletter subscriber not found'
            });
        }
        
        newsletter.isActive = isActive !== undefined ? isActive : !newsletter.isActive;
        await newsletter.save();
        
        res.status(200).json({
            success: true,
            message: `Newsletter subscription ${newsletter.isActive ? 'activated' : 'deactivated'} successfully`,
            data: newsletter
        });
    } catch (error) {
        console.error('Error updating newsletter status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update newsletter subscription status'
        });
    }
};

// Search newsletter subscribers
const searchNewsletters = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }
        
        const newsletters = await Newsletter.find({
            email: { $regex: query, $options: 'i' }
        }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: newsletters,
            count: newsletters.length
        });
    } catch (error) {
        console.error('Error searching newsletters:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search newsletter subscribers'
        });
    }
};

// Get newsletter statistics
const getNewsletterStats = async (req, res) => {
    try {
        const totalSubscribers = await Newsletter.countDocuments();
        const activeSubscribers = await Newsletter.countDocuments({ isActive: true });
        const subscribersThisMonth = await Newsletter.countDocuments({
            createdAt: {
                $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
        });
        
        // Get subscription trends for the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        const subscriptionTrends = await Newsletter.aggregate([
            {
                $match: {
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);
        
        res.status(200).json({
            success: true,
            data: {
                totalSubscribers,
                activeSubscribers,
                inactiveSubscribers: totalSubscribers - activeSubscribers,
                subscribersThisMonth,
                subscriptionTrends
            }
        });
    } catch (error) {
        console.error('Error fetching newsletter stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch newsletter statistics'
        });
    }
};

// Export newsletter subscribers (for email marketing)
const exportNewsletters = async (req, res) => {
    try {
        const { format = 'json' } = req.query;
        
        const newsletters = await Newsletter.find({ isActive: true })
            .select('email createdAt')
            .sort({ createdAt: -1 });
        
        if (format === 'csv') {
            // Convert to CSV format
            const csv = 'Email,Subscription Date\n' + 
                newsletters.map(n => `${n.email},${n.createdAt.toISOString()}`).join('\n');
            
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=newsletter_subscribers.csv');
            return res.send(csv);
        }
        
        // Default JSON format
        res.status(200).json({
            success: true,
            data: newsletters,
            count: newsletters.length
        });
    } catch (error) {
        console.error('Error exporting newsletters:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to export newsletter subscribers'
        });
    }
};

module.exports = {
    getAllNewsletters,
    getNewsletterById,
    createNewsletter,
    deleteNewsletter,
    updateNewsletterStatus,
    searchNewsletters,
    getNewsletterStats,
    exportNewsletters
};
