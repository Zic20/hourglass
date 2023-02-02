import { jsPDF } from "jspdf";

const TimesheetPrint = ({ columnHeaders, data, title }) => {
  function createHeaders() {
    let result = [];
    columnHeaders.forEach((header) => {
      result.push({
        id: header,
        name: header,
        prompt: header,
        width: 60,
        align: "center",
        padding: 0,
      });
    });
    return result;
  }

  
  function formatData() {
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

  let headers = createHeaders();
  let records = formatData();

  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFont("times","",400);
  doc.setFontSize(12);
  doc.table(10, 5, records, headers, {
    autoSize: false,
    headerBackgroundColor: "white",
    printHeaders: true,
  });
  doc.setTableHeaderRow();
  doc.save(`${title}.pdf`);
};

export default TimesheetPrint;
