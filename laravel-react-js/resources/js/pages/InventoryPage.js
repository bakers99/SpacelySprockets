import {useState} from "react";
// import {Link} from "react-router-dom";
import useFetch from "../useFetch";
import NavigationBar from '../components/NavigationBar'
import '../../css/InventoryPage.css';
import {Link} from "react-router-dom";



const Inventory = (props) => {
    const {inventory_data} = props;

    const[category, setCategory] = useState("Sprocket")


    function getCategory(event) {
        setCategory(event.target.value);
    }

    return (
        <>
            <NavigationBar />

            <div className="container">
                <h1>Inventory Stock</h1>

                <form>
                    <label htmlFor="category">Choose a product:</label>
                    <select name="category" onChange={getCategory}>
                        <option value="Sprocket">Sprocket</option>
                        <option value="Cog">Cog</option>
                    </select>
                </form>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Count</th>
                    </tr>
                    </thead>
                    <tbody>
                        <Item inventory_data={inventory_data} choice={category} />
                    </tbody>
                </table>

                <Link to={`/createItem`}>
                    <button type="button" className="btn btn-info" id="new-button">Insert New Item</button>
                </Link>
            </div>
        </>
    )
}

export default Inventory;





const Item = (props) => {
    const {choice, inventory_data} = props;

    const DisplayChoice = inventory_data.map(item => {
        if(item.itemCategory === choice) {
            return (
                <tr key={item.itemID}>
                    <td>{item.itemID}</td>
                    <td>{item.itemName}</td>
                    <td>{item.itemCount}</td>
                    <td>
                        <Link to={`/inventory/${item.itemID}`}>
                            <button key={item.itemID} type="button" className="btn btn-dark">More Info</button>
                        </Link>
                    </td>
                </tr>
            )
        }
    })

    return (
        <>
            {DisplayChoice}
        </>
    )
}
