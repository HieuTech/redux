import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { IoMdAddCircle } from "react-icons/io";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser, getAllUserOnPage } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = () => {
  const LIMIT_USER = 6;
  const INITIAL_PAGE = 1;
  const [currentPage, setCurrentPage] = useState();
  const [pageCount, setPageCount] = useState();
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDaTaDelete] = useState({});
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

 useEffect(()=>{
    fetchListUserWithPaginate(1)
 },[])
  const fetchUser = async () => {
    let data = await getAllUser();
    if (data && data.EC === 0) {
      setListUser(data.DT);
    }
  };

  const fetchListUserWithPaginate = async (page)=>{
      console.log("page: ", page);
      let res = await getAllUserOnPage(page,LIMIT_USER);
      console.log("res: ",res);
      if(res.EC === 0){
        setListUser(res.DT.users)
        setPageCount(res.DT.totalPages)
      }
    }
  const handleClickBtnUpdate = async (item) => {
    setShowUpdate(!showUpdate);
    setDataUpdate(item);
  };
  const handleViewUser = async (item) => {
    setShowView(!showView);
    setDataUpdate(item);
  };
  const resetUpdateData = () => {
    setDataUpdate({});
  };

  const handleClickDelete = (item) => {
    setShowDelete(!showDelete);
    setDaTaDelete(item);
  };

  return (
    <div className="manage-user-container">
      <div className="card-title">
        <h3>Manage User</h3>
      </div>
      <div className="users-content">
        <button className="btn-addNew" onClick={() => setShow(true)}>
          <IoMdAddCircle />
          Add new user{" "}
        </button>

        <div className="table-users-container">
          <TableUserPaginate
            listUser={listUser}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleViewUser={handleViewUser}
            handleClickDelete={handleClickDelete}
            fetchListUserWithPaginate={fetchListUserWithPaginate}
            pageCount={pageCount}
          />
        </div>
        <ModalCreateUser
          show={show}
          setShow={setShow}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          pageCount={pageCount}
          fetchUser={fetchUser}

        />

        <ModalUpdateUser
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          dataUpdate={dataUpdate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          resetUpdateData={resetUpdateData}
          fetchUser={fetchUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          pageCount={pageCount}
        />

        <ModalViewUser
          setShowView={setShowView}
          showView={showView}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          pageCount={pageCount}
        />

        <ModalDeleteUser
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          dataDelete={dataDelete}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          fetchUser={fetchUser}

        />
      </div>
    </div>
  );
};

export default ManageUser;
