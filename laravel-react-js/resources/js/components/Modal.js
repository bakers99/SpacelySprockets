import {useNavigate} from "react-router-dom";
import '../../css/Modal.css'

const Modal = ({url, path, handleClose, show, navRoute}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.preventDefault();

        fetch( url + path, {
            method: 'DELETE',
        }).then(() => {
            alert("Delete successful.");
            navigate(navRoute);
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
