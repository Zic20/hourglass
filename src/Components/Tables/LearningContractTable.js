import React, { Fragment, memo, useState } from "react";
import DataTable from "react-data-table-component";
import AlertDialog from "../ImportedComponents/AlertDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../Utilities/Button";
import styles from "../Pages/LearningContracts.module.css";
import useFetch from "../../hooks/useFetch";

const ExpandedComponent = ({ data }) => {
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

const LearningContractTable = memo(({ data: list, onDelete, onShowForm }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedRowID, setSelectedRowID] = useState(Number);

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
      wrap: true,
    },
    {
      name: "End Date",
      selector: (row) => row.EndDate,
      wrap: true,
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
    onShowForm(id);
    // props.onShowForm(id);
  };

  const onDeleteHandler = (event) => {
    const id = event.target.closest("button").value;
    setSelectedRowID(+id);
    setShowDeleteDialog(true);
  };

  const onDeleteDialogClose = () => {
    setShowDeleteDialog(false);
  };

  const onAcceptDelete = async () => {
    sendRequest(
      { url: `learningcontracts/${selectedRowID}`, method: "DELETE" },
      (data) => {
        if (data.rows > 0) {
          onDelete(selectedRowID);
        }
      }
    );
  };

  return (
    <Fragment>
      <AlertDialog
        open={showDeleteDialog}
        Header="Delete Goal"
        onClose={onDeleteDialogClose}
        onAgree={onAcceptDelete}
      >
        Are you sure you want to delete this goal? Deleted goals
        cannot be retrieved!
      </AlertDialog>

      <DataTable
        columns={columns}
        data={list}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </Fragment>
  );
});

export default LearningContractTable;
