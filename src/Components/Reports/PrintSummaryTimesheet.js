import { jsPDF } from "jspdf";
import { convertTimeToString } from "../../modules/timecalculation";
const printSummaryTimesheet = ({ columnHeaders, data, title,student,totalHours }) => {
  if (!data || data.length === 0) {
    return;
  }

  let headers = createHeaders(columnHeaders);
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
  doc.text(`Practicum Instructor Phone: ${student["Instructor Phone"]}`, 110, 54);
  doc.line(167, 55, 195, 55);
  
  doc.setFontSize(11);
  doc.table(10, 61, records, headers, {
    autoSize: false,
    headerBackgroundColor: "white",
    printHeaders: true,
  });

  doc.text(`Total Hours of Practicum Experience to Date:   ${totalHours}`, 10, 225);
  doc.line(90,226,140,226);
  doc.text("SIGNATURES:", 10, 235);
  doc.text("Student:",10,245);
  doc.line(25,245,155,245);
  doc.text("Date:",158,245);
  doc.line(169,245,200,245);
  doc.text("Practicum Instructor:",10,255);
  doc.line(46,255,155,255);
  doc.text("Date:",158,255);
  doc.line(169,255,200,255);
  doc.text("Practicum Director:",10,265);
  doc.line(44,265,155,265);
  doc.text("Date:",158,265);
  doc.line(169,265,200,265);
  doc.save(`${title}.pdf`);
};

function createHeaders(columnHeaders) {
  let result = [];
  columnHeaders.forEach((header, index) => {
    let width = 22;
    if (index === 0) {
      width = 50;
    }

    if(index === columnHeaders.length -1){
        width = 30;
    }
    result.push({
      id: header,
      name: header,
      prompt: header,
      width,
      align: "center",
      padding: 0,
    });
  });
  return result;
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
    console.log(line);
    result.push(line);
  });

  console.log(result);
  return result;
}

export default printSummaryTimesheet;
