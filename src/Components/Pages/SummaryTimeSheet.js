import React, { Fragment, useEffect, useState,useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import Button from "../Utilities/Button";
import SelectInput from "../Utilities/Inputs/Select";
import Card from "../Utilities/Card";
import classes from "./SummaryTimesheet.module.css";
import useFetch from "../../hooks/useFetch";
import { convertTimeToString } from "../../modules/timecalculation";
import printSummaryTimesheet from "../Reports/PrintSummaryTimesheet";
import ErrorModal from "../ImportedComponents/ErrorModal";
import studentprofileContext from "../../store/studentprofile-context";

const TableHead = (props) => {
  const headerData = props.data;

  return (
    <thead>
      <tr key={0}>
        {headerData.map((column, index) => {
          return <td key={index}>{column}</td>;
        })}
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  return (
    <tbody>
      {props.data.map((row) => {
        return (
          <tr key={row[0]}>
            {row.map((column, index) => {
              if (index > 0) {
                column = convertTimeToString(column);
              }
              return <td key={index}>{column}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

const SummaryTimeSheet = (props) => {
  const [firstWeek, setFirstWeek] = useState(Number);
  const [secondWeek, setSecondWeek] = useState(Number);
  const [weeks, setWeeks] = useState(null);
  const [detail, setDetails] = useState(null);
  const [tableHeader, setTableHeader] = useState(null);
  const [showMessageDialog, setshowMessageDialog] = useState(false);
  const {Student,PracticumInstructor} = useContext(studentprofileContext);

  const { error, loading, sendRequest } = useFetch();

  useEffect(() => {
    sendRequest({ url: `learningcontracts?weeks` }, listWeeks);
  }, [sendRequest]);

  useEffect(() => {
    if (firstWeek > 0 && secondWeek > 0) {
      sendRequest(
        { url: `activities?week1=${firstWeek}&week2=${secondWeek}` },
        tableDetails
      );
    }
  }, [firstWeek, secondWeek, sendRequest]);

  const tableDetails = (data) => {
    setTableHeader(data[0]);

    data.shift();

    setDetails(data);
  };

  const listWeeks = (data) => {
    const result = data.map((week) => {
      return { value: week.Week, text: week.Week };
    });

    setWeeks(result);
  };

  const onFirstWeekChangeHandler = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setFirstWeek(value);
    }
  };

  const onSecondChangeHandler = (event) => {
    const value = parseInt(event.target.value);
    setSecondWeek(value);
  };

  let className = "";
  if (props.fullWidth) {
    className = "card_large";
  } else {
    className = "card_mid";
  }

  const onPrintClickHandler = () => {
    if (!firstWeek > 0 || !secondWeek > 0) {
      setshowMessageDialog(true);
      return;
    }
    printSummaryTimesheet({
      columnHeaders: tableHeader,
      data: detail,
      title: `Week ${firstWeek} and ${secondWeek} Summary Timesheet`,
      student: {
        name: Student.Name,
        phone: Student.Phone,
        email: Student.Email,
        "Practicum Instructor": PracticumInstructor.Name,
        "Instructor Phone": PracticumInstructor.Phone,
        agency: PracticumInstructor.Agency,
      },
      totalHours: "200 hrs 25mins",
    });
  };

  const closeMessageDialog = () => setshowMessageDialog(false);
  return (
    <Fragment>
      <ErrorModal
        message="Please Select the two weeks you want to print a summary timesheet for!"
        open={showMessageDialog}
        onClose={closeMessageDialog}
      />
      <Card className={className}>
        <h2>Summary Timesheet</h2>
        <SelectInput
          id="firstWeek"
          label="First Week"
          options={weeks}
          onChange={onFirstWeekChangeHandler}
          className="select-sm"
        />
        <SelectInput
          id="secondWeek"
          label="Second Week"
          options={weeks}
          onChange={onSecondChangeHandler}
          disabled={firstWeek < 1}
          className="select-sm"
        />
        <Button className="btn__action" onClick={onPrintClickHandler}>
          <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon> &nbsp; Print
        </Button>
        <div className={classes.cardBody}>
        {!error && !loading && (
          <table className={classes.datatable}>
            {tableHeader !== null && <TableHead data={tableHeader} />}
            {detail !== null && <TableBody data={detail} />}
          </table>
        )}
        </div>
       
      </Card>
    </Fragment>
  );
};

export default SummaryTimeSheet;
