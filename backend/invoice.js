const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');
const path = require('path');

function generateInvoiceHTML(booking, pkg) {
  return `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); font-size: 16px; line-height: 24px; color: #555; }
        .invoice-box table { width: 100%; line-height: inherit; text-align: left; border-collapse: collapse; }
        .invoice-box table td { padding: 5px; vertical-align: top; }
        .invoice-box table tr td:nth-child(2) { text-align: right; }
        .invoice-box table tr.top table td { padding-bottom: 20px; }
        .invoice-box table tr.top table td.title { font-size: 45px; line-height: 45px; color: #333; }
        .invoice-box table tr.information table td { padding-bottom: 40px; }
        .invoice-box table tr.heading td { background: #eee; border-bottom: 1px solid #ddd; font-weight: bold; }
        .invoice-box table tr.details td { padding-bottom: 20px; }
        .invoice-box table tr.item td { border-bottom: 1px solid #eee; }
        .invoice-box table tr.item.last td { border-bottom: none; }
        .invoice-box table tr.total td:nth-child(2) { border-top: 2px solid #eee; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <table>
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title">
                    <h2>Invoice</h2>
                  </td>
                  <td>
                    Date: ${new Date().toLocaleDateString()}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td>
                    <strong>Customer Details:</strong><br />
                    ${booking.name}<br />
                    ${booking.email}<br />
                    ${booking.phone}
                  </td>
                  <td>
                    <strong>Package Details:</strong><br />
                    ${pkg.title}<br />
                    Price: ${pkg.price}<br />
                    Total Travelers: ${booking.travelers}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="heading">
            <td>Item</td>
            <td>Price</td>
          </tr>
          <tr class="item">
            <td>${pkg.title}</td>
            <td>${pkg.price}</td>
          </tr>
          <tr class="total">
            <td></td>
            <td>Total: ${booking.totalPrice}</td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;
}

async function generateInvoicePDF(html, bookingId) {
  const invoiceDir = path.join(__dirname, 'invoices');
  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir);
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();

  page.drawText(html, {
    x: 50,
    y: height - 100,
    size: 12,
    color: rgb(0, 0, 0),
    maxWidth: width - 100
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(path.join(invoiceDir, `invoice_${bookingId}.pdf`), pdfBytes);
}

module.exports = {
  generateInvoiceHTML,
  generateInvoicePDF,
};
