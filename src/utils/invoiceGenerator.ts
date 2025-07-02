import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Booking } from '../types/room';
import { format } from 'date-fns';

export interface InvoiceData {
  booking: Booking;
  paymentId: string;
  invoiceNumber: string;
  invoiceDate: string;
  hotelDetails: {
    name: string;
    address: string;
    phone: string;
    email: string;
    gst?: string;
  };
}

export const invoiceGenerator = {
  // Generate invoice PDF
  generateInvoicePDF: async (invoiceData: InvoiceData): Promise<Blob> => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Hotel Logo/Header
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(invoiceData.hotelDetails.name, 20, 30);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(invoiceData.hotelDetails.address, 20, 40);
    pdf.text(`Phone: ${invoiceData.hotelDetails.phone}`, 20, 50);
    pdf.text(`Email: ${invoiceData.hotelDetails.email}`, 20, 60);
    
    if (invoiceData.hotelDetails.gst) {
      pdf.text(`GST: ${invoiceData.hotelDetails.gst}`, 20, 70);
    }

    // Invoice Title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INVOICE', pageWidth - 60, 30);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Invoice #: ${invoiceData.invoiceNumber}`, pageWidth - 80, 45);
    pdf.text(`Date: ${invoiceData.invoiceDate}`, pageWidth - 80, 55);

    // Line separator
    pdf.line(20, 85, pageWidth - 20, 85);

    // Guest Details
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Bill To:', 20, 100);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(invoiceData.booking.guestName, 20, 115);
    pdf.text(invoiceData.booking.guestEmail, 20, 125);
    pdf.text(invoiceData.booking.guestPhone, 20, 135);

    // Booking Details
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Booking Details:', 20, 160);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Booking ID: ${invoiceData.booking.id}`, 20, 175);
    pdf.text(`Room: ${invoiceData.booking.room?.name || `Room ${invoiceData.booking.roomId}`}`, 20, 185);
    pdf.text(`Check-in: ${format(new Date(invoiceData.booking.checkInDate), 'MMM dd, yyyy')}`, 20, 195);
    pdf.text(`Check-out: ${format(new Date(invoiceData.booking.checkOutDate), 'MMM dd, yyyy')}`, 20, 205);
    
    const nights = Math.ceil((new Date(invoiceData.booking.checkOutDate).getTime() - new Date(invoiceData.booking.checkInDate).getTime()) / (1000 * 60 * 60 * 24));
    pdf.text(`Nights: ${nights}`, 20, 215);

    // Payment Details
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Payment Details:', pageWidth - 100, 160);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Payment ID: ${invoiceData.paymentId}`, pageWidth - 100, 175);
    pdf.text(`Status: ${invoiceData.booking.paymentStatus.toUpperCase()}`, pageWidth - 100, 185);

    // Line separator
    pdf.line(20, 230, pageWidth - 20, 230);

    // Amount Details
    const roomRate = invoiceData.booking.totalAmount / nights;
    const subtotal = invoiceData.booking.totalAmount;
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;

    pdf.setFontSize(10);
    pdf.text('Description', 20, 250);
    pdf.text('Qty', 100, 250);
    pdf.text('Rate', 130, 250);
    pdf.text('Amount', pageWidth - 40, 250);

    pdf.line(20, 255, pageWidth - 20, 255);

    pdf.text(`${invoiceData.booking.room?.name || 'Room'} (per night)`, 20, 270);
    pdf.text(nights.toString(), 100, 270);
    pdf.text(`₹${roomRate.toFixed(2)}`, 130, 270);
    pdf.text(`₹${subtotal.toFixed(2)}`, pageWidth - 60, 270);

    pdf.line(20, 280, pageWidth - 20, 280);

    // Totals
    pdf.text('Subtotal:', pageWidth - 80, 295);
    pdf.text(`₹${subtotal.toFixed(2)}`, pageWidth - 40, 295);

    pdf.text('GST (18%):', pageWidth - 80, 305);
    pdf.text(`₹${tax.toFixed(2)}`, pageWidth - 40, 305);

    pdf.setFont('helvetica', 'bold');
    pdf.text('Total:', pageWidth - 80, 320);
    pdf.text(`₹${total.toFixed(2)}`, pageWidth - 40, 320);

    // Footer
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Thank you for choosing Hotel Kalsubai Gate Point!', 20, pageHeight - 30);
    pdf.text('For any queries, please contact us at the above details.', 20, pageHeight - 20);

    return pdf.output('blob');
  },

  // Generate HTML invoice for preview
  generateInvoiceHTML: (invoiceData: InvoiceData): string => {
    const nights = Math.ceil((new Date(invoiceData.booking.checkOutDate).getTime() - new Date(invoiceData.booking.checkInDate).getTime()) / (1000 * 60 * 60 * 24));
    const roomRate = invoiceData.booking.totalAmount / nights;
    const subtotal = invoiceData.booking.totalAmount;
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice - ${invoiceData.invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .hotel-info h1 { margin: 0; color: #f59e0b; }
          .hotel-info p { margin: 5px 0; color: #666; }
          .invoice-info { text-align: right; }
          .invoice-info h2 { margin: 0; color: #333; }
          .separator { border-bottom: 2px solid #f59e0b; margin: 20px 0; }
          .details { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .bill-to, .booking-details { flex: 1; }
          .bill-to h3, .booking-details h3 { color: #333; margin-bottom: 10px; }
          .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .table th, .table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          .table th { background-color: #f8f9fa; }
          .totals { text-align: right; margin-top: 20px; }
          .totals .total { font-weight: bold; font-size: 18px; color: #f59e0b; }
          .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="hotel-info">
            <h1>${invoiceData.hotelDetails.name}</h1>
            <p>${invoiceData.hotelDetails.address}</p>
            <p>Phone: ${invoiceData.hotelDetails.phone}</p>
            <p>Email: ${invoiceData.hotelDetails.email}</p>
            ${invoiceData.hotelDetails.gst ? `<p>GST: ${invoiceData.hotelDetails.gst}</p>` : ''}
          </div>
          <div class="invoice-info">
            <h2>INVOICE</h2>
            <p>Invoice #: ${invoiceData.invoiceNumber}</p>
            <p>Date: ${invoiceData.invoiceDate}</p>
            <p>Payment ID: ${invoiceData.paymentId}</p>
          </div>
        </div>

        <div class="separator"></div>

        <div class="details">
          <div class="bill-to">
            <h3>Bill To:</h3>
            <p><strong>${invoiceData.booking.guestName}</strong></p>
            <p>${invoiceData.booking.guestEmail}</p>
            <p>${invoiceData.booking.guestPhone}</p>
          </div>
          <div class="booking-details">
            <h3>Booking Details:</h3>
            <p>Booking ID: ${invoiceData.booking.id}</p>
            <p>Room: ${invoiceData.booking.room?.name || `Room ${invoiceData.booking.roomId}`}</p>
            <p>Check-in: ${format(new Date(invoiceData.booking.checkInDate), 'MMM dd, yyyy')}</p>
            <p>Check-out: ${format(new Date(invoiceData.booking.checkOutDate), 'MMM dd, yyyy')}</p>
            <p>Nights: ${nights}</p>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${invoiceData.booking.room?.name || 'Room'} (per night)</td>
              <td>${nights}</td>
              <td>₹${roomRate.toFixed(2)}</td>
              <td>₹${subtotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div class="totals">
          <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
          <p>GST (18%): ₹${tax.toFixed(2)}</p>
          <p class="total">Total: ₹${total.toFixed(2)}</p>
        </div>

        <div class="footer">
          <p>Thank you for choosing Hotel Kalsubai Gate Point!</p>
          <p>For any queries, please contact us at the above details.</p>
        </div>
      </body>
      </html>
    `;
  },

  // Download invoice
  downloadInvoice: async (invoiceData: InvoiceData): Promise<void> => {
    const pdfBlob = await invoiceGenerator.generateInvoicePDF(invoiceData);
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${invoiceData.invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // Generate invoice number
  generateInvoiceNumber: (bookingId: number): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `INV-${year}${month}-${String(bookingId).padStart(4, '0')}`;
  }
};