import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/pages/Login/Login';
import Signup from '../components/pages/Signup/Signup';
import Main from '../components/pages/main/Main';
import NotFound from '../components/pages/notFound/NotFound';
import Profile from '../components/pages/profile/Profile';
import RequireAuth from './RequireAuth';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
