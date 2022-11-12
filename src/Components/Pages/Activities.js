import React, { useEffect, useState } from "react";
import Card from "../Utilities/Card";
import MyDatatable from "../Utilities/DataTableBase";
import Input from "../Utilities/Inputs/Input";

const columns = [
  // {
  //   name: "Student ID",
  //   selector: (row) => row.StudentID,
  // },
  // {
  //   name: "Week",
  //   sortable:true,
  //   selector: (row) => row.week,
  // },

  {
    name: "Activity",
    resizable: true,
    selector: (row) => row.activity,
  },
  {
    name: "Date",
    sortable: true,
    selector: (row) => row.date,
  },
  {
    name: "Start Time",
    sortable: true,
    selector: (row) => row.startTime,
  },
  {
    name: "End Time",
    selector: (row) => row.endTime,
  },
  {
    name: "Time Input",
    selector: (row) => row.timeInput,
  },
  {
    name: "Activity Type",
    selector: (row) => row.activityType,
  },
];

const data = [
  {
    StudentID: "8606",
    week: "6",
    date: "2021-08-23",
    activity: "Arrange patients during registration process",
    startTime: "08:05:00",
    endTime: "14:10:00",
    timeInput: "6hrs 5mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "6",
    date: "2021-08-23",
    activity: "HIV Counseling",
    startTime: "14:15:00",
    endTime: "14:25:00",
    timeInput: "10mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "6",
    date: "2021-08-23",
    activity: "Take down patients lab record",
    startTime: "14:30:00",
    endTime: "15:45:00",
    timeInput: "1hrs 15mins",
    activityType: "Paperwork",
  },
  {
    StudentID: "8606",
    week: "6",
    date: "2021-08-25",
    activity: "Attend to emergency patient",
    startTime: "08:15:00",
    endTime: "08:25:00",
    timeInput: "10mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "6",
    date: "2021-08-25",
    activity: "Follow up on in-patients",
    startTime: "08:30:00",
    endTime: "08:45:00",
    timeInput: "15mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "6",
    date: "2021-08-25",
    activity: "Guide patients during registration process",
    startTime: "08:48:00",
    endTime: "10:15:00",
    timeInput: "1hr 27mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "6",
    date: "2021-08-25",
    activity: "Take down patients lab record",
    startTime: "10:30:00",
    endTime: "15:50:00",
    timeInput: "5hrs 20mins",
    activityType: "Paperwork",
  },
  {
    StudentID: "8606",
    week: "6",
    date: "2021-08-26",
    activity: "HIV Counseling",
    startTime: "09:15:00",
    endTime: "10:30:00",
    timeInput: "1hrs 15mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "6",
    date: "2021-08-26",
    activity: "Take down patients lab record",
    startTime: "10:35:00",
    endTime: "15:04:00",
    timeInput: "4hr 29mins",
    activityType: "Paperwork",
  },
  {
    StudentID: "8606",
    week: "7",
    date: "2021-08-30",
    activity: "Arrange patients during registration process",
    startTime: "09:20:00",
    endTime: "14:10:00",
    timeInput: "4hr 50mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "7",
    date: "2021-08-30",
    activity: "Follow up on in-patients",
    startTime: "08:05:00",
    endTime: "09:15:00",
    timeInput: "1hr 10mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "7",
    date: "2021-08-30",
    activity: "Take down patients lab record",
    startTime: "14:15:00",
    endTime: "15:50:00",
    timeInput: "1hr 35mins",
    activityType: "Paperwork",
  },
  {
    StudentID: "8606",
    week: "7",
    date: "2021-08-31",
    activity: "HIV Counseling",
    startTime: "15:10:00",
    endTime: "15:30:00",
    timeInput: "20mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "7",
    date: "2021-08-31",
    activity: "Settle dispute between staff and patient",
    startTime: "15:45:00",
    endTime: "16:00:00",
    timeInput: "15mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "7",
    date: "2021-08-31",
    activity: "Take down patients lab record",
    startTime: "08:15:00",
    endTime: "15:00:00",
    timeInput: "6hr 45mins",
    activityType: "Paperwork",
  },
  {
    StudentID: "8606",
    week: "7",
    date: "2021-09-01",
    activity: "Guide patients during registration process",
    startTime: "08:20:00",
    endTime: "14:00:00",
    timeInput: "5hr 40mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "7",
    date: "2021-09-01",
    activity: "Take down patients lab record",
    startTime: "14:05:00",
    endTime: "15:50:00",
    timeInput: "1hr 45mins",
    activityType: "Paperwork",
  },
  {
    StudentID: "8606",
    week: "7",
    date: "2021-09-02",
    activity: "Arrange patients during registration process",
    startTime: "08:00:00",
    endTime: "13:15:00",
    timeInput: "5hrs 15mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "7",
    date: "2021-09-02",
    activity: "HIV Counseling",
    startTime: "15:35:00",
    endTime: "16:00:00",
    timeInput: "25mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "7",
    date: "2021-09-02",
    activity: "Record lab results",
    startTime: "13:20:00",
    endTime: "15:30:00",
    timeInput: "2hrs 10mins",
    activityType: "Paperwork",
  },
  {
    StudentID: "8606",
    week: "8",
    date: "2021-09-06",
    activity: "Follow up on in-patients",
    startTime: "08:00:00",
    endTime: "09:30:00",
    timeInput: "1hr 30mins",
    activityType: "Client Contact",
  },
  {
    StudentID: "8606",
    week: "8",
    date: "2021-09-06",
    activity: "Record lab results",
    startTime: "09:45:00",
    endTime: "15:50:00",
    timeInput: "6hrs 5mins",
    activityType: "Paperwork",
  },
  {
    StudentID: "8606",
    week: "8",
    date: "2021-09-07",
    activity: "Attend to emergency patients",
    startTime: "09:18:00",
    endTime: "09:28:00",
    timeInput: "10mins",
    activityType: "Client Contact",
  },
];
const Activities = () => {
  const [dataset, setDataset] = useState();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const option = { hour: "numeric", minute: "numeric" };

  useEffect(() => {
    data.map((activity) => {
      activity.date = new Date(activity.date).toLocaleDateString(
        "en-Monrovia",
        options
      );
      activity.startTime = new Date(
        `${activity.date} ${activity.startTime}`
      ).toLocaleTimeString("en-US", option);
      activity.endTime = new Date(
        `${activity.date} ${activity.endTime}`
      ).toLocaleTimeString("en-US", option);
      return activity;
    });
    setDataset(data);
  }, []);

  return (
    <div>
      <Card className="card__mid">
        <h2 style={{ textAlign: "left", marginBottom: "1rem" }}>Activities</h2>
        <MyDatatable columns={columns} data={dataset} />
      </Card>
    </div>
  );
};

export default Activities;
