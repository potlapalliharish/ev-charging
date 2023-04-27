import logo from './logo.svg';
import './App.css';
import LoginPage from './Login/Login'
import { Route, Routes , BrowserRouter} from 'react-router-dom';
import UserDashboard from './User/UserDashboard'
import HostDashboard from './Host/HostDashboard'

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route exact path="/"  element={<LoginPage />}/>
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/host-dashboard" element={<HostDashboard />} />
      </Routes>
      </BrowserRouter>

  );
}

export default App;
