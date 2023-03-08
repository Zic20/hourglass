import { jsPDF } from "jspdf";

const TimesheetPrint = ({ columnHeaders, data, title, week, student }) => {
  let headers = createHeaders(columnHeaders);
  let records = formatData(data);

  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFont("times", "", 700);
  doc.setFontSize(18);
  doc.text(`Week ${week} Timesheet`, 140, 10, { align: "center" });
  doc.setFont("times", "", "normal");
  doc.setFontSize(14);
  doc.text(`Name: ${student} `, 10, 24);
  doc.line(25, 25, 90, 25);
  doc.table(10, 35, records, headers, {
    autoSize: false,
    headerBackgroundColor: "white",
    printHeaders: true,
    padding: 2,
  });

  doc.setTableHeaderRow();
  doc.text("Signed By: ________________________", 10, 190);
  doc.text("Practicum Instructor", 30, 195);
  doc.save(`${title}.pdf`);
};

function createHeaders(columnHeaders) {
  let result = [];
  columnHeaders.forEach((header) => {
    let width = 0;
    switch (header) {
      case "Week":
        width = 40;
        break;
      case "Date":
        width = 60;
        break;
      case "Activity":
        width = 120;
        break;
      default:
        width = 46;
        break;
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

function formatData(data) {
  let result = [];
  data.forEach((row) => {
    result.push({
      Week: "1",
      Date: row.Date,
      Activity: row.Activity,
      "Start Time": row.StartTime,
      "End Time": row.EndTime,
      "Time Input": row.TimeInput,
    });
  });

  return result;
}

export default TimesheetPrint;
