const express = require('express');
const router = express.Router();
const { createTicket, getTicketById, downloadTicketPDF } = require('../controllers/ticketController');

router.route('/').post(createTicket);
router.route('/:id').get(getTicketById);
router.route('/:id/download').get(downloadTicketPDF);

module.exports = router;
