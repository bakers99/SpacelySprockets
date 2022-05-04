import {useState} from "react";
import {useParams} from "react-router-dom";
import useFetch from "../useFetch";
import NavigationBar from './NavigationBar'
import Modal from './Modal'


const CustomerDetails = () => {
    const {id} = useParams();
    const url = 'http://127.0.0.1:8000/api/customers/'
    const navRoute ='/customer';
    const {data, isPending, error } = useFetch(url + id);

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
                <h1>Customer ID: {id}</h1>

                {error}<div>{error}</div>
                {isPending && <div>Loading...</div>}

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Company Name</th>

                    </tr>
                    </thead>
                    <tbody>
                    { data && (
                        <tr key={data.customerID}>
                            <td>{data.customerID}</td>
                            <td>{data.customerName}</td>
                            <td>{data.customerAddress}</td>
                            <td>{data.companyName}</td>
                            <td>
                                <button key={data.id} type="button" className="btn btn-danger" onClick={setModalIsOpenToTrue}>Delete</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <Modal url={url} path={id} show={modalIsOpen} handleClose={setModalIsOpenToFalse} navRoute={navRoute} />
            </div>
        </>
    )
}

export default CustomerDetails;
