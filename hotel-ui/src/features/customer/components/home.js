import axios from "axios";
import { useState, useEffect } from "react";
import {
  useNavigate,
  createSearchParams,
  useParams,
} from "react-router-dom";
import { AutoComplete, Form, DatePicker, Card, Button } from "antd";
import dayjs from "dayjs";
import { Navbar } from "react-bootstrap";

function Home() {
  const { location: defaultLocation } = useParams();
  const [location, setLocation] = useState(defaultLocation);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const [locationsList, setLocationsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8088/feelhome/location/getall")
      .then((res) => {
        const options = res.data.map(({ name }) => ({ value: name }));
        setLocationsList(options);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onSelect = (data) => {
    setLocation(data);
  };

  const handleSearch = () => {
    navigate({
      pathname: `/feelhome/hotel/${location}`,
      search: createSearchParams({
        checkIn: checkIn ? checkIn.format("YYYY-MM-DD") : "",
        checkOut: checkOut ? checkOut.format("YYYY-MM-DD") : "",
      }).toString(),
    });
  };

  return (
    <div>
      <div >
      <Card title="Search hotels" className=" fixed-card" style={{
    border: "none",
    textAlign:"center",
    width: "100%", // Adjust the width as needed// Center the card
    background: "rgba(255, 255, 255, 0.4)", // Background color with alpha for blur effect
    backdropFilter: "blur(10px)", // Apply blur effect
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Add a box shadow
    marginBottom:"20px",
    marginTop:"250px"
  }}>
      <Form
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <Form.Item name="location">
          <AutoComplete
            style={{ width: 200 }}
            options={locationsList}
            placeholder="search location"
            filterOption={(inputValue, option) =>
              option.value.toLowerCase().includes(inputValue.toLowerCase())
            }
            onSelect={onSelect}
            value={location}
            defaultValue={defaultLocation}
          />
        </Form.Item>
        <div style={{ margin: "0 20px" }}>
          <DatePicker
            style={{ marginRight: 10 }}
            value={checkIn}
            onChange={(date) => setCheckIn(date)}
            format="DD-MM-YYYY"
            placeholder="Check in"
            disabledDate={(current) => current < dayjs()}
          />
          <DatePicker 
            value={checkOut}
            onChange={(date) => setCheckOut(date)}
            format="DD-MM-YYYY"
            placeholder="Check out"
            
            disabledDate={(current) => current < dayjs()}
          />
        </div>
        <Button
          type="primary"
          style={{
            margin: "20px 0",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Form>
    </Card>
      </div >
      <Navbar/>
    </div>
   
  );
}

export default Home;
