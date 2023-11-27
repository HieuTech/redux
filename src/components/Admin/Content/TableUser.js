const TableUser = (props) => {
  const { listUser, handleClickBtnUpdate, handleViewUser, handleClickDelete } =
    props;

  const renderList = () => {
    return listUser.length === 0 ? (
      <tr>No User Found</tr>
    ) : (
      listUser.map((item, index) => {
        return (
          <tr key={`table-user-${index}`}>
            <th>{item.id}</th>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  handleViewUser(item);
                }}
              >
                View
              </button>
              <button
                className="btn btn-warning mx-3"
                onClick={() => {
                  handleClickBtnUpdate(item);
                }}
              >
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleClickDelete(item);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <>
      <table className="table table-hover ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{renderList()}</tbody>
      </table>
    </>
  );
};

export default TableUser;
