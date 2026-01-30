const Client = require('../models/Client');
const path = require('path');

// Get all clients
const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: clients,
            count: clients.length
        });
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch clients'
        });
    }
};

// Get a single client by ID
const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        
        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: client
        });
    } catch (error) {
        console.error('Error fetching client:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch client'
        });
    }
};

// Create a new client
const createClient = async (req, res) => {
    try {
        const { name, description, designation } = req.body;
        
        // Check if image was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Client image is required'
            });
        }
        
        // Create image URL
        const imageUrl = `/uploads/${req.file.filename}`;
        
        const client = new Client({
            name,
            description,
            designation,
            image: imageUrl
        });
        
        await client.save();
        
        res.status(201).json({
            success: true,
            message: 'Client created successfully',
            data: client
        });
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create client'
        });
    }
};

// Update a client
const updateClient = async (req, res) => {
    try {
        const { name, description, designation } = req.body;
        const clientId = req.params.id;
        
        // Find existing client
        const existingClient = await Client.findById(clientId);
        if (!existingClient) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }
        
        // Prepare update data
        const updateData = {
            name,
            description,
            designation,
            updatedAt: Date.now()
        };
        
        // Update image if new file was uploaded
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }
        
        const updatedClient = await Client.findByIdAndUpdate(
            clientId,
            updateData,
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            message: 'Client updated successfully',
            data: updatedClient
        });
    } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update client'
        });
    }
};

// Delete a client
const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }
        
        // Delete the client
        await Client.findByIdAndDelete(clientId);
        
        // Optionally, delete the associated image file
        const fs = require('fs');
        const imagePath = path.join(__dirname, '../../uploads', path.basename(client.image));
        
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image file:', err);
            }
        });
        
        res.status(200).json({
            success: true,
            message: 'Client deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete client'
        });
    }
};

// Search clients
const searchClients = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }
        
        const clients = await Client.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { designation: { $regex: query, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: clients,
            count: clients.length
        });
    } catch (error) {
        console.error('Error searching clients:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search clients'
        });
    }
};

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    searchClients
};
