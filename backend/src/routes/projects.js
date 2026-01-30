const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { uploadSingleImage } = require('../middleware/upload');

// GET /api/projects - Get all projects
router.get('/', projectController.getAllProjects);

// GET /api/projects/search - Search projects
router.get('/search', projectController.searchProjects);

// GET /api/projects/:id - Get a single project
router.get('/:id', projectController.getProjectById);

// POST /api/projects - Create a new project
router.post('/', uploadSingleImage('image'), projectController.createProject);

// PUT /api/projects/:id - Update a project
router.put('/:id', uploadSingleImage('image'), projectController.updateProject);

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', projectController.deleteProject);

module.exports = router;
