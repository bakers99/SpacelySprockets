import {useState} from "react";
import {useNavigate} from "react-router-dom";
import NavigationBar from '../components/NavigationBar'
import '../../css/InventoryPage.css';

const Create = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("Sprocket");
    const [id, setID] = useState(null);
    const [item, setItem] = useState("Regular Sprocket");
    const [description, setDescription] = useState("Description stuff...");
    const [count, setCount] = useState(1);
    const [cost, setCost] = useState(9.99);
    const [validationError,setValidationError] = useState({})


    const createItem = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('itemName', item)
        formData.append('itemDesc', description)
        formData.append('itemID', id)
        formData.append('itemCategory', category)
        formData.append('itemCount', count)
        formData.append('itemCost', cost)

        await axios.post(`http://127.0.0.1:8000/api/inventory`, formData).then(({data})=>{
            alert("Item Successfully Created")
            navigate("/inventory")
        }).catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
                alert("Item Creation Failed")
            }})
    }

    return (
        <>
            <NavigationBar />

            <div className="container">

                <h1> Create Inventory Item</h1>

                <form onSubmit={createItem}>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className="form-select" name="category" required value={category} onChange= {(e) => setCategory(e.target.value)}>
                            <option value="Sprocket">Sprocket</option>
                            <option value="Cog">Cog</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">ID</label>
                        <input type="text" className="form-control" id="id" required value={id} onChange= {(e) => setID(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="item" className="form-label">Item Name</label>
                        <input type="text" className="form-control" id="item" required value={item} onChange= {(e) => setItem(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" required value={description} onChange= {(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="count" className="form-label">Count</label>
                        <input type="number" className="form-control" id="count" required value={count} onChange= {(e) => setCount(e.target.valueAsNumber)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cost" className="form-label">Cost</label>
                        <input type="number" step="0.01" className="form-control" id="cost" required value={cost} onChange= {(e) => setCost(e.target.valueAsNumber)}/>
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
