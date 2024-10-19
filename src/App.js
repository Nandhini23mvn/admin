// import React from 'react';
// import LoginPage from './Admin/Login';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//         <LoginPage/>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './Admin/AdminLogin';
import AdminPanel from './Admin/AdminPanel';
// import AdminPage from './Admin/AdminPage';  // Assume you have an AdminPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin/>} />
        <Route path="/admin" element={<AdminPanel />} /> 
      </Routes>
    </Router>
  );
}

export default App;
