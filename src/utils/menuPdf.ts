import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { MenuItem, OperatingDepartment } from '@/types';

const HEADER: Record<OperatingDepartment, { title: string; rgb: [number, number, number] }> = {
    RESTAURANT: { title: 'Restaurant Menu', rgb: [201, 79, 45] },
    BAKERY: { title: 'Bakery Menu', rgb: [193, 55, 120] },
    DECORATION: { title: 'Decoration Catalogue', rgb: [124, 77, 206] },
};

// Plain formatting: PDF fonts do not support the special spaces used by Intl currency output.
const money = (n: number) => `RWF ${n.toLocaleString('en-US')}`;

export function downloadMenuPdf(department: OperatingDepartment, items: MenuItem[]) {
    const { title, rgb } = HEADER[department];
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const width = doc.internal.pageSize.getWidth();

    doc.setFillColor(rgb[0], rgb[1], rgb[2]);
    doc.rect(0, 0, width, 90, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text(title, 40, 45);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Eco-Service  |  ${new Date().toLocaleDateString()}`, 40, 68);

    let y = 120;
    [...new Set(items.map((i) => i.category))].forEach((category) => {
        autoTable(doc, {
            startY: y,
            head: [[category, 'Price']],
            body: items
                .filter((i) => i.category === category)
                .map((i) => [i.description ? `${i.name}\n${i.description}` : i.name, money(i.price)]),
            headStyles: { fillColor: rgb },
            columnStyles: { 1: { halign: 'right', cellWidth: 110 } },
            margin: { left: 40, right: 40 },
            theme: 'striped',
        });
        y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24;
    });

    const pages = doc.getNumberOfPages();
    for (let p = 1; p <= pages; p++) {
        doc.setPage(p);
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text('Prices are in Rwandan francs (RWF).', 40, doc.internal.pageSize.getHeight() - 24);
        doc.text(`Page ${p} of ${pages}`, width - 40, doc.internal.pageSize.getHeight() - 24, { align: 'right' });
    }

    doc.save(`eco-service-${department.toLowerCase()}-menu.pdf`);
}