import React from 'react';
import DataTable from '../mycomponents/DataTableBase';


const MyDataTable =()=> {
    return <DataTable columns={columns} data={data} selectableRows />;
}

export default MyDataTable;