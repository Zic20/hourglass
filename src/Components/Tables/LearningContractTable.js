import React from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faKeyboard } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../Utilities/Button";
import styles from "../Pages/LearningContracts.module.css";
import useFetch from "../../hooks/useFetch";

const ExpandedComponent = ({ data }) => {
  const showResult = (data) => {
    return <div>{data}</div>;
  };

  return (
    <div className={styles.expandedDetails}>
      <div>
        <h4>Objectives</h4>
        <section
          className={styles.expandedDetailsItem}
          dangerouslySetInnerHTML={{ __html: data.Objectives.replace('"', "") }}
        />
      </div>
      <div>
        <h4>Activities</h4>
        <section
          className={styles.expandedDetailsItem}
          dangerouslySetInnerHTML={{ __html: data.Activities.replace('"', "") }}
        />
      </div>
      <div>
        <h4>Expected Outcome</h4>
        <section
          className={styles.expandedDetailsItem}
          dangerouslySetInnerHTML={{
            __html: data.ExpectedOutcome.replace('"', ""),
          }}
        />
      </div>
      <div>
        <h4>Indicators of Performance</h4>
        <section
          className={styles.expandedDetailsItem}
          dangerouslySetInnerHTML={{
            __html: data.IndicatorsOfPerformance.replace('"', ""),
          }}
        />
      </div>
      <div>
        <h4>Means of Verification</h4>
        <section
          className={styles.expandedDetailsItem}
          dangerouslySetInnerHTML={{
            __html: data.MeansOfVerification.replace('"', ""),
          }}
        />
      </div>
    </div>
  );
};

const LearningContractTable = (props) => {
  const { error, sendRequest } = useFetch();

  const columns = [
    {
      name: "Week",
      selector: (row) => row.Week,
      sortable: true,
      width: "90px",
    },
    {
      name: "Goal",
      selector: (row) => row.Goal,
      wrap: true,
    },
    {
      name: "Start Date",
      sortable: true,
      selector: (row) => row.StartDate,
    },
    {
      name: "End Date",
      selector: (row) => row.EndDate,
    },
    {
      name: "Action",
      selector: (row) => row.id,
      cell: (row) => (
        <>
          <Button value={row.id} onClick={onShowUpdateForm}>
            <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>
          </Button>
          <Button onClick={onDeleteHandler} value={row.id}>
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </Button>
        </>
      ),
      style: {
        textAlign: "left",
        fontSize: "1rem",
      },
    },
  ];

  const onShowUpdateForm = (event) => {
    const id = event.target.closest("button").value;
    props.onShowForm(id);
  };

  const onDeleteHandler = (event) => {
    const id = event.target.closest("button").value;
    if (
      window.confirm(
        "Do you want to delete this learning contract? Deleted items cannot be retrieved!"
      )
    ) {
      sendRequest(
        { url: `learningcontracts/${id}`, method: "DELETE" },
        (data) => {
          if (!error) {
            alert(data.message);
          }
        }
      );
      props.onDelete(id);
    }
  };

  return (
    <DataTable
      columns={columns}
      data={props.data}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
    />
  );
};

export default LearningContractTable;
