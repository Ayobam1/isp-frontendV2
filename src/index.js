import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const paystackParams = new URLSearchParams(window.location.search);
const paystackRef = paystackParams.get('reference');
 
if (paystackRef) {
  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}#/payment-callback?reference=${encodeURIComponent(paystackRef)}`
  );
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
