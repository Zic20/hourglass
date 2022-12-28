import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import Button from "../Utilities/Button";
import SelectInput from "../Utilities/Inputs/Select";
import Card from "../Utilities/Card";
import formStyles from "../Forms/Form.module.css";
import classes from "./SummaryTimesheet.module.css";
import useFetch from "../../hooks/useFetch";
import { convertTimeToString } from "../../modules/timecalculation";

const TableHead = (props) => {
  const headerData = props.data;

  return (
    <thead>
      <tr key={0}>
        {headerData.map((column) => {
          return <td>{column}</td>;
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
          <tr>
            {row.map((column, index) => {
              if (index > 0) {
                column = convertTimeToString(column);
              }
              return <td>{column}</td>;
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

  useEffect(() => {
    sendRequest({ url: `learningcontracts?weeks` }, listWeeks);
  }, []);

  useEffect(() => {
    if (firstWeek > 0 && secondWeek > 0) {
      sendRequest(
        { url: `activities?week1=${firstWeek}&week2=${secondWeek}` },
        tableDetails
      );
    }
  }, [secondWeek]);

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
    if (value > 0 && value > firstWeek) {
      setSecondWeek(value);
    } else {
      event.preventDefault();
    }
  };

  let className = "";
  if (props.fullWidth) {
    className = "card_large";
  } else {
    className = "card_mid";
  }

  const { error, loading, sendRequest } = useFetch();
  return (
    <Card className={className}>
      <h3>Summary Timesheet</h3>
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
      <Button className="btn__action">
        <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon> &nbsp; Print
      </Button>

      <table className={classes.datatable}>
        {tableHeader !== null && <TableHead data={tableHeader} />}
        {detail !== null && <TableBody data={detail} />}
      </table>
    </Card>
  );
};

export default SummaryTimeSheet;
