import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Navbar from './layouts/Navbar';
import { Container } from 'semantic-ui-react';
import Dashboard from './layouts/Dashboard';
import "react-toastify/dist/ReactToastify.min.css"
import Login from './pages/Login';

function App() {

  const isAuth = localStorage.getItem('token') ? true : false;

  if(isAuth){
    return (
      <div className='App'>
        <Navbar />
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
