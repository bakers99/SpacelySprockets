import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage'

import InventoryPage from './pages/InventoryPage'
import ItemDetails from "./components/ItemDetails";
import ItemCreate from './pages/ItemCreate'

import CustomerPage from './pages/CustomerPage'
import CustomerDetails from './components/CustomerDetails'
import CustomerCreate from './pages/CustomerCreate'
import CustomerUpdate from './pages/CustomerUpdate'

import SalesPage from './pages/SalesPage'
import SalesReport from './pages/SalesReport'
import SalesUpdate from './pages/SalesUpdate'







const AppRouter = () => {

    const [inventory_data, setInventoryData] = useState([]);
    const [customer_data, setCustomerData] = useState([]);
    const [sales_data, setSalesData] = useState([]);


    const getData = () => {
        let routes = [
            `http://127.0.0.1:8000/api/inventory/`,
            `http://127.0.0.1:8000/api/customers/`,
            `http://127.0.0.1:8000/api/sales/`,
        ];
        Promise.all(routes.map((route) => axios.get(route))).then(([{data: inventory_data}, {data: customer_data}, {data: sales_data}]) => {
            setInventoryData(inventory_data)
            setCustomerData(customer_data)
            setSalesData(sales_data)
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/inventory" element={<InventoryPage inventory_data={inventory_data} />} />
                    <Route path="/inventory/:id" element={<ItemDetails />} />
                    <Route path="/createItem" element={<ItemCreate />} />

                    <Route path="/customer" element={<CustomerPage />} />
                    <Route path="/customer/:id" element={<CustomerDetails />} />
                    <Route path="/createCustomer" element={<CustomerCreate />} />
                    <Route path="/updateCustomer/:id" element={<CustomerUpdate />} />
                    <Route path="/sales" element={<SalesPage customer_data={customer_data} inventory_data={inventory_data} />} />
                    <Route path="/sales-report" element={<SalesReport customer_data={customer_data} inventory_data={inventory_data} sales_data={sales_data} />} />
                    <Route path="/sales-report/:id" element={<SalesUpdate customer_data={customer_data} inventory_data={inventory_data} sales_data={sales_data} />} />


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
