import {useNavigate} from "react-router-dom";
import '../../css/Modal.css'

const Modal = ({path, handleClose, show}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.preventDefault();

        console.log("fetus deletus")

        fetch( 'http://127.0.0.1:8000/api/inventory/' + path, {
            method: 'DELETE',
        }).then(() => {
            alert("Delete successful.");
            navigate('/inventory');
        });

    }

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <p>Are you sure you want to delete?</p>
                <div className="button-container">

                    <button type="button" className="btn btn-success" id="button-yes" onClick={handleDelete}>Yes</button>
                    <button type="button" className="btn btn-danger" id="button-no" onClick={handleClose}>No</button>
                </div>
            </section>
        </div>
    );
};

export default Modal;
