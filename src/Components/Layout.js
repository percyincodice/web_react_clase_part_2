import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

function Layout() {
    return (<>
        <NavBar />
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12 col-md-3 col-lg-2 p-0'>
                    <Sidebar />
                </div>
                <div className='col-12 col-md-9 col-lg-10 p-0'>
                    <Outlet />
                </div>
            </div>
        </div>
    </>)
}

export default Layout;