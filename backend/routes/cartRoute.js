import express from 'express'
const router = express.Router()
import { addToCart,removeFromCart } from '../controllers/cartController.js';
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/addToCart').post(protect, addToCart);
router.route('/removeFromCart').post(protect, removeFromCart);
export default router
