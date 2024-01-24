import { Button, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavbarTop2 from './nav1';

function AllAdmins() {
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`http://localhost:8088/feelhome/admin/getall`);
        setAdmins(response.data);
        setTotalPages(Math.ceil(response.data.length / 3)); // Assuming 3 admins per page
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  const deleteAdmin = (adminId) => {
    axios
      .delete(`http://localhost:8088/feelhome/hoteladmin/delete/${adminId}`)
      .then(() => {
        setAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin.id !== adminId)
        );
      })
      .catch((error) => {
        console.error("Error deleting admin:", error);
      });
  };

  return (

    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      
      <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <Card.Header style={{ fontWeight: 'bold', borderBottom: '2px solid #007BFF' }}>
          <h1 style={{ marginBottom: 0 }}>ALL Admins</h1>
        </Card.Header>
        {admins.length === 0 ? (
          <div>No admins to show.....</div>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.slice(currentPage * 3, (currentPage + 1) * 3).map((admin, index) => (
                  <tr key={admin.id}>
                    <td>{index + 1 + currentPage * 3}</td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>
                      
                      <Button variant="danger" onClick={()=>deleteAdmin(admin.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Card.Footer>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="primary"
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <div className="mt-1" style={{ margin: '0 10px' }}>
                  Page {currentPage + 1} of {totalPages}
                </div>
                <Button
                  variant="primary"
                  disabled={currentPage === totalPages - 1}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </Card.Footer>
          </>
        )}
      </Card>
    </div>
    </div>
    
  );
}

export default AllAdmins;
