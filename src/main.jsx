import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Add global styles for wedding theme
document.documentElement.classList.add('scroll-smooth');
document.body.classList.add(
  'font-body',
  'bg-background',
  'text-foreground',
  'antialiased',
  'overflow-x-hidden'
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
