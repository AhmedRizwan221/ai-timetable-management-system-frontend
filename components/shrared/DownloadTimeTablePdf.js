import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const downloadTimeTablePDF = ({
    Days,
    uniqueTimeSlots,
    filteredTimeTable,
    getSLot,
    departmentName

}) => {
    // console.log(Days,
    //     uniqueTimeSlots,
    //     filteredTimeTable,
    //     departmentName
    // );
    const firstSlot = filteredTimeTable?.[0];
    console.log(firstSlot);
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
        `${departmentName} Department`,
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
            ...uniqueTimeSlots.map((slot, index) =>
                slot.type === 'break'
                    ? `Break\n${slot.startTime}-${slot.endTime}`
                    : `Lecture ${index + 1}\n${slot.startTime}-${slot.endTime}`
            )
        ]
    ];

    // Table body
    const body = Days.map((day, dayIndex) => {
        const row = [day];

        uniqueTimeSlots.forEach((time) => {
            if (time.type === "break") {
                // Only add break cell in first row, span all rows
                if (dayIndex === 0) {
                    row.push({
                        content: "Break",
                        rowSpan: Days.length,
                        styles: {
                            halign: "center",
                            valign: "middle"
                        }
                    });
                }
                // Skip break cell for remaining rows
                return;
            }

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