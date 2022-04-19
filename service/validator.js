const { check } = require('express-validator');

module.exports = {
    validateRegistration: [
        check('email', 'email field can\'t be empty').notEmpty(),
        check('email', 'email must be longer than 6 and shorter than 18 characters').isLength({ min: 6, max: 18 }),
        check('password', 'password field can\'t be empty').notEmpty(),
        check('password', 'password must be longer than 4 and shorter than 14 characters').isLength({ min: 4, max: 14 }),
        check('name', 'email field can\'t be empty').notEmpty()
    ],

    validateLogin: [
        check('email', 'email field can\'t be empty').notEmpty(),
        check('password', 'password field can\'t be empty').notEmpty()
    ]
}
