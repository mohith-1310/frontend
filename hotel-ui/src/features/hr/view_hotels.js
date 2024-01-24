
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from "axios";

function ViewHotels() {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [displayUpdateDialog, setDisplayUpdateDialog] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const dt = useRef(null);

  useEffect(() => {
    const getAllHotels = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8088/feelhome/getallhotels?page=${currentPage}&size=${pageSize}`
        );
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    getAllHotels();
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(hotels.length / pageSize);

  const handleDelete = (hotelId) => {
    axios.delete(`http://localhost:8088/feelhome/hotel/delete/${hotelId}`)
      .then(() => {
        setHotels(prevHotels => prevHotels.filter(h => h.id !== hotelId));
      })
      .catch(error => {
        console.error("Error deleting hotel:", error);
      });
  };

  const handleUpdate = (rowData) => {
    setSelectedHotel(rowData);
    setDisplayUpdateDialog(true);
  };

  const updateHotel = () => {
    const updatedData = {
      name: name,
      address: address,
      email: email,
      phone: phone
    };

    axios.put(`http://localhost:8088/feelhome/updatehotel/${selectedHotel.id}`, updatedData)
      .then(() => {
        // Handle successful update if needed
        onHideUpdateDialog();
      })
      .catch(error => {
        console.error("Error updating hotel:", error);
      });
  };

  const onHideUpdateDialog = () => {
    setDisplayUpdateDialog(false);
    // Reset form fields or perform other cleanup tasks
    setName("");
    setAddress("");
    setEmail("");
    setPhone("");
  };
  
    const exportCSV = () => {
      axios.get(
        `http://localhost:8088/feelhome/getallhotels?`
      ).then(response => {
        const data = response.data;
        dt.current.exportCSV({ selectionOnly: false, data });
      }).catch(error => {
        console.error("Error fetching all hotels for CSV export:", error);
      });
    };
  
    const exportPdf = () => {
      import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then(() => {
          const doc = new jsPDF.default(0, 0);
    
          // Automatically generate columns based on the first row of data
          const columns = Object.keys(hotels[0,totalPages]);
    
          // Use autoTable without getExportColumns()
          doc.autoTable(columns.map(col => ({ header: col, dataKey: col })), hotels);
    
          doc.save('hotels.pdf');
        });
      });
    };
    
    const exportExcel = () => {
      import('xlsx').then((xlsx) => {
        axios.get(
          `http://localhost:8088/feelhome/getallhotels?`
        ).then(response => {
          const data = response.data;
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          const excelBuffer = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
          });
  
          saveAsExcelFile(excelBuffer, 'hotels');
        }).catch(error => {
          console.error("Error fetching all locations for Excel export:", error);
        });
      });
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
      <div className="rounded-buttons">
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => handleDelete(rowData.id)}
        >
          Delete
        </Button>
        &nbsp;&nbsp;
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-warning ml-2"
          onClick={() => handleUpdate(rowData)}
        >
          Update
        </Button>
      </div>
    );
  
  
    

  
    return(

      <div className="card-container">
      <Tooltip target=".export-buttons>button" position="bottom" />

      <div className="custom-card">
        <DataTable
          ref={dt}
          value={hotels}
          header={header}
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column field="address" header="Address" />
          <Column field="email" header="Email" />
          <Column field="phone" header="Phone" />
          <Column field="hotelAdmin.name" header="Owner" />
          <Column
            body={actionTemplate}
            headerStyle={{ width: "8em", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
          />
        </DataTable>

        <div className="rounded-buttons" style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="mt-2"
            variant="primary"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <div className='mt-4' style={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages + 1}
          </div>
          <Button
            className="mt-2"
            variant="primary"
            disabled={currentPage === totalPages + 1}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>

        <Dialog
  visible={displayUpdateDialog}
  onHide={onHideUpdateDialog}
  header="Update Hotel"
>
  {/* Form for updating hotel details */}
  <div className="p-fluid">
    <div className="p-field">
      <label htmlFor="name">Name</label>
      <InputText
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className="p-field">
      <label htmlFor="address">Address</label>
      <InputText
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>

    <div className="p-field">
      <label htmlFor="email">Email</label>
      <InputText
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="p-field">
      <label htmlFor="phone">Phone</label>
      <InputText
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
  </div>

  <div className="p-dialog-footer mt-4">
    <Button label="Cancel" icon="pi pi-times" onClick={onHideUpdateDialog} className="p-button-text" />
    &nbsp;  &nbsp;  &nbsp;
    <Button label="Update" icon="pi pi-check" onClick={updateHotel} autoFocus />
  </div>
</Dialog>

      </div>
    </div>
    )
}

export default ViewHotels;