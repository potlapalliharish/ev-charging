import logo from './logo.svg';
import './App.css';
import LoginPage from './Login/Login'
import { Route, Routes , BrowserRouter} from 'react-router-dom';
import UserDashboard from './User/UserDashboard'
import HostDashboard from './Host/HostDashboard'
import { useState } from 'react';

function App() {
  //Hack to rerender component
  const [count, setCount] = useState(0);
  const reRender = () => {
    setCount(count+1);
  };
  return (
    <BrowserRouter>

      <Routes>
        <Route exact path="/"  element={<LoginPage />}/>
        <Route path="/user-dashboard" element={<UserDashboard reRender={reRender}/>} />
        <Route path="/host-dashboard" element={<HostDashboard reRender={reRender}/>} />
      </Routes>
      </BrowserRouter>

  );
}

export default App;
