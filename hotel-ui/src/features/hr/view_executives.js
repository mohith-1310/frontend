import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import axios from "axios";


function AllExecutives() {
  const [executives, setExecutives] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [totalRecords, setTotalRecords] = useState(0);
  const dt = useRef(null);

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(getExportColumns(), executives);
        doc.save("executives.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(executives);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "executives");
    });
  };

  const getExportColumns = () => {
    return dt.current.getColumns().map((column) => ({
      dataKey: column.field,
      header: column.props.header,
    }));
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const deleteExecutive = (executiveId) => {
    axios
      .delete(`http://localhost:8088/feelhome/executive/delete/${executiveId}`)
      .then(() => {
        setExecutives((prevExecutives) =>
          prevExecutives.filter((executive) => executive.id !== executiveId)
        );
      })
      .catch((error) => {
        console.error("Error deleting executive:", error);
      });
  };

  const header = (
    <div className="flex align-items-center justify-content-end gap-2 rounded-buttons">
      <Button
        type="button"
        icon="pi pi-file"
        onClick={() => exportCSV(false)}
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
        onClick={() => deleteExecutive(rowData.id)}
      >
        Delete
      </Button>
    </div>
  );

  const totalPages = Math.ceil(executives.length / pageSize);

  useEffect(() => {
    const getAllExecutives = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8088/feelhome/executive/getall?page=${currentPage}&size=${pageSize}`
        );
        setExecutives(response.data);
        setTotalRecords(response.headers["x-total-count"]);
      } catch (error) {
        console.error("Error fetching executives:", error);
      }
    };
    getAllExecutives();
  }, [currentPage, pageSize]);

  return (
    <div className="card-container">
      <Tooltip target=".export-buttons>button" position="bottom" />

      <div className="custom-card">
        <DataTable
          ref={dt}
          value={executives}
          header={header}
          tableStyle={{ minWidth: "60rem" }}
        >
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column field="user.id" header="User Id" />
          <Column
            body={actionTemplate}
            headerStyle={{ width: "8em", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
          />
        </DataTable>
        <div  className="rounded-buttons" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="primary"
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <div className='mt-1'style={{ margin: '0 10px' }}>
                  Page {currentPage} of {totalPages+1}
                </div>
                <Button
                  variant="primary"
                  disabled={currentPage === totalPages+1}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
        
      </div>
    </div>
  );
}

export default AllExecutives;
