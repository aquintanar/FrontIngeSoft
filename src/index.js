import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { Auth0Provider} from '@auth0/auth0-react'
import { UserContext } from './UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = "dev-0y29qbdb.us.auth0.com";
const clientId = "ViFShAlvugsvdDPEQO6DRvBpZgzFHoPz";

root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
        >
                <AuthProvider>
                    <App />
                </AuthProvider>
            
        </Auth0Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
