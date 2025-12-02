const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateTicketPDF = async (ticket, event) => {
  return new Promise((resolve, reject) => {
    try {
      // Create a document
      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50
        }
      });

      // Pipe the PDF into a buffer
      const chunks = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Colors
      const primaryColor = '#3B82F6'; // Blue
      const successColor = '#10B981'; // Green
      const darkColor = '#1F2937'; // Dark gray

      // Header with gradient effect
      doc.rect(0, 0, doc.page.width, 180).fill('#3B82F6');
      doc.rect(0, 150, doc.page.width, 30).fill('#2563EB');

      // Add title
      doc.fontSize(32).font('Helvetica-Bold').fillColor('#FFFFFF').text('EventHub Ticket', 50, 65);
      doc.fontSize(16).font('Helvetica').fillColor('#E0E7FF').text('Your Entry Pass', 120, 110);

      // Move to main content area
      let yPosition = 220;

      // Event title
      doc.fontSize(24).font('Helvetica-Bold').fillColor(darkColor).text(event.title, 50, yPosition, {
        width: doc.page.width - 100,
        align: 'center'
      });
      yPosition += 50;

      // Decorative line
      doc.moveTo(50, yPosition).lineTo(doc.page.width - 50, yPosition).strokeColor('#D1D5DB').stroke();
      yPosition += 30;

      // Event details in a grid
      const leftColumn = 70;
      const rightColumn = 320;
      const lineHeight = 30;

      // Date
      doc.fontSize(12).font('Helvetica').fillColor('#6B7280').text('Date:', leftColumn, yPosition);
      const eventDate = new Date(event.date);
      doc.fontSize(12).font('Helvetica-Bold').fillColor(darkColor).text(
        eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
        leftColumn,
        yPosition + 15,
        { width: 200 }
      );

      // Location
      doc.fontSize(12).font('Helvetica').fillColor('#6B7280').text('Location:', rightColumn, yPosition);
      doc.fontSize(12).font('Helvetica-Bold').fillColor(darkColor).text(event.location, rightColumn, yPosition + 15, {
        width: 200
      });
      yPosition += 60;

      // Customer details
      doc.fontSize(12).font('Helvetica').fillColor('#6B7280').text('Name:', leftColumn, yPosition);
      doc.fontSize(12).font('Helvetica-Bold').fillColor(darkColor).text(ticket.customerName, leftColumn, yPosition + 15, {
        width: 200
      });

      doc.fontSize(12).font('Helvetica').fillColor('#6B7280').text('Email:', rightColumn, yPosition);
      doc.fontSize(12).font('Helvetica-Bold').fillColor(darkColor).text(ticket.customerEmail, rightColumn, yPosition + 15, {
        width: 200
      });
      yPosition += 60;

      // Quantity and Price
      doc.fontSize(12).font('Helvetica').fillColor('#6B7280').text('Quantity:', leftColumn, yPosition);
      doc.fontSize(14).font('Helvetica-Bold').fillColor(darkColor).text(`${ticket.quantity} Ticket${ticket.quantity > 1 ? 's' : ''}`, leftColumn, yPosition + 15);

      const totalPrice = (event.price * ticket.quantity).toFixed(2);
      doc.fontSize(12).font('Helvetica').fillColor('#6B7280').text('Total Price:', rightColumn, yPosition);
      doc.fontSize(14).font('Helvetica-Bold').fillColor(successColor).text(`$${totalPrice}`, rightColumn, yPosition + 15);
      yPosition += 60;

      // Decorative line
      doc.moveTo(50, yPosition).lineTo(doc.page.width - 50, yPosition).strokeColor('#D1D5DB').stroke();
      yPosition += 20;

      // Ticket ID section with background
      doc.roundedRect(50, yPosition, doc.page.width - 100, 60, 10).fillAndStroke('#F3F4F6', '#D1D5DB');
      doc.fontSize(10).font('Helvetica').fillColor('#6B7280').text('Ticket ID', 0, yPosition + 12, {
        width: doc.page.width,
        align: 'center'
      });
      doc.fontSize(12).font('Courier-Bold').fillColor(darkColor).text(ticket._id.toString(), 0, yPosition + 30, {
        width: doc.page.width,
        align: 'center'
      });
      yPosition += 80;

      // QR Code section
      doc.fontSize(14).font('Helvetica-Bold').fillColor(darkColor).text('Scan QR Code at Venue Entrance', 0, yPosition, {
        width: doc.page.width,
        align: 'center'
      });
      yPosition += 30;

      // Add QR code if available
      if (ticket.qrCode) {
        try {
          // Extract base64 data from data URL
          const base64Data = ticket.qrCode.replace(/^data:image\/png;base64,/, '');
          const qrBuffer = Buffer.from(base64Data, 'base64');
          
          // Center the QR code
          const qrSize = 180;
          const qrX = (doc.page.width - qrSize) / 2;
          
          // Add white background for QR code
          doc.roundedRect(qrX - 15, yPosition - 15, qrSize + 30, qrSize + 30, 10).fill('#FFFFFF').stroke('#D1D5DB');
          
          // Add QR code
          doc.image(qrBuffer, qrX, yPosition, {
            width: qrSize,
            height: qrSize
          });
          yPosition += qrSize + 40;
        } catch (error) {
          console.error('Error adding QR code to PDF:', error);
          doc.fontSize(12).fillColor('#EF4444').text('QR Code unavailable', 0, yPosition, {
            width: doc.page.width,
            align: 'center'
          });
          yPosition += 30;
        }
      }

      // Footer with important notice
      yPosition = doc.page.height - 120;
      doc.roundedRect(50, yPosition, doc.page.width - 100, 70, 10).fillAndStroke('#EFF6FF', '#BFDBFE');
      doc.fontSize(10).font('Helvetica-Bold').fillColor(primaryColor).text('Important Notice', 0, yPosition + 15, {
        width: doc.page.width,
        align: 'center'
      });
      doc.fontSize(9).font('Helvetica').fillColor('#1E40AF').text(
        'Please present this ticket (printed or digital) at the event entrance.\nKeep this ticket safe and do not share with unauthorized persons.',
        0,
        yPosition + 35,
        {
          width: doc.page.width,
          align: 'center'
        }
      );

      // Finalize PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateTicketPDF };
