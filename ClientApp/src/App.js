import React, { Component, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AppRoutes from './AppRoutes.js';
import { Layout } from './components/Layout.js';
import './custom.css';
import { Home } from "./components/Home/Home.tsx";
import { AddForm } from './components/Form/AddForm.tsx';
import { EditForm } from './components/Form/EditForm.tsx'

const App = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    
    // useEffect(() => {
    //   console.log(location.pathname);
    // }, [location])
   
    return (
      <Layout>
        {/* {
          location.key && location.key !== "default" && location.pathname !== "/" &&
          <span onClick={handleBack} className="material-symbols-outlined">
            arrow_back
          </span>
        } */}
        
        <Routes>
          <Route index={true} element={<Home searchParams={searchParams} setSearchParams={setSearchParams}/>}/>
          <Route path="/add" element={<AddForm/>}/>
          <Route path={`/edit/:id`} element={<EditForm/>}/>
          <Route />
        </Routes>
      </Layout>
    );
}

export default App

