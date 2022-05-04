
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import NavigationBar from '../components/NavigationBar'
import '../../css/InventoryPage.css';

const SalesPage = (props) => {
    const {customer_data, inventory_data} = props;

    const navigate = useNavigate();
    const[customerName, setCustomerName] = useState("");
    const[saleDate, setSaleDate] = useState("");
    const[saleTime, setSaleTime] = useState("");
    const[item, setItem] = useState("");
    const[saleAmount, setSaleAmount] = useState(1);
    const[salePrice, setSalePrice] = useState(.99);

    console.log(item)
    console.log(customerName)

    const [validationError,setValidationError] = useState({})

    const createTransaction = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('customer_customerID', customerName)
        formData.append('item_itemID', item)
        formData.append('saleDate', saleDate)
        formData.append('saleTime', saleTime)
        formData.append('saleAmount', saleAmount)
        formData.append('salePrice', salePrice)

        await axios.post(`http://127.0.0.1:8000/api/sales`, formData).then(({data})=>{
            alert("Sale Successfully Created")
            navigate("/sales")
        }).catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
                alert("Sale Creation Failed")
            }})
    }

    const GetCustomers = customer_data.map(row => {
        return (
            <>
                <option value={row.customerID}>{row.customerName}</option>
            </>
        )
    })

    const GetItems = inventory_data.map(row => {
        return (
            <>
                <option value={row.itemID}>{row.itemName}</option>
            </>
        )
    })

    return (
        <>
            <NavigationBar />

            <div className="container">

                <h1> Create Inventory Item</h1>

                <form onSubmit={createTransaction}>
                    <div className="mb-3">
                        <label htmlFor="customer" className="form-label">Customer</label>
                        <select className="form-select" name="category" required value={customerName} onChange= {(e) => setCustomerName(e.target.value)}>
                        <option value="" disabled selected hidden>Select Customer</option>
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
                        <label htmlFor="item" className="form-label">Item Purchased</label>
                        <select className="form-select" name="itemID" required value={item} onChange= {(e) => setItem(e.target.value)}>
                        <option value="" disabled selected hidden>Select Item</option>
                            {GetItems}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="saleAmount" className="form-label">Amount Purchased:</label>
                        <input type="number" className="form-control" id="saleDate" required value={saleAmount} onChange= {(e) => setSaleAmount(e.target.valueAsNumber)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salePrice" className="form-label">Item Price:</label>
                        <input type="number" className="form-control" id="salePrice" required value={salePrice} onChange= {(e) => setSalePrice(e.target.valueAsNumber)}/>
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
