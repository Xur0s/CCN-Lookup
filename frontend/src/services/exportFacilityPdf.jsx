import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function exportFacilityPdf(tables, ccn, stateCode) {
  const doc = new jsPDF();

  // Header
  const drawHeader = () => {
    doc.setFillColor(0, 150, 255);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(17);
    doc.setFont("helvetica", "bold");
    doc.text("INFINITE — Managed by MEDELITE", 4, 19);

    doc.setFontSize(10);
    doc.text(`FACILITY ASSESSMENT SNAPSHOT - ${stateCode ?? ""}`, 206, 19, {
      align: "right",
    });
  };
  drawHeader();

  // Body
  doc.setTextColor(0, 0, 0);

  tables.forEach((tableRows) => {
    autoTable(doc, {
      startY: "auto",
      head: [["Field", "Value"]],
      body: tableRows.map((row) => [row.key, String(row.value ?? "")]),

      headStyles: {
        fillColor: [0, 150, 255],
        textColor: [255, 255, 255],
      },

      // Checks if a new page was created
      didDrawPage: () => {
        drawHeader();
      },

      margin: { top: 40 },
    });
  });

  const finalY = doc.lastAutoTable.finalY;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("Medicare Care Compare Link:", 14, finalY + 10);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 150, 255);
  doc.setFontSize(8);
  doc.text(
    `https://www.medicare.gov/care-compare/details/nursing-home/${ccn}`,
    14,
    finalY + 16,
  );

  doc.save(`facility-assessment-report-${ccn}.pdf`);
}

export default exportFacilityPdf;
