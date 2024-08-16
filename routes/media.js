import express from 'express';
import { uploadMedia, uploadToS3 } from '../controllers/mediaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/upload', authMiddleware, uploadMedia, uploadToS3);

export default router;
