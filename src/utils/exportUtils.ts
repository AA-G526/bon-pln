
import html2pdf from 'html2pdf.js';
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
