import React from "react";
import { renderToString } from "react-dom/server";
import { jsPDF } from "jspdf";
import styles from "./LearningContractPrint.module.css";

export const PrintTable = ({ data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <th>Week / Date</th>
        <th>Goal</th>
        <th>Specific Objectives</th>
        <th>Activities</th>
        <th>Expected Outcome</th>
        <th>Indicators of Performance</th>
        <th>Means Of Verification</th>
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr key={row.id}>
              <td>
                <p>{`Week ${row.Week}`}</p>
                {`${row.StartDate} - ${row.EndDate}`}
              </td>
              <td>{`${row.Goal}`}</td>
              <td
                dangerouslySetInnerHTML={{
                  __html: row.Objectives.replace('"', ""),
                }}
              />
              <td
                dangerouslySetInnerHTML={{
                  __html: row.Activities.replace('"', ""),
                }}
              ></td>
              <td
                dangerouslySetInnerHTML={{
                  __html: row.ExpectedOutcome.replace('"', ""),
                }}
              />
              <td
                dangerouslySetInnerHTML={{
                  __html: row.IndicatorsOfPerformance.replace('"', ""),
                }}
              />
              <td
                dangerouslySetInnerHTML={{
                  __html: row.MeansOfVerification.replace('"', ""),
                }}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const LearningContractPrint = ({ data, title }) => {
  const string = renderToString(<PrintTable data={data} />);
  const doc = new jsPDF({ orientation: "landscape" });
  doc.addJS(string, {
    async callback(doc) {
      doc.save(`${title}.pdf`);
    },
  });
};

// const LearningContractPrint = ({ data, title }) => {
//   const columnHeaders = [
//     "Week / Date",
//     "Goal",
//     "Specific Objectives",
//     "Activities",
//     "Expected Outcome",
//     "Indicators of Performance",
//     "Means of Verification",
//   ];
//   function createHeaders() {
//     let result = [];
//     columnHeaders.forEach((header) => {
//       result.push({
//         id: header,
//         name: header,
//         prompt: header,
//         width: 50,
//         align: "center",
//         padding: 0,
//       });
//     });
//     return result;
//   }

//   function formatData() {
//     let result = [];
//     data.forEach((row) => {
//       result.push({
//         "Week / Date": `Week ${row.Week} \n \n ${row.StartDate} to ${row.EndDate}`,
//         Goal: row.Goal,
//         "Specific Objectives": row.Objectives,
//         Activities: row.Activities,
//         "Expected Outcome": row.ExpectedOutcome,
//         "Indicators of Performance": row.IndicatorsOfPerformance,
//         "Means of Verification": row.MeansOfVerification,
//       });
//     });

//     return result;
//   }

//   let headers = createHeaders();
//   let records = formatData();

//   const doc = new jsPDF({ orientation: "landscape" });
//   doc.setFont("times", "", 700);
//   doc.setFontSize(18);
//   doc.text(`Week ${data[0].Week} Learning Contract`, 140, 10, {
//     align: "center",
//   });
//   doc.setFont("times", "", "normal");
//   doc.text('Name: Isaac Zally, Jr',10,20);

//   doc.setFontSize(12);
//   doc.table(10, 40, records, headers, {
//     autoSize: false,
//     headerBackgroundColor: "white",
//     printHeaders: true,
//   });
//   doc.setTableHeaderRow();
//   doc.save(`${title}.pdf`);
// };

export default LearningContractPrint;
