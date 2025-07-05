
import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { CustomerInfo, SparePartItem } from '@/types';

export const exportToPDF = (customerInfo: CustomerInfo, sparePartItems: SparePartItem[]) => {
  // Create a temporary div with the report content
  const reportContent = document.getElementById('printable-report');
  
  if (!reportContent) {
    console.error('Printable report element not found');
    return;
  }

  // Clone the content to avoid modifying the original
  const clonedContent = reportContent.cloneNode(true) as HTMLElement;
  
  const options = {
    margin: 1,
    filename: `PLN_Usage_Report_${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(options).from(clonedContent).save();
};

export const exportToWord = async (customerInfo: CustomerInfo, sparePartItems: SparePartItem[]) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const grandTotal = sparePartItems.reduce((total, item) => total + (item.hargaSTN * item.qty), 0);

  // Create table rows for spare parts
  const tableRows = [
    // Header row
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: "No", bold: true })] })],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
          },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: "Nama Barang/Jasa", bold: true })] })],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
          },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: "Harga STN", bold: true })] })],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
          },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: "Qty", bold: true })] })],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
          },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: "Satuan", bold: true })] })],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
          },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: "Total", bold: true })] })],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
          },
        }),
      ],
    }),
    // Data rows
    ...sparePartItems.map((item, index) => 
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: (index + 1).toString() })],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
            },
          }),
          new TableCell({
            children: [new Paragraph({ text: item.namaBarang })],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
            },
          }),
          new TableCell({
            children: [new Paragraph({ text: `Rp ${item.hargaSTN.toLocaleString('id-ID')}` })],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
            },
          }),
          new TableCell({
            children: [new Paragraph({ text: item.qty.toString() })],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
            },
          }),
          new TableCell({
            children: [new Paragraph({ text: item.satuan })],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
            },
          }),
          new TableCell({
            children: [new Paragraph({ text: `Rp ${(item.hargaSTN * item.qty).toLocaleString('id-ID')}` })],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
            },
          }),
        ],
      })
    ),
    // Total row
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: "TOTAL KESELURUHAN:", bold: true })] })],
          columnSpan: 5,
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
          },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: `Rp ${grandTotal.toLocaleString('id-ID')}`, bold: true })] })],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
          },
        }),
      ],
    }),
  ];

  const doc = new Document({
    sections: [
      {
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: "LAPORAN PENGGUNAAN PERALATAN PLN",
                bold: true,
                size: 32,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "PT PLN (Persero) - Perusahaan Listrik Negara",
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Tanggal: ${currentDate}`,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Customer Information
          new Paragraph({
            children: [
              new TextRun({
                text: "INFORMASI PELANGGAN",
                bold: true,
                size: 24,
              }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Nama: ${customerInfo.nama || '-'}` }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `ID Pelanggan: ${customerInfo.idPelanggan || '-'}` }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Daya: ${customerInfo.daya || '-'}` }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Pekerjaan: ${customerInfo.pekerjaan || '-'}` }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Nomor Kontrak: ${customerInfo.nomorKontrak || '-'}` }),
            ],
            spacing: { after: 400 },
          }),

          // Table Header
          new Paragraph({
            children: [
              new TextRun({
                text: "DAFTAR BARANG/JASA",
                bold: true,
                size: 24,
              }),
            ],
            spacing: { after: 200 },
          }),

          // Table
          new Table({
            rows: tableRows,
            width: {
              size: 100,
              type: "pct",
            },
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const fileName = `PLN_Usage_Report_${new Date().toISOString().split('T')[0]}.docx`;
  
  saveAs(new Blob([buffer]), fileName);
};
