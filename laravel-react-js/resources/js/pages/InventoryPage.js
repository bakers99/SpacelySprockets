// import {useState} from "react";
import {Link} from "react-router-dom";
// import useFetch from "./useFetch";
import NavigationBar from '../components/NavigationBar'
// import Item from './Item'
import '../../css/InventoryPage.css';


const InventoryPage = () => {
    // const {data, isPending, error} = useFetch('http://127.0.0.1:8000/inventory/')
    // const[category, setCategory] = useState("Sprocket")

    // function getCategory(event) {
    //     setCategory(event.target.value);
    // }



    return (
        <>
            <NavigationBar />

            <div className="container">
                <h1>Inventory Stock</h1>

                <form>
                    <label for="category">Choose a product:</label>
                    {/*<select name="category" onChange={getCategory}>*/}
                    <select name="category" >
                        <option value="Sprocket">Sprocket</option>
                        <option value="Cog">Cog</option>
                    </select>
                </form>

                {/*{error}<div>{error}</div>*/}
                {/*{isPending && <div>Loading...</div>}*/}

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Count</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/*{ data && <Item inventory={data} choice={category} />}*/}
                    </tbody>
                </table>

                <Link to={`/create`}>
                    <button type="button" className="btn btn-info" id="new-button">Insert New Item</button>
                </Link>
            </div>
        </>
    )
}

export default InventoryPage;
