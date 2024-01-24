import { useNavigate } from "react-router";

function NavbarComponent() {
    const navigate = useNavigate();
  return (
    <nav className="nav" style={{ position: 'fixed', bottom: '0', right: '0' ,}} >
  <a className="nav-link active" aria-current="page" href="" style={{ color: 'black', fontWeight: 'bold' }}onClick={()=>navigate('/feelhome/aboutus')}>
    About Us
  </a>
  <a className="nav-link"  href="" style={{ color: 'black', fontWeight: 'bold' }} onClick={()=>navigate('/feelhome/contact')}>
    Contact
  </a>
  <a className="nav-link" href="" style={{ color: 'black', fontWeight: 'bold' }}onClick={()=>navigate('/feelhome/FAQ')}>
    FAQ
  </a>
  <a className="nav-link " href="" style={{ color: 'black', fontWeight: 'bold' }}onClick={()=>navigate('/feelhome/support')}>
    Support
  </a>
</nav>
  );
}
export default NavbarComponent;
