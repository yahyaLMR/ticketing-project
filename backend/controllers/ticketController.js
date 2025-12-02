const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const generateQR = require('../utils/generateQR');
const { generateTicketPDF } = require('../utils/generatePDF');

// @desc    Create/Buy ticket
// @route   POST /api/tickets
// @access  Public
const createTicket = async (req, res) => {
  const { eventId, customerName, customerEmail, quantity } = req.body;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availableSeats < quantity) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Generate QR Code data (unique string, e.g., eventId + timestamp + email)
    const qrData = JSON.stringify({
      eventId,
      customerEmail,
      quantity,
      date: new Date().toISOString(),
    });
    
    const qrCodeImage = await generateQR(qrData);

    const ticket = new Ticket({
      eventId,
      customerName,
      customerEmail,
      quantity,
      qrCode: qrCodeImage,
    });

    const createdTicket = await ticket.save();

    // Update available seats
    event.availableSeats -= quantity;
    await event.save();

    res.status(201).json(createdTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get ticket info
// @route   GET /api/tickets/:id
// @access  Public
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('eventId');

    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Download ticket as PDF
// @route   GET /api/tickets/:id/download
// @access  Public
const downloadTicketPDF = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('eventId');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Generate PDF
    const pdfBuffer = await generateTicketPDF(ticket, ticket.eventId);

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=ticket-${ticket._id}.pdf`);
    res.setHeader('Content-Length', pdfBuffer.length);

    // Send PDF buffer
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Error generating PDF: ' + error.message });
  }
};

module.exports = {
  createTicket,
  getTicketById,
  downloadTicketPDF,
};
