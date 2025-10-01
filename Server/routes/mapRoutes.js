import express from 'express';
import { findBestRoutes } from '../controllers/mapController.js';

const router = express.Router();

// @route   POST api/routes/find
// @desc    Find 3 best routes
// @access  Public
router.post('/find', findBestRoutes);

export default router;