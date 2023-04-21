import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Register from "./register/register";
import Login from "./login/login";
import ForgotPassword from "./login/forgotPassword";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
