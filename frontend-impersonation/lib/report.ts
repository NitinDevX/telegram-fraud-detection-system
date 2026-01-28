import jsPDF from "jspdf";
import { ScanHistory } from "./history";

export function generatePDF(scan: ScanHistory) {
  const doc = new jsPDF();
  let y = 15;

  doc.setFontSize(18);
  doc.text("Brand Impersonation Investigation Report", 15, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Brand: ${scan.brand}`, 15, y); y += 7;
  doc.text(`Scan Date: ${new Date(scan.timestamp).toLocaleString()}`, 15, y);
  y += 10;

  doc.line(15, y, 195, y);
  y += 10;

  scan.results.forEach((r, i) => {
    doc.setFontSize(13);
    doc.text(`${i + 1}. ${r.name}`, 15, y); y += 7;

    doc.setFontSize(11);
    doc.text(`Username: ${r.username}`, 15, y); y += 6;
    doc.text(`Verdict: ${r.verdict}`, 15, y); y += 6;
    doc.text(`Risk Score: ${r.risk}%`, 15, y); y += 6;
    doc.text(`Telegram: ${r.tme}`, 15, y); y += 8;

    doc.line(15, y, 195, y);
    y += 8;

    if (y > 260) { doc.addPage(); y = 20; }
  });

  doc.save(`${scan.brand}_Investigation_Report.pdf`);
}