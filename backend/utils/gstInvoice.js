const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateGSTInvoice = (order, user) => {
  return new Promise((resolve, reject) => {

    const invoicesDir = path.join(__dirname, "../invoices");

    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir, { recursive: true });
    }

    const filePath = path.join(
      invoicesDir,
      `invoice_${order._id}.pdf`
    );

    const doc = new PDFDocument({ margin: 40 });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    
    doc
      .fontSize(22)
      .fillColor("#0a1f44")
      .font("Helvetica-Bold")
      .text("TAX INVOICE", { align: "center" });

    doc.moveDown(0.5);

    doc
      .fontSize(10)
      .fillColor("black")
      .text("Walmart Pvt Ltd")   
      .text("GSTIN: 29ABCDE1234F1Z5")
      .text("Mangaluru, India"); 

    doc.moveDown();

    doc.text(`Invoice ID: ${order._id}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);

    doc.moveDown();

    doc.text(`Bill To:`);
    doc.text(`${user.firstName} ${user.lastName}`);
    doc.text(`${user.email}`);
    doc.text(`Phone: ${user.phone}`);

    doc.moveDown(2);

    
    const tableTop = doc.y;

    const itemX = 50;
    const qtyX = 300;
    const priceX = 360;
    const totalX = 450;

    doc.font("Helvetica-Bold");

    doc.text("Item", itemX, tableTop);
    doc.text("Qty", qtyX, tableTop);
    doc.text("Price", priceX, tableTop);
    doc.text("Total", totalX, tableTop);

    doc.moveTo(50, tableTop + 15)
       .lineTo(550, tableTop + 15)
       .stroke();

    
    doc.font("Helvetica");

    let y = tableTop + 25;
    let subtotal = 0;

    order.items.forEach((item) => {
      const total = item.price * item.qty;
      subtotal += total;

      
      doc.text(item.name, itemX, y, { width: 230 });

      doc.text(item.qty.toString(), qtyX, y);
      doc.text(`₹${item.price}`, priceX, y);
      doc.text(`₹${total}`, totalX, y);

      
      const itemHeight = doc.heightOfString(item.name, { width: 230 });
      y += itemHeight + 10;
    });

    
    const cgst = subtotal * 0.09;
    const sgst = subtotal * 0.09;
    const grandTotal = subtotal + cgst + sgst;

    doc.moveTo(50, y + 10)
       .lineTo(550, y + 10)
       .stroke();

    y += 25;

    doc.text(`Subtotal: Rs.${subtotal.toFixed(2)}`, 350, y);

    y += 20;
    doc.text(`CGST (9%): Rs.${cgst.toFixed(2)}`, 350, y);

    y += 20;
    doc.text(`SGST (9%): Rs.${sgst.toFixed(2)}`, 350, y);

    y += 25;

    doc.font("Helvetica-Bold").fontSize(12);
    doc.text(`Grand Total: Rs.${grandTotal.toFixed(2)}`, 350, y);

    doc.moveDown(3);

    
    doc.fontSize(10).font("Helvetica");

    doc.text("Thank you for shopping with us ", {
      align: "center"
    });

    doc.moveDown();

    doc.text("This is a computer generated invoice.", {
      align: "center"
    });

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};

module.exports = generateGSTInvoice;