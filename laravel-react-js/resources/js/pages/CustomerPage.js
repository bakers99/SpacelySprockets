import {useState} from "react";
// import {Link} from "react-router-dom";
import useFetch from "../useFetch";
import NavigationBar from '../components/NavigationBar'
import '../../css/InventoryPage.css';
import {Link} from "react-router-dom";



const CustomerPage = () => {
    const {data, isPending, error} = useFetch('http://127.0.0.1:8000/api/customers/')
    console.log(data);

    return (
        <>
            <NavigationBar />

            <div className="container">
                <h1>Customer List</h1>

                {error}<div>{error}</div>
                {isPending && <div>Loading...</div>}

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Company Name</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    { data && <Customer customers={data}  />}
                    </tbody>
                </table>

                <Link to={`/createCust`}>
                    <button type="button" className="btn btn-info" id="new-button">Insert New Customer</button>
                </Link>
            </div>
        </>
    )
}

export default CustomerPage;





const Customer = (props) => {
    const {customers} = props;

    const DisplayChoice = customers.map(item => {
            return (
                <tr key={item.customerID}>
                    <td>{item.customerID}</td>
                    <td>{item.customerName}</td>
                    <td>{item.customerAddress}</td>
                    <td>{item.companyName}</td>
                    <td>
                        <Link to={`/customer/${item.customerID}`}>
                            <button key={item.customerID} type="button" className="btn btn-dark">More Info</button>
                        </Link>
                    </td>
                </tr>
            )
    })

    return (
        <>
            {DisplayChoice}
        </>
    )
}
