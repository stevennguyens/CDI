import React, { Component, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AppRoutes from './AppRoutes.js';
import { Layout } from './components/Layout.js';
import './custom.css';
import { CdisPage } from "./components/CdisPage/CdisPage.tsx";
import { AddForm } from './components/Form/AddForm.tsx';
import { EditForm } from './components/Form/EditForm.tsx'
import { Home } from './components/Home/Home.tsx';

const App = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    return (
      <Layout>
        <Routes>
          <Route index={true} element={<Home/>}/>
          <Route path="/cdis/:newId?" element={<CdisPage searchParams={searchParams} setSearchParams={setSearchParams}/>}/>
          <Route path="/cdis/add" element={<AddForm/>}/>
          <Route path={`/cdis/edit/:id`} element={<EditForm/>}/>
          <Route />
        </Routes>
      </Layout>
    );
}

export default App

