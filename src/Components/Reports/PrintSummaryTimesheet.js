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

  const { headers, columnCount } = createHeaders(columnHeaders);
  let records = formatData(columnHeaders, data);

  const doc = new jsPDF();
  doc.setFont("times", "", 700);
  doc.setFontSize(16);
  doc.text(`Field Practicum Time Sheet`, 105, 10, { align: "center" });
  doc.setFont("times", "", "normal");
  doc.setFontSize(14);
  doc.text("Mother Patern College of Health Sciences", 105, 17, {
    align: "center",
  });

  doc.text("Social Work Program", 105, 24, { align: "center" });

  doc.text(`Name: ${student.name}`, 10, 33);
  doc.line(25, 34, 105, 34);
  doc.text(`Student Phone (Home) : ${student.phone}`, 110, 33);
  doc.line(159, 34, 195, 34);
  doc.text(`E-mail: ${student.email}`, 10, 40);
  doc.line(25, 41, 195, 41);
  doc.text(`Agency: ${student.agency}`, 10, 47);
  doc.line(27, 48, 195, 48);
  doc.text(`Practicum Instructor: ${student["Practicum Instructor"]}`, 10, 54);
  doc.line(53, 55, 110, 55);
  doc.text(
    `Practicum Instructor Phone: ${student["Instructor Phone"]}`,
    110,
    54
  );
  doc.line(167, 55, 195, 55);

  doc.table(10, 61, records, headers, {
    autoSize: false,
    headerBackgroundColor: "white",
    printHeaders: true,
    fontSize: 11,
    padding: 2
  });
  
  doc.setFontSize(12);
  doc.text(
    `Total Hours of Practicum Experience to Date:   ${totalHours}`,
    10,
    185
  );
  doc.line(90, 186, 140, 186);
  doc.text("SIGNATURES:", 10, 195);
  doc.text("Student:", 10, 205);
  doc.line(25, 205, 155, 205);

  doc.text("Date:", 158, 205);
  doc.line(169, 205, 200, 205);
  doc.text("Practicum Instructor:", 10, 215);
  doc.line(46, 215, 155, 215);
  doc.text("Date:", 158, 215);
  doc.line(169, 215, 200, 215);
  doc.text("Practicum Director:", 10, 225);
  doc.line(44, 225, 155, 225);
  doc.text("Date:", 158, 225);
  doc.line(169, 225, 200, 225);
  doc.save(`${title}.pdf`);
};

function createHeaders(columnHeaders) {
  let result = [];
  columnHeaders.forEach((header, index) => {
    let width = 0;
    let align = "center";

    if (columnHeaders.length === 10) {
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
