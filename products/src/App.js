import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductTable from './components/ProductTable';
import Login from './pages/login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth'));

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <ProductTable /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


// // src/App.js
// import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import MultiStepForm from './components/MultiStepForm';
// // import ProfileList from './components/ProfileList';
// // import ProfileDetail from './components/ProfileDetail';
// // import Navbar from './components/Navbar';
// import ProductTable from './components/ProductTable';

// function App() {
//   return (
//     // <Router>
//     //   <Navbar />
//     //   <Routes>
//     //     <Route path="/" element={<MultiStepForm />} />
//     //     <Route path="/profiles" element={<ProfileList />} />
//     //     <Route path="/profiles/:id" element={<ProfileDetail />} />
//     //   </Routes>
//     // </Router>
//     <ProductTable/>
//   );
// }

// export default App;
