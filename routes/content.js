import express from 'express';
import { createContent } from '../controllers/contentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/create', authMiddleware, createContent);

export default router;