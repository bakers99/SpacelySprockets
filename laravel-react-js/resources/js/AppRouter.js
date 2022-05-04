import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage'
import InventoryPage from './pages/InventoryPage'
import CustomerPage from './pages/CustomerPage'
import CustomerDetails from './components/CustomerDetails'
import CustomerCreate from './pages/CustomerCreate'

import SalesPage from './pages/SalesPage'
import SalesReport from './pages/SalesReport'

import ItemDetails from "./components/ItemDetails";
import ItemCreate from './pages/ItemCreate'




// import ItemDetails from "./ItemDetails";
// import CreatePage from "./CreatePage";

const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/inventory" element={<InventoryPage />} />
                    <Route path="/inventory/:id" element={<ItemDetails />} />
                    <Route path="/createItem" element={<ItemCreate />} />

                    <Route path="/customer" element={<CustomerPage />} />
                    <Route path="/customer/:id" element={<CustomerDetails />} />
                    <Route path="/createCustomer" element={<CustomerCreate />} />
                    <Route path="/sales" element={<SalesPage />} />
                    <Route path="/sales-report" element={<SalesReport />} />


                    {/*<Route path="/create" element={<CreatePage />} />*/}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;

if (document.getElementById('app-router')) {
    ReactDOM.render(<AppRouter />, document.getElementById('app-router'));
}
