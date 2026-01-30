const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

// GET /api/newsletters - Get all newsletter subscribers
router.get('/', newsletterController.getAllNewsletters);

// GET /api/newsletters/search - Search newsletter subscribers
router.get('/search', newsletterController.searchNewsletters);

// GET /api/newsletters/stats - Get newsletter statistics
router.get('/stats', newsletterController.getNewsletterStats);

// GET /api/newsletters/export - Export newsletter subscribers
router.get('/export', newsletterController.exportNewsletters);

// GET /api/newsletters/:id - Get a single newsletter subscriber
router.get('/:id', newsletterController.getNewsletterById);

// POST /api/newsletters - Create a new newsletter subscription
router.post('/', newsletterController.createNewsletter);

// PUT /api/newsletters/:id - Update newsletter subscription status
router.put('/:id', newsletterController.updateNewsletterStatus);

// DELETE /api/newsletters/:id - Delete a newsletter subscription
router.delete('/:id', newsletterController.deleteNewsletter);

module.exports = router;
