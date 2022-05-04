import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import NavigationBar from '../components/NavigationBar'
import '../../css/InventoryPage.css';
import useFetch from "../useFetch";


const Update = () => {
    const {id} = useParams();
    const url = `http://127.0.0.1:8000/api/customers/`
    // const {data, isPending, error } = useFetch(url + id);

    useEffect(() => {

        fetch(url + id)
        .then(response => response.json())
        .then(data => {
            setName(data.customerName)
            setAddress(data.customerAddress)
            setcompanyName(data.companyName)
        });
      }, []);    
    

   

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [companyName, setcompanyName] = useState("");
    const [validationError,setValidationError] = useState({})

    const updateCustomer = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('customerName', name)
        formData.append('customerAddress', address)
        formData.append('companyName', companyName)

        // Build the data object.
        const data = {};
        formData.forEach((value, key) => (data[key] = value));
        // Log the data.
        console.log(data);



        await axios.patch(`http://127.0.0.1:8000/api/customers/${id}`, data).then(({data})=>{
            alert("Customer Successfully Updated")
            navigate("/customer")
        }).catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
                alert("Customer Update Failed")
            }})
    }

    return (
        <>
            <NavigationBar />

            <div className="container">

                <h1> Update Customer ID:{id}</h1>

                <form onSubmit={updateCustomer}>
                    
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
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default Update;
