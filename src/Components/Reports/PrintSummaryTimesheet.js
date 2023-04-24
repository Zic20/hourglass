import { jsPDF } from "jspdf";
import { convertTimeToString } from "../../modules/timecalculation";
const printSummaryTimesheet = ({
  columnHeaders,
  data,
  title,
  student,
  totalHours,
}) => {
  if (!data || data.length === 0) {
    return;
  }

  const { headers } = createHeaders(columnHeaders);
  let records = formatData(columnHeaders, data);

  const doc = new jsPDF();
  doc.setFont("times", "", 700);
  doc.setFontSize(16);
  doc.text(`Field Practicum Time Sheet`, 105, 20, { align: "center" });
  doc.setFont("times", "", "normal");
  doc.setFontSize(14);
  doc.text("Mother Patern College of Health Sciences", 105, 27, {
    align: "center",
  });

  doc.text("Social Work Program", 105, 34, { align: "center" });

  doc.text(`Name: ${student.name}`, 10, 53);
  doc.line(25, 54, 105, 54);
  doc.text(`Student Phone (Home) : ${student.phone}`, 110, 53);
  doc.line(159, 54, 195, 54);
  doc.text(`E-mail: ${student.email}`, 10, 60);
  doc.line(25, 61, 195, 61);
  doc.text(`Agency: ${student.agency}`, 10, 67);
  doc.line(27, 68, 195, 68);
  doc.text(`Practicum Instructor: ${student["Practicum Instructor"]}`, 10, 74);
  doc.line(53, 75, 110, 75);
  doc.text(
    `Practicum Instructor Phone: ${student["Instructor Phone"]}`,
    110,
    74
  );
  doc.line(167, 75, 195, 75);

  doc.table(10, 81, records, headers, {
    autoSize: false,
    headerBackgroundColor: "white",
    printHeaders: true,
    fontSize: 11,
    padding: 1,
  });

  doc.setFontSize(12);
  doc.text(
    `Total Hours of Practicum Experience to Date:   ${totalHours}`,
    10,
    230
  );
  doc.line(90, 231, 140, 231);
  doc.text("SIGNATURES:", 10, 240);
  doc.text("Student:", 10, 250);
  doc.line(25, 250, 155, 250);

  doc.text("Date:", 158, 250);
  doc.line(169, 250, 200, 250);
  doc.text("Practicum Instructor:", 10, 260);
  doc.line(46, 260, 155, 260);
  doc.text("Date:", 158, 260);
  doc.line(169, 260, 200, 260);
  doc.text("Practicum Director:", 10, 270);
  doc.line(44, 270, 155, 270);
  doc.text("Date:", 158, 270);
  doc.line(169, 270, 200, 270);
  doc.save(`${title}.pdf`);
};

function createHeaders(columnHeaders) {
  let result = [];
  columnHeaders.forEach((header, index) => {
    let width = 0;
    let align = "center";

    if (columnHeaders.length <= 10) {
      width = 22;
      if (index === 0) {
        align = "left";
        width = 45;
      }

      if (index === columnHeaders.length - 1) {
        width = 25;
      }
    }

    if (columnHeaders.length > 10 && columnHeaders.length <= 12) {
      width = 18.5;
      if (index === 0) {
        align = "left";
        width = 40;
      }

      if (index === columnHeaders.length - 1) {
        width = 25;
      }
    }

    result.push({
      id: header,
      name: header,
      prompt: header,
      width,
      align,
    });
  });
  return { headers: result, columnCount: columnHeaders.length };
}

function formatData(header, data) {
  let result = [];
  data.forEach((row) => {
    let line = {};
    row.forEach((cell, index) => {
      if (index > 0) {
        line[`${header[index]}`] = convertTimeToString(cell);
      } else {
        line[`${header[index]}`] = cell;
      }
    });
    result.push(line);
  });

  return result;
}

export default printSummaryTimesheet;
