import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import EmployeeTable from './componant/EmployeeTable/EmployeeTable';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmployeeTable/>
  </StrictMode>
)
