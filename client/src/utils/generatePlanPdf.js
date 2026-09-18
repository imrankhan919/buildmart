import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const DISCLAIMER =
  'AI-generated estimate for planning purposes only. Verify structural details and material quantities with a licensed architect/engineer before construction.';

async function imageToDataUrl(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image fetch failed: ${res.status}`);
  const blob = await res.blob();
  if (!blob.type.startsWith('image/')) throw new Error('URL did not return an image');
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read image data'));
    reader.readAsDataURL(blob);
  });
}

function addFooter(doc, pageCount) {
  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(130);
    doc.text(DISCLAIMER, 14, 290, { maxWidth: 182 });
    doc.text(`Page ${i} of ${pageCount}`, 196, 290, { align: 'right' });
  }
}

export async function generatePlanPdf({ plan, onImageError }) {
  const bom = plan.billOfMaterials;
  if (!bom || !bom.items || bom.items.length === 0) {
    throw new Error('Generate a bill of materials first — there is nothing to put in the PDF yet.');
  }

  const doc = new jsPDF();
  const meta = [
    `Plot: ${plan.plotLength ?? '—'} x ${plan.plotWidth ?? '—'} ft`,
    `Floors: ${plan.floors ?? '—'}`,
    `Rooms: ${plan.rooms ?? '—'}`,
    `Style: ${plan.layoutStyle ?? '—'}`,
    `Generated: ${plan.createdAt ? new Date(plan.createdAt).toLocaleDateString('en-IN') : '—'}`,
  ];

  // Page 1: header + metadata + 2D plan.
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  doc.text('BuildMart — AI Plan Report', 14, 20);
  doc.setFontSize(10);
  doc.setTextColor(80);
  meta.forEach((line, i) => doc.text(line, 14, 30 + i * 6));
  let cursorY = 30 + meta.length * 6 + 6;

  try {
    const planImg = await imageToDataUrl(plan.floorPlan);
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text('2D Floor Plan', 14, cursorY);
    doc.addImage(planImg, 'JPEG', 14, cursorY + 4, 182, 120);
  } catch {
    doc.setFontSize(10);
    doc.setTextColor(180, 40, 40);
    doc.text('2D plan image could not be embedded.', 14, cursorY + 6);
    onImageError?.('2D plan image');
  }

  // Page 2: 3D render.
  if (plan.finalDesign) {
    doc.addPage();
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text('3D Exterior Render', 14, 20);
    try {
      const renderImg = await imageToDataUrl(plan.finalDesign);
      doc.addImage(renderImg, 'JPEG', 14, 26, 182, 120);
    } catch {
      doc.setFontSize(10);
      doc.setTextColor(180, 40, 40);
      doc.text('3D render image could not be embedded.', 14, 32);
      onImageError?.('3D render image');
    }
  }

  // Page 3+: BOM table.
  doc.addPage();
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('Bill of Materials', 14, 20);
  if (bom.assumptions) {
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text(bom.assumptions, 14, 28, { maxWidth: 182 });
  }

  autoTable(doc, {
    startY: 44,
    head: [['Category', 'Item', 'Qty', 'Unit', 'Availability', 'Notes']],
    body: bom.items.map((item) => [
      item.category || '',
      item.item || '',
      String(item.quantity ?? ''),
      item.unit || '',
      item.available && item.matches && item.matches.length > 0
        ? `${item.matches[0].vendorName || ''} — Rs.${item.matches[0].price ?? ''}`.trim()
        : 'Buy from any local vendor',
      item.notes || '',
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [15, 23, 42], textColor: [245, 158, 11] },
  });

  addFooter(doc, doc.getNumberOfPages());
  doc.save(`BuildMart-Plan-${plan._id}.pdf`);
}
