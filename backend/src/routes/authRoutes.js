const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validationMiddleware');
const authController = require('../controllers/authController'); 

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validateRequest,
  ],
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').exists().withMessage('Password is required'),
    validateRequest,
  ],
  authController.login
);

module.exports = router;


