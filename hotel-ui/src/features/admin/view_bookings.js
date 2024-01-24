import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, Card, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router";
import { saveAs } from 'file-saver';

function ViewBookings() {

  const [hotel, setHotel] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const dt = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedAdminId = localStorage.getItem("id");

        if (storedAdminId) {
          const adminId = parseInt(storedAdminId, 10);

          const hotelDetails = axios.get(
            `http://localhost:8088/feelhome/hotel/get/${adminId}`
          );
      

          setHotel(hotelDetails);
          


        } else {
          console.error("Admin ID not found in local storage.");
          setMsg("Admin ID not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMsg("Error fetching data");
      }
    };

    fetchData();
    console.log(hotel);
  }, []);

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(getExportColumns(), bookingData);
        doc.save("bookingData.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(bookingData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "bookingData");
    });
  };

  const getExportColumns = () => {
    return dt.current.getColumns().map((column) => ({
      dataKey: column.props.field,
      header: column.props.header,
    }));
  };

  const saveAsExcelFile = (buffer, fileName) => {
    saveAs(
      new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      }),
      fileName + "_export_" + new Date().getTime() + ".xlsx"
    );
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
        variant="success"
        onClick={exportExcel}
        tooltip="XLS"
      />
      &nbsp;&nbsp;
      <Button
        type="button"
        icon="pi pi-file-pdf"
        variant="warning"
        onClick={exportPdf}
        tooltip="PDF"
      />
    </div>
  );

  return (
    <div className="card-container">
      <Tooltip target=".export-buttons>button" position="bottom" />

      <div className="custom-card">
        <DataTable
          ref={dt}
          value={bookingData}
          header={header}
          tableStyle={{ minWidth: "60rem" }}
        >
          <Column field="id" header="ID" />
          <Column field="check_in" header="CheckIn" />
          <Column field="check_out" header="CheckOut" />
          <Column field="user.id" header="User Id" />
        </DataTable>
      </div>
    </div>
  );
}

export default ViewBookings;
