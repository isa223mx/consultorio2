import express from 'express';
const router = express.Router();
import { addCompleteData } from '../controllers/signosControllers.js';
router.post('/add-complete-data', addCompleteData);

export default router;