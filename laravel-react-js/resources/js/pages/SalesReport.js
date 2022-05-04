import {useState} from "react";
import NavigationBar from '../components/NavigationBar'
import '../../css/InventoryPage.css';
import {useNavigate} from "react-router-dom";


const SalesReport = (props) => {
    const navigate = useNavigate();
    const {customer_data, inventory_data, sales_data} = props;

    const[customerName, setCustomerName] = useState("1");
    const[itemName, setItemName] = useState("");
    const[minimumPrice, setMinimumPrice] = useState(0.00);

    const GetCustomers = customer_data.map(row => {
        return (
            <>
                <option value={row.customerID}>{row.customerName}</option>
            </>
        )
    });
    const GetItems = inventory_data.map(row => {
        return (
            <>
                <option value={row.itemID}>{row.itemName}</option>
            </>
        )
    });

    const handleDelete = (saleID) => {
        console.log("delete")

        fetch(`http://127.0.0.1:8000/api/sales/${saleID}`, {
            method: 'DELETE',
        }).then(() => {
            alert("Delete successful.");
            window.location.reload();
        });
    }

    const routeChange = (saleID) =>{
        let path = `/sales-report/${saleID}`;
        navigate(path);
    }

    const SalesData = sales_data.map(row => {

        if(parseInt(customerName) === row.customer_customerID && itemName === row.item_itemID && minimumPrice < row.salePrice) {
            return (
                <tr key={row.saleID}>
                    <td>{row.item_itemID}</td>
                    <td>{row.customer_customerID}</td>
                    <td>{row.saleDate}</td>
                    <td>{row.salePrice}</td>
                    <td>{row.saleAmount}</td>
                    <td>
                        <button key={row.customerID} type="button" className="btn btn-success" onClick={() => routeChange(row.saleID)}>Update</button>
                    </td>
                    <td >
                        <button key={row.id} type="button" className="btn btn-danger" onClick={() => handleDelete(row.saleID)}>Delete</button>
                    </td>
                </tr>
            )
        } else {
            return null;
        }

    });

    return (
        <>
            <NavigationBar />

            <div className="container">
                <h1>Sales Report</h1>

                <form>
                    <div className="mb-3">
                        <label htmlFor="customerName" className="form-label">Customer</label>
                        <select className="form-select" name="customerName" required value={customerName} onChange= {(e) => setCustomerName(e.target.value)}>
                            {GetCustomers}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="itemName" className="form-label">Item</label>
                        <select className="form-select" name="itemName" required value={itemName} onChange= {(e) => setItemName(e.target.value)}>
                            {GetItems}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="minimumPrice" className="form-label">Minimum Price</label>
                        <input type="number" className="form-control" id="minimumPrice" required value={minimumPrice} onChange= {(e) => setMinimumPrice(e.target.valueAsNumber)}/>
                    </div>
                </form>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Price</th>
                        <th scope="col">Count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {SalesData}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SalesReport;
