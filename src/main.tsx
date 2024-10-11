import React from 'react';
import { createRoot } from 'react-dom/client';
import 'modern-normalize';
import App from './components/App.jsx';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
