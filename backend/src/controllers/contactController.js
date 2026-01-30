const Contact = require('../models/Contact');

// Get all contact submissions
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: contacts,
            count: contacts.length
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact submissions'
        });
    }
};

// Get a single contact by ID
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact submission'
        });
    }
};

// Create a new contact submission
const createContact = async (req, res) => {
    try {
        const { fullName, email, mobile, city } = req.body;
        
        // Validate required fields
        if (!fullName || !email || !mobile || !city) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        
        // Check if email already exists
        const existingContact = await Contact.findOne({ email });
        if (existingContact) {
            return res.status(400).json({
                success: false,
                message: 'This email has already been submitted'
            });
        }
        
        const contact = new Contact({
            fullName,
            email,
            mobile,
            city
        });
        
        await contact.save();
        
        res.status(201).json({
            success: true,
            message: 'Contact form submitted successfully',
            data: contact
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        
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
                message: 'This email has already been submitted'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to submit contact form'
        });
    }
};

// Delete a contact submission
const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        
        const contact = await Contact.findById(contactId);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }
        
        await Contact.findByIdAndDelete(contactId);
        
        res.status(200).json({
            success: true,
            message: 'Contact submission deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact submission'
        });
    }
};

// Search contact submissions
const searchContacts = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }
        
        const contacts = await Contact.find({
            $or: [
                { fullName: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { city: { $regex: query, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: contacts,
            count: contacts.length
        });
    } catch (error) {
        console.error('Error searching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search contact submissions'
        });
    }
};

// Get contact statistics
const getContactStats = async (req, res) => {
    try {
        const totalContacts = await Contact.countDocuments();
        const contactsThisMonth = await Contact.countDocuments({
            createdAt: {
                $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
        });
        
        const contactsByCity = await Contact.aggregate([
            {
                $group: {
                    _id: '$city',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
        
        res.status(200).json({
            success: true,
            data: {
                totalContacts,
                contactsThisMonth,
                contactsByCity
            }
        });
    } catch (error) {
        console.error('Error fetching contact stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact statistics'
        });
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact,
    searchContacts,
    getContactStats
};
