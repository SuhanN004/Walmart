const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateGSTInvoice = (order, user) => {
  return new Promise((resolve, reject) => {

    // 🔥 CREATE FOLDER IF NOT EXISTS
    const invoicesDir = path.join(__dirname, "../invoices");

    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir, { recursive: true });
      console.log("📁 invoices folder created");
    }

    // 🔥 FILE PATH
    const filePath = path.join(
      invoicesDir,
      `invoice_${order._id}.pdf`
    );

    console.log("📄 Generating PDF at:", filePath);

    const doc = new PDFDocument({ margin: 40 });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    /* ================= HEADER ================= */
    doc
      .fontSize(22)
      .fillColor("#0a1f44")
      .text("TAX INVOICE", { align: "center" });

    doc.moveDown(0.5);

    doc
      .fontSize(10)
      .fillColor("black")
      .text("Your Company Pvt Ltd")
      .text("GSTIN: 29ABCDE1234F1Z5")
      .text("Bangalore, India");

    doc.moveDown();

    doc.text(`Invoice ID: ${order._id}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);

    doc.moveDown();

    doc.text(`Bill To:`);
    doc.text(`${user.firstName} ${user.lastName}`);
    doc.text(`${user.email}`);
    doc.text(`Phone: ${user.phone}`);

    doc.moveDown(2);

    /* ================= TABLE HEADER ================= */
    const tableTop = doc.y;

    doc.font("Helvetica-Bold");

    doc.text("Item", 50, tableTop);
    doc.text("Qty", 250, tableTop);
    doc.text("Price", 320, tableTop);
    doc.text("Total", 400, tableTop);

    doc.moveTo(50, tableTop + 15)
       .lineTo(550, tableTop + 15)
       .stroke();

    /* ================= ITEMS ================= */
    doc.font("Helvetica");

    let y = tableTop + 25;
    let subtotal = 0;

    order.items.forEach((item) => {
      const total = item.price * item.qty;
      subtotal += total;

      doc.text(item.name, 50, y);
      doc.text(item.qty.toString(), 250, y);
      doc.text(`₹${item.price}`, 320, y);
      doc.text(`₹${total}`, 400, y);

      y += 20;
    });

    doc.moveDown(2);

    /* ================= GST ================= */
    const cgst = subtotal * 0.09;
    const sgst = subtotal * 0.09;
    const grandTotal = subtotal + cgst + sgst;

    doc.moveTo(50, y + 10)
       .lineTo(550, y + 10)
       .stroke();

    y += 25;

    doc.font("Helvetica");

    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 350, y);

    y += 20;
    doc.text(`CGST (9%): ₹${cgst.toFixed(2)}`, 350, y);

    y += 20;
    doc.text(`SGST (9%): ₹${sgst.toFixed(2)}`, 350, y);

    y += 25;

    doc.font("Helvetica-Bold");
    doc.fontSize(12);

    doc.text(`Grand Total: ₹${grandTotal.toFixed(2)}`, 350, y);

    doc.moveDown(3);

    /* ================= FOOTER ================= */
    doc.fontSize(10);
    doc.font("Helvetica");

    doc.text("Thank you for shopping with us ❤️", {
      align: "center"
    });

    doc.moveDown();

    doc.text("This is a computer generated invoice.", {
      align: "center",
      color: "gray"
    });

    doc.end();

    /* ================= EVENTS ================= */
    stream.on("finish", () => {
      console.log("✅ PDF CREATED SUCCESSFULLY");
      resolve(filePath);
    });

    stream.on("error", (err) => {
      console.log("❌ PDF ERROR:", err);
      reject(err);
    });

  });
};

module.exports = generateGSTInvoice;