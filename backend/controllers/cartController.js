
import asyncHandler from 'express-async-handler';
import Cart from '../models/cart.js';
import sendMail from '../email.js';


// @desc    Add items to user's cart
// @route   POST /api/user/addToCart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { userId, cartItems } = req.body;

  // Find the user's cart or create a new one if it doesn't exist
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, cartItems });
  } else {
    // Merge new cart items with existing cart items
    cart.cartItems.push(...cartItems);
    await cart.save();
  }

  res.status(201).json(cart);
});
const sendEmailIfCartNotEmpty = async () => {
    try {
      // Find all carts where the cartItems array is not empty
      const nonEmptyCarts = await Cart.find({ cartItems: { $ne: [] } }).populate('user');
  
      // Iterate through each non-empty cart
      for (const cart of nonEmptyCarts) {
        // Check if the cart has a user
        if (cart.user) {
          // Fetch user's email address using the user ID associated with the cart
          const userEmail = cart.user.email;
  
          // Construct email message
          const emailMessage = `Dear Customer,\n\nYour cart contains items that are waiting for you. Please log in to your account to complete your purchase.\n\nBest regards,\nCivilGuruji`;
  
          // Send email notification
          await sendMail('arfiesolutions@gmail.com', userEmail, 'Your Cart Courses Pending -CivilGuruji', emailMessage);
  
          console.log(`Email notification sent to ${userEmail}`);
        }
      }
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  };
  
  
  const removeFromCart = asyncHandler(async (req, res) => {
    const { id, userId } = req.body;
  
    try {
      // Find the user's cart by userId
      let cart = await Cart.findOne({ user: userId });
  
      if (cart) {
        // Remove the item with the given id from the cart
        cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== id);
  
        // Save the updated cart
        await cart.save();
  
        res.json(cart);
      } else {
        res.status(404).json({ message: 'Cart not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

export { addToCart,sendEmailIfCartNotEmpty,removeFromCart };
