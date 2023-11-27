import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FiFilePlus } from "react-icons/fi";
import { updateUser } from "../../../services/apiService";
import _ from "lodash";
const ModalUpdateUser = (props) => {
  const { showView, setShowView
    ,fetchListUserWithPaginate,
    pageCount, dataUpdate, resetUpdateData } =
    props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUsername] = useState("Hieu");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      setImage("");
      setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
    }
  }, [dataUpdate]);

  const handleClose = async () => {
    setShowView(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("");
    setPreviewImage("");
    await fetchListUserWithPaginate;
    resetUpdateData();
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

  //validate

  return (
    <>
      <Modal
        size="xl"
        show={showView}
        onHide={handleClose}
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>View User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                disabled
                className="form-control"
                value={email}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                disabled
                className="form-control"
                value={password}
              ></input>
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
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateUser;
