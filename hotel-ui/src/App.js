
import { Route, Routes } from 'react-router';
import './App.css';
import CustomerDashboard from './features/customer/dashboard';
import ExecutiveDashboard from './features/executive/dashboard';
import HrDashboard from './features/hr/dashboard';
import AdminDashboard from './features/admin/dashboard';
import Login from './features/login';
import SignUp from './features/signup';
import Logout from './features/logout';
import Contact from './features/contact';
import AboutUs from './features/aboutus';
import Faq from './features/faq';
import Hotels from './features/customer/components/hotels';
import BookRooms from './features/customer/book_rooms';
import Profile from './features/customer/Profile';
import ProfileExec from './features/executive/exec_profile';
import UpdateProfile from './features/customer/update_profile';
import UpdateExec from './features/executive/update_exec';
import ProfileAdmin from './features/admin/view_admin';
import UpdateAdmin from './features/admin/update_admin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CustomerDashboard/>}></Route>
          <Route path="/feelhome/customer/dashboard" element={<CustomerDashboard/>}></Route>
          <Route path="/feelhome/hr/dashboard" element={<HrDashboard/>}></Route>
          <Route path="/feelhome/executive/dashboard" element={<ExecutiveDashboard/>}></Route>
          <Route path="/feelhome/admin/dashboard" element={<AdminDashboard/>}></Route>
          <Route path="/feelhome/auth/login" element={<Login/>}></Route>
          <Route path="/feelhome/contact" element={<Contact/>}></Route>
          <Route path="/feelhome/aboutus" element={<AboutUs/>}></Route>
          <Route path="/feelhome/FAQ" element={<Faq/>}></Route>
          <Route path="/feelhome/auth/signup" element={<SignUp/>}></Route>
          <Route path="/feelhome/auth/logout" element={<Logout/>}></Route>
          <Route path="/feelhome/hotel/:location" element={<Hotels />} />
          <Route path="/feelhome/book-rooms/:location/:hotelId" element={<BookRooms />} />
          <Route path="/feelhome/customer/profile" element={<Profile/>}/>
          <Route path="/feelhome/customer/profile/update" element={<UpdateProfile/>}/>
          <Route path="/feelhome/executive/profile" element={<ProfileExec/>}/>
          <Route path="/feelhome/executive/profile/update" element={<UpdateExec/>}/>
          <Route path="/feelhome/admin/profile" element={<ProfileAdmin/>}/>
          <Route path="/feelhome/admin/profile/update" element={<UpdateAdmin/>}/>
        </Routes>
    </div>
  );
}

export default App;
