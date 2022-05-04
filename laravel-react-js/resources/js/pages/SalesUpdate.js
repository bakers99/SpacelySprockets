import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import NavigationBar from '../components/NavigationBar'
import '../../css/InventoryPage.css';
import useFetch from "../useFetch";


const Update = (props) => {
    const {id} = useParams();
    const {customer_data, inventory_data, sales_data} = props;
    const[report_data, setReportData] = useState({ customer_customerID: "", item_itemID: "", saleDate: "", saleAmount: "", salePrice: ""});


    useEffect(() => {
        const fetchData = async () => {
            try {
                let route = `http://127.0.0.1:8000/api/sales/${id}`;
                await axios.get(route)
                    .then(response => setReportData({ customer_customerID: response.data.customer_customerID, item_itemID: response.data.item_itemID, saleDate: response.data.saleDate, saleAmount: response.data.saleAmount, salePrice: response.data.salePrice}));
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, []);

    console.log(JSON.stringify(report_data));

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


    const navigate = useNavigate();
    const [customer, setCustomer] = useState(report_data.customer_customerID);
    const [item, setItem] = useState(report_data.item_itemID);
    const [date, setDate] = useState("");
    const [price, setPrice] = useState(.99);
    const [count, setCount] = useState(1);


    const [validationError,setValidationError] = useState({})


    const updateSales = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('customer_customerID', customer)
        formData.append('item_itemID', item)
        formData.append('saleDate', date)
        formData.append('salePrice', price)
        formData.append('saleCount', count)

        // Build the data object.
        const data = {};
        formData.forEach((value, key) => (data[key] = value));
        // Log the data.
        console.log(data);

        await axios.patch(`http://127.0.0.1:8000/api/sales/${id}`, data).then(({data})=>{
            alert("Sales Report Successfully Updated")
            navigate("/customer")
        }).catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
                alert("Sales Report Update Failed")
            }})
    }

    return (
        <>
            <NavigationBar />

            <div className="container">

                <h1> Update Sales Report ID:{id}</h1>

                <form onSubmit={updateSales}>

                    <div className="mb-3">
                        <label htmlFor="customer" className="form-label">Customer Name</label>
                        <select className="form-select" name="customer" required value={report_data.customer_customerID} onChange= {(e) => setCustomer(e.target.value)}>
                            {GetCustomers}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="item" className="form-label">Item Name</label>
                        <select className="form-select" name="item" required value={report_data.item_itemID} onChange= {(e) => setItem(e.target.value)}>
                            {GetItems}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" required value={date} onChange= {(e) => setDate(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id="price" required value={price} onChange= {(e) => setPrice(e.target.valueAsNumber)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="count" className="form-label">Count</label>
                        <input type="number" className="form-control" id="count" required value={count} onChange= {(e) => setCount(e.target.valueAsNumber)}/>
                    </div>


                    <div className="button-container">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default Update;
