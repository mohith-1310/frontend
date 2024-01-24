import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Tooltip } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import Column from "antd/es/table/Column";

function BookingList() {
  const [customer, setCustomer] = useState({});
  const [bookingData, setBookingData] = useState([]);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedExecutiveId = localStorage.getItem("id");

        if (storedExecutiveId) {
          const executiveId = parseInt(storedExecutiveId, 10);

          const response = await axios.get(
            `http://localhost:8088/feelhome/customer/get/${executiveId}`
          );
          const executiveDetails = response.data;

          console.log(executiveDetails);
          setCustomer(executiveDetails);

          const result = await axios.get(
            `http://localhost:8088/feelhome/booking/getall/${executiveDetails.id}`
          );
          const jsonData1 = result.data;

          setBookingData(jsonData1);
          console.log(jsonData1);
        } else {
          console.error("Executive ID not found in local storage.");
          setMsg("Executive ID not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      // Make an API call to cancel the booking
      await axios.delete(`http://localhost:8088/feelhome/booking/cancel/${bookingId}`);

      // Update the state to reflect the cancellation
      const updatedBookings = bookingData.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "CANCELLED" } : booking
      );
      setBookingData(updatedBookings);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      setError(error.message);
    }
  };

  

  return (
    <div className="card mt-5" >
      <Tooltip target=".export-buttons>button" position="bottom" />

      <DataTable value={bookingData}  tableStyle={{ minWidth: "40rem" }}>
        <Column field="noOfAdults" header="Adults" />
        <Column field="check_in" header="Check-in" />
        <Column field="check_out" header="Check-out" />
        <Column field="hotel.name" header="Hotel" />
        <Column field="room.room_type" header="Room" />
        <Column field="totalPrice" header="Price" />
        <Column field="status" header="Booking Status" />
        <Column
          header="Actions"
          body={(rowData) => (
            <div>
              {rowData.status !== "CANCELLED" && (
                <button
                  className="btn btn-danger"
                  onClick={() => handleCancelBooking(rowData.id)}
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        />
      </DataTable>
    </div>
  );
}

export default BookingList;
