import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './Login';

export const UserRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};
export default UserRouter;
