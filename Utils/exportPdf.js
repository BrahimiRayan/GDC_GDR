// Correct import syntax
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable' // Note: import as named import
import { NormalDateformat } from './dateFormat'
export function exportToPdf(filename, headers, data) {
  const doc = new jsPDF()
  
  // Add title
  doc.text(`Informations sur les produits (${NormalDateformat(new Date())})`, 14, 15);
  
  // Convert data to array of arrays
  const tableData = data.map(row => Object.values(row))
  
  // Generate table using autoTable
  autoTable(doc, {
    head: [headers],
    body: tableData,
    startY: 30,
    styles: {
      lineWidth: 0.3,
      lineColor: [0, 0, 0], // Black borders
      // Or customize specific borders:
      halign: 'center', // 'left', 'center', 'right'
      valign: 'middle', // 'top', 'middle', 'bottom'
      fontSize: 9,
      cellPadding: 2,
      font: 'helvetica', // 'courier', 'times', 'helvetica'
      textColor: [40, 40, 40], // RGB array
      fillColor: [255, 255, 255], // Background color
      lineWidth: 0.1,
      lineColor: [200, 200, 200], // Border color
    },
    headStyles: {
      fillColor: [41, 128, 185], // Header background
      textColor: [255, 255, 255], // Header text color
      fontStyle: 'bold',
      fontSize: 10,
    },
    bodyStyles: {
      fillColor: [245, 245, 245], // Alternate row color
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255], // Alternate row color
    },
    columnStyles: {
      0: { fontStyle: 'bold' , cellWidth: 10}, // Bold first column
      1: { cellWidth: 30 }, // Second column
    },
  })
  
  // Save the PDF
  doc.save(filename)
}