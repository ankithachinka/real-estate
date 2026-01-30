const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET /api/contacts - Get all contact submissions
router.get('/', contactController.getAllContacts);

// GET /api/contacts/search - Search contact submissions
router.get('/search', contactController.searchContacts);

// GET /api/contacts/stats - Get contact statistics
router.get('/stats', contactController.getContactStats);

// GET /api/contacts/:id - Get a single contact submission
router.get('/:id', contactController.getContactById);

// POST /api/contacts - Create a new contact submission
router.post('/', contactController.createContact);

// DELETE /api/contacts/:id - Delete a contact submission
router.delete('/:id', contactController.deleteContact);

module.exports = router;
