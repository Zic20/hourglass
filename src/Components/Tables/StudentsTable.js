import React from "react";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card";
import MyDatatable from "../Utilities/DataTableBase";

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    maxWidth: "600px",
    cell: (row) => (
      <a href={row.url} target="_blank" rel="noopener noreferrer">
        {row.name}
      </a>
    ),
  },

  {
    name: "Email",
    selector: (row) => row.email,
    cell: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
  },

  {
    name: "Phone Number",
    selector: (row) => row.phoneNo,
    cell: (row)=> <a href={`tel:${row.phoneNo}`}>{row.phoneNo}</a>
  },

  {
    name: "Home Address",
    selector: (row) => row.address,
    wrap:true
  },
];

const rows = [
    {
        id: 9190,
        name: 'Isaac Zally Jr',
        url: 'students/9190',
        email: 'izallyjr@gmail.com',
        phoneNo: '0777204203',
        address: 'Congo Town'
    }
]

const StudentsTable = () => {
  return (
    <div>
      <MyDatatable columns={columns} data={rows} />
    </div>
  );
};

export default StudentsTable;
