import { useEffect } from "react";
import { deleteUser } from "../../../services/apiService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {  toast } from "react-toastify";


const ModalDeleteUser = (props) => {
  const { showDelete, 
    fetchListUserWithPaginate,
    pageCount,setShowDelete, dataDelete,
currentPage,setCurrentPage } = props;

  const handleClose = () => {
    setShowDelete(false);
  };

  const handleDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data);
      handleClose();
      await fetchListUserWithPaginate;
    }

    if (data && data.EC !== 0) {
      toast.error(data);
    }
  };
  return (
    <>
      <Modal show={showDelete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete email: {dataDelete.email}{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              handleDeleteUser();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
