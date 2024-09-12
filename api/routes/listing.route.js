import express from 'express';
import { createListing } from '../controllers/listning.controller.js';
import { verifyToken } from '../utils/Verifyuser.js';

const router=express.Router();

router.post('/create',verifyToken, createListing);

export default router;