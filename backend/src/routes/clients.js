const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { uploadSingleImage } = require('../middleware/upload');

// GET /api/clients - Get all clients
router.get('/', clientController.getAllClients);

// GET /api/clients/search - Search clients
router.get('/search', clientController.searchClients);

// GET /api/clients/:id - Get a single client
router.get('/:id', clientController.getClientById);

// POST /api/clients - Create a new client
router.post('/', uploadSingleImage('image'), clientController.createClient);

// PUT /api/clients/:id - Update a client
router.put('/:id', uploadSingleImage('image'), clientController.updateClient);

// DELETE /api/clients/:id - Delete a client
router.delete('/:id', clientController.deleteClient);

module.exports = router;
