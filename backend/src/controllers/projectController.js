const Project = require('../models/Project');
const path = require('path');

// Get all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: projects,
            count: projects.length
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch projects'
        });
    }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch project'
        });
    }
};

// Create a new project
const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        // Check if image was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Project image is required'
            });
        }
        
        // Create image URL
        const imageUrl = `/uploads/${req.file.filename}`;
        
        const project = new Project({
            name,
            description,
            image: imageUrl
        });
        
        await project.save();
        
        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create project'
        });
    }
};

// Update a project
const updateProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const projectId = req.params.id;
        
        // Find existing project
        const existingProject = await Project.findById(projectId);
        if (!existingProject) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        
        // Prepare update data
        const updateData = {
            name,
            description,
            updatedAt: Date.now()
        };
        
        // Update image if new file was uploaded
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }
        
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            updateData,
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: updatedProject
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update project'
        });
    }
};

// Delete a project
const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        
        // Delete the project
        await Project.findByIdAndDelete(projectId);
        
        // Optionally, delete the associated image file
        const fs = require('fs');
        const imagePath = path.join(__dirname, '../../uploads', path.basename(project.image));
        
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image file:', err);
            }
        });
        
        res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete project'
        });
    }
};

// Search projects
const searchProjects = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }
        
        const projects = await Project.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: projects,
            count: projects.length
        });
    } catch (error) {
        console.error('Error searching projects:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search projects'
        });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    searchProjects
};
