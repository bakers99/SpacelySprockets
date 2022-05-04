
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import NavigationBar from '../components/NavigationBar'
import '../../css/InventoryPage.css';

const SalesPage = (props) => {
    const {customer_data, inventory_data} = props;


    const navigate = useNavigate();
    const[customer, setCustomer] = useState("Customer Name...");
    const[saleDate, setSaleDate] = useState(null);
    const[saleTime, setSaleTime] = useState(null);
    const[itemID, setItemID] = useState(null);



    const [validationError,setValidationError] = useState({})

    const createItem = async (e) => {
        e.preventDefault();

        // const formData = new FormData()
        // formData.append('itemName', item)
        // formData.append('itemDesc', description)
        // formData.append('itemID', id)
        // formData.append('itemCategory', category)
        // formData.append('itemCount', count)
        // formData.append('itemCost', cost)
        //
        // await axios.post(`http://127.0.0.1:8000/api/inventory`, formData).then(({data})=>{
        //     alert("Item successfully Created")
        //     navigate("/inventory")
        // }).catch(({response})=>{
        //     if(response.status===422){
        //         setValidationError(response.data.errors)
        //     }else{
        //         alert("Item Creation Failed")
        //     }})
    }

    const GetCustomers = customer_data.map(row => {
        return (
            <>
                <option value="Sprocket">{row.customerName}</option>
            </>
        )
    })

    const GetItems = inventory_data.map(row => {
        return (
            <>
                <option value="Sprocket">{row.itemName}</option>
            </>
        )
    })

    return (
        <>
            <NavigationBar />

            <div className="container">

                <h1> Create Inventory Item</h1>

                <form onSubmit={createItem}>
                    <div className="mb-3">
                        <label htmlFor="customer" className="form-label">Customer</label>
                        <select className="form-select" name="category" required value={customer} onChange= {(e) => setCustomer(e.target.value)}>
                            {GetCustomers}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="saleDate" className="form-label">Sale Date:</label>
                        <input type="date" className="form-control" id="saleDate" required value={saleDate} onChange= {(e) => setSaleDate(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="saleTime" className="form-label">Sale Time:</label>
                        <input type="time" className="form-control" id="saleDate" required value={saleTime} onChange= {(e) => setSaleTime(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="itemID" className="form-label">Item Purchased</label>
                        <select className="form-select" name="itemID" required value={itemID} onChange= {(e) => setItemID(e.target.value)}>
                            {GetItems}
                        </select>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default SalesPage;
