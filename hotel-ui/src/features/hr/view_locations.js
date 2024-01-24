import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import axios from 'axios';
import { saveAs } from 'file-saver';

function AllLocations() {
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const dt = useRef(null);

  useEffect(() => {
    const getAllLocations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8088/feelhome/location/getall?page=${currentPage}&size=${pageSize}`
        );
        setLocations(response.data);
        setTotalRecords(Math.ceil(response.headers["x-total-count"] / pageSize));
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    getAllLocations();
  }, [currentPage, pageSize]);

  const handleDelete = (locationId) => {
    axios.delete(`http://localhost:8088/feelhome/location/delete/${locationId}`)
      .then(() => {
        setLocations(prevLocations => prevLocations.filter(l => l.id !== locationId));
      })
      .catch(error => {
        console.error("Error deleting location:", error);
      });
  };

  const exportCSV = () => {
    axios.get(
      `http://localhost:8088/feelhome/location/getall?`
    ).then(response => {
      const data = response.data;
      dt.current.exportCSV({ selectionOnly: false, data });
    }).catch(error => {
      console.error("Error fetching all locations for CSV export:", error);
    });
  };

  const exportPdf = () => {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(getExportColumns(), locations);
        doc.save('locations.pdf');
      });
    });
  };

  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      axios.get(
        `http://localhost:8088/feelhome/location/getall?`
      ).then(response => {
        const data = response.data;
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, {
          bookType: 'xlsx',
          type: 'array'
        });

        saveAsExcelFile(excelBuffer, 'locations');
      }).catch(error => {
        console.error("Error fetching all locations for Excel export:", error);
      });
    });
  };
  const totalPages = Math.ceil(locations.length / pageSize);

  const getExportColumns = () => {
    return dt.current.getColumns().map((column) => ({
      dataKey: column.field,
      header: column.props.header,
    }));
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };

  const header = (
    <div className="flex align-items-center justify-content-end gap-2 rounded-buttons">
      <Button
        type="button"
        icon="pi pi-file"
        onClick={exportCSV}
        tooltip="CSV"
      />
      &nbsp;&nbsp;
      <Button
        type="button"
        icon="pi pi-file-excel"
        severity="success"
        onClick={exportExcel}
        tooltip="XLS"
      />
      &nbsp;&nbsp;
      <Button
        type="button"
        icon="pi pi-file-pdf"
        severity="warning"
        onClick={exportPdf}
        tooltip="PDF"
      />
    </div>
  );

  const actionTemplate = (rowData) => (
    <div className=" rounded-buttons">
      <Button
        type="button"
        icon=" pi-trash"
        className="p-button-danger "
        onClick={() => handleDelete(rowData.id)}
      >
        Delete
      </Button>
    </div>
  );


  return (
    <div className="card-container">
      <Tooltip target=".export-buttons>button" position="bottom" />

      <div className="custom-card">
        <DataTable
          ref={dt}
          value={locations}
          header={header}
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column field="pincode" header="Pincode" />
          <Column field="executive.name" header="Executive" />
          <Column
            body={actionTemplate}
            headerStyle={{ width: "8em", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
          />
              
        </DataTable>

        <div className="rounded-buttons" style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="primary"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <div className='mt-1' style={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="primary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AllLocations;
