import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Navbar from './layouts/Navbar';
import { Container } from 'semantic-ui-react';
import Dashboard from './layouts/Dashboard';
import "react-toastify/dist/ReactToastify.min.css"
import Login from './pages/Login';
import AuthService from './services/auth/authService';

function App() {
  
  let authService = new AuthService();
  let isUserLoggedIn = authService.isUserLoggedIn();

  if(isUserLoggedIn){
    return (
      <div className='App'>
        <Navbar isUserLoggedIn={isUserLoggedIn} />
        <Container className='main' fluid>
          <Dashboard />
        </Container>
      </div>
    );
  } else {
    return (
      <div className='App'>
        <Login />
      </div>
    );
  }
}

export default App;
