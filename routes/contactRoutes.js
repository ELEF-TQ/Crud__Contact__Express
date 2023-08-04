const express = require('express');
const router = express.Router();

const {getContacts , getContact,addContact , deleteContact , updateContact} = require('../controllers/contactController');
const validateToken = require('../middleware/validateToken');

router.use(validateToken)
router.route('/').get(getContacts).post(addContact); 
router.route('/:id').put(updateContact).delete(deleteContact).get(getContact);




module.exports = router;