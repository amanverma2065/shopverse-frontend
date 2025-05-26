import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppContextProvider } from './context/AppContext';
import { ThemeProvider } from "@material-tailwind/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <AppContextProvider>
        <App />
        <Toaster />
      </AppContextProvider>
    </ThemeProvider>
  </BrowserRouter>

);
