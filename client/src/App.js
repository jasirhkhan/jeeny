import './App.css';
import { Route, Routes } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/main';
import RequestRide from './components/requestRide';
import YourRides from './components/yourRides';
import DriverRequestRide from './components/driverRequestRide';
import DriverCompletedRides from './components/driverCompletedRide'
import Profile from './components/profile';
function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup />} />     
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reqride" element={<RequestRide />} />
          <Route path="/yourrides" element={<YourRides />} />
          <Route path="/driver_ride-requests" element={<DriverRequestRide />} />
          <Route path="/driver_completed_rides" element={<DriverCompletedRides />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </BrowserRouter>
    
  )
}

export default App;
