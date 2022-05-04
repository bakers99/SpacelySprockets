import NavigationBar from '../components/NavigationBar'
import '../../css/InventoryPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerCreate = () => {

    const navigate = useNavigate();

    const [category, setCategory] = useState("Cog")
    const [id, setID] = useState("")
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [amount, setAmount] = useState("")
    const [cost, setCost] = useState("")
    const [validationError,setValidationError] = useState({})

    const createItem = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('itemName', name)
        formData.append('itemDesc', desc)
        formData.append('itemID', id)
        formData.append('itemCategory', category)
        formData.append('itemCount', amount)
        formData.append('itemCost', cost)

        await axios.post(`http://127.0.0.1:8000/api/inventory`, formData).then(({data})=>{
        alert("Item Sucessfully Created")
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
                <div>
                <h1>Create New Item</h1>
                </div>

                <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                </div>

                <div className='form'>
                <form onSubmit={createItem}>
                <label>
                Item Category:
                <select name="category" onChange={(event)=>{setCategory(event.target.value)}}>
                <option value="Cog">Cog</option>
                <option value="Sprocket">Sprocket</option>    
                </select>
                </label>
                <label>
                Item ID:
                <input type="text" name="id" onChange={(event)=>{setID(event.target.value)}} />
                </label>
                <label>
                Item Name:
                <input type="text" name="name" onChange={(event)=>{setName(event.target.value)}} />
                </label>
                <label>
                Item Description:
                <input type="text" name="desc" onChange={(event)=>{setDesc(event.target.value)}}/>
                </label>
                <label>
                Item Amount:
                <input type="number" min='1' name="amount" onChange={(event)=>{setAmount(event.target.value)}}/>
                </label>
                <label>
                Item Cost:
                <input type="number" min='1' step="0.01" name="cost" onChange={(event)=>{setCost(event.target.value)}}/>
                </label>
                <input type="submit" value="Submit" />
                </form>
                </div>

            </div>
        </>
    )
}

export default CustomerCreate;