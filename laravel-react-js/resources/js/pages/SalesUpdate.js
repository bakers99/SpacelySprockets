import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import NavigationBar from '../components/NavigationBar'
import '../../css/InventoryPage.css';
import useFetch from "../useFetch";


const Update = (props) => {
    const {id} = useParams();
    const {customer_data, inventory_data, sales_data} = props;
    const[report_data, setReportData] = useState({ customer_customerID: "", item_itemID: "", saleDate: "", saleTime: "", saleAmount: ""});

    useEffect(() => {
        const fetchData = async () => {
            try {
                let route = `http://127.0.0.1:8000/api/sales/${id}`;
                await axios.get(route)
                    .then(response =>{
                         setReportData({ customer_customerID: response.data.customer_customerID, item_itemID: response.data.item_itemID, saleDate: response.data.saleDate, saleTime: response.data.saleTime, saleAmount: response.data.saleAmount});
                        });
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, []);


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
        formData.append('customer_customerID', report_data.customer_customerID)
        formData.append('item_itemID', report_data.item_itemID)
        formData.append('saleDate', report_data.saleDate)
        formData.append('saleTime', report_data.saleTime)
        formData.append('saleAmount', report_data.saleAmount)

        // Build the data object.
        const data = {};
        formData.forEach((value, key) => (data[key] = value));
        // Log the data.
        console.log(data);


        await axios.patch(`http://127.0.0.1:8000/api/sales/${id}`, data).then(({data})=>{
            alert("Sales Report Successfully Updated")
            navigate("/")
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
                        <label htmlFor="customer" className="form-label">Customer</label>
                        <select className="form-select" name="category" required value={report_data.customer_customerID} onChange= {(e) => setReportData({ customer_customerID: e.target.value, item_itemID: report_data.item_itemID, saleDate: report_data.saleDate, saleTime: report_data.saleTime, saleAmount: report_data.saleAmount})}>
                        <option value="" disabled selected hidden>Select Customer</option>
                            {GetCustomers}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="saleDate" className="form-label">Sale Date:</label>
                        <input type="date" className="form-control" id="saleDate" required value={report_data.saleDate} onChange= {(e) => setReportData({ customer_customerID: report_data.customer_customerID, item_itemID: report_data.item_itemID, saleDate: e.target.value, saleTime: report_data.saleTime, saleAmount: report_data.saleAmount})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="saleTime" className="form-label">Sale Time:</label>
                        <input type="time" className="form-control" id="saleDate" required value={report_data.saleTime} onChange= {(e) => setReportData({ customer_customerID: report_data.customer_customerID, item_itemID: report_data.item_itemID, saleDate: report_data.saleDate, saleTime: e.target.value, saleAmount: report_data.saleAmount})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="item" className="form-label">Item Purchased</label>
                        <select className="form-select" name="itemID" required value={report_data.item_itemID} onChange= {(e) => setReportData({ customer_customerID: report_data.customer_customerID, item_itemID: e.target.value, saleDate: report_data.saleDate, saleTime: report_data.saleTime, saleAmount: report_data.saleAmount})}>
                        <option value="" disabled selected hidden>Select Item</option>
                            {GetItems}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="saleAmount" className="form-label">Amount Purchased:</label>
                        <input type="number" className="form-control" id="saleDate" min="1" required value={report_data.saleAmount} onChange= {(e) => setReportData({ customer_customerID: report_data.customer_customerID, item_itemID: report_data.item_itemID, saleDate: report_data.saleDate, saleTime: report_data.saleTime, saleAmount: e.target.value})}/>
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
