import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const downloadTimeTablePDF = ({
    Days,
    timeSlots,
    filteredTimeTable,
    getSLot

}) => {
    // console.log( Days,
    // timeSlots,
    // filteredTimeTable
    // );
    const firstSlot = filteredTimeTable?.[0];
    const doc = new jsPDF("landscape");

    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);

    doc.text(
        "QUAID-E-AWAM UNIVERSITY OF ENGINEERING, SCIENCE & TECHNOLOGY NAWABSHAH",
        pageWidth / 2,
        15,
        { align: "center" }
    );

    doc.setFontSize(13);

    doc.text(
        `${firstSlot?.department?.deptName} Department`,
        pageWidth / 2,
        25,
        { align: "center" }
    );

    doc.setFont("helvetica", "normal");

    doc.text(
        `${firstSlot?.semester?.semesterNumber} Semester | ${firstSlot?.semester?.studyYear} Year | ${firstSlot?.batch?.batchName}`,
        pageWidth / 2,
        33,
        { align: "center" }
    );

    // Table header
    const head = [
        [
            "Day / Time",
            ...timeSlots.map(
                (time, index) => `Lecture ${index + 1}\n${time}`
            )
        ]
    ];

    // Table body
    const body = Days.map((day) => {
        const row = [day];

        timeSlots.forEach((time) => {
            const slot = getSLot(day, time);

            row.push(
                slot
                    ? slot.type === "theory"
                        ? slot.course?.courseName
                        : `${slot.course?.courseName} (Lab)`
                    : ""
            );
        });

        return row;
    });

    autoTable(doc, {
        startY: 40,
        theme: "grid", // avoids striped row backgrounds
        head,
        body,
        styles: {
            halign: "center",
            valign: "middle",
            fontSize: 10,
            lineColor: [0, 0, 0],
            lineWidth: 0.2,
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0]
        },
        headStyles: {
            fontStyle: "bold",
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0]
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255]
        },
        columnStyles: {
            0: {
                fontStyle: "bold",
                fillColor: [255, 255, 255]
            }
        }
    });

    doc.save("time-table.pdf");
};

export default downloadTimeTablePDF;