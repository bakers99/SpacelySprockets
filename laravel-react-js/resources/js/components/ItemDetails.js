import {useState} from "react";
import {useParams} from "react-router-dom";
import useFetch from "../useFetch";
import NavigationBar from './NavigationBar'
import Modal from '../components/Modal'


const ItemDetails = () => {
    const {id} = useParams();
    const {data, isPending, error } = useFetch('http://127.0.0.1:8000/api/inventory/' + id);

    const [modalIsOpen,setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }

    return (
        <>
            <NavigationBar />

            <div className="container">
                <h1>Item ID: {id}</h1>

                {error}<div>{error}</div>
                {isPending && <div>Loading...</div>}

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Category</th>
                        <th scope="col">Name</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Count</th>
                        <th scope="col">Description</th>

                    </tr>
                    </thead>
                    <tbody>
                    { data && (
                        <tr key={data.itemID}>
                            <td>{data.itemID}</td>
                            <td>{data.itemCategory}</td>
                            <td>{data.itemName}</td>
                            <td>{data.itemCost}</td>
                            <td>{data.itemCount}</td>
                            <td>{data.itemDesc}</td>
                            <td>
                                <button key={data.id} type="button" className="btn btn-danger" onClick={setModalIsOpenToTrue}>Delete</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <Modal path={id} show={modalIsOpen} handleClose={setModalIsOpenToFalse} />
            </div>
        </>
    )
}

export default ItemDetails;
