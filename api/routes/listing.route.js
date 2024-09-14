import express from 'express';
import { createListing,deleteListing } from '../controllers/listning.controller.js';
import { verifyToken } from '../utils/Verifyuser.js';

const router=express.Router();

router.post('/create',verifyToken, createListing);
router.delete('/delete/:id',verifyToken,deleteListing);

export default router;