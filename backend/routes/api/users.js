const express = require('express'); // Import express in order to create routers
const usersCtrl = require('../../controllers/api/userController'); // import user controller
const router = express.Router(); // Use express to create a router

// POST /api/users
// router.post('/', usersCtrl.create);
router.route('/').post(usersCtrl.createUser);

// GET
router.route('/:id').get(usersCtrl.getUser);
// POST /api/users/login
router.route('/login').post(usersCtrl.login);

//

module.exports = router;