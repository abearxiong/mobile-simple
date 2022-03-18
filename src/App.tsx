import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserRouter } from './pages/User';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<>info</>} />
        <Route path='/user/*' element={<UserRouter />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
