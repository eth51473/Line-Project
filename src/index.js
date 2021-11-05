import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {toast , ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ToastContainer />
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

