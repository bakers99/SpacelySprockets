import {useState} from "react";
import {useNavigate} from "react-router-dom";
import NavigationBar from '../components/NavigationBar'
import '../../css/InventoryPage.css';

const Create = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("Name...");
    const [address, setAddress] = useState("Address....");
    const [companyName, setcompanyName] = useState("Company name...");
    const [validationError,setValidationError] = useState({})


    const createCustomer = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('customerName', name)
        formData.append('customerAddress', address)
        formData.append('companyName', companyName)

        await axios.post(`http://127.0.0.1:8000/api/customers`, formData).then(({data})=>{
            alert("Customer Successfully Created")
            navigate("/customer")
        }).catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
                alert("Customer Creation Failed")
            }})
    }

    return (
        <>
            <NavigationBar />

            <div className="container">

                <h1> Create Inventory Item</h1>

                <form onSubmit={createCustomer}>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Customer Name</label>
                        <input type="text" className="form-control" id="name" required value={name} onChange= {(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Customer Address</label>
                        <input type="text" className="form-control" id="address" required value={address} onChange= {(e) => setAddress(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="companyName" className="form-label">Company Name</label>
                        <input type="text" className="form-control" id="companyName" required value={companyName} onChange= {(e) => setcompanyName(e.target.value)}/>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default Create;
