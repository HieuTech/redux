import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FiFilePlus } from "react-icons/fi";

import { toast } from "react-toastify";

import { postCreateNewUser } from "../../../services/apiService";

const ModalCreateUser = (props) => {
  const { show, setShow,fetchListUserWithPaginate,pageCount } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUsername] = useState("Hieu");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("");
    setPreviewImage("");
  };

  const handleUpLoadImage = (event) => {
    //ng dùng k upload thì == null
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    } else {
      setPreviewImage(null);
    }
    setImage(event.target.files[0]);
  };
  
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  //validate
  const createNewUser = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Email invalid");
      return;
    }
    if (!password) {
      toast.error("password invalid");
      return;
    }
    //call apis
    let data = await postCreateNewUser(email, password, user, role, image);
    console.log("Here data error:", data);
    if (data && data.EC === 0) {
      toast.success(data);
      handleClose();
      await fetchListUserWithPaginate;
    }

    if (data && data.EC !== 0) {
      toast.error(data, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">UserName</label>
              <input
                type="text"
                className="form-control"
                value={user}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">{role}</label>
              <select
                className="form-select"
                onChange={(event) => {
                  setRole(event.target.value);
                }}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12 ">
              <label className="form-label label-upload" htmlFor="labelUpload">
                {" "}
                Upload Image File
              </label>
              <FiFilePlus />

              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(event) => {
                  handleUpLoadImage(event);
                }}
              />
            </div>

            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img
                  src={previewImage}
                  className="img__content"
                  alt="modal"
                ></img>
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              createNewUser();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalCreateUser;
