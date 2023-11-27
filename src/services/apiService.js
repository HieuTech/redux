import axios from "../utils/axiosCustomize";

const postCreateNewUser = async (email, password, user, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", user);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("/api/v1/participant", data);
};

const postLoginUser = (email,password)=>{

    return axios.post("api/v1/login",{email,password} )
}

const getAllUser = () => {
  return axios.get("/api/v1/participant/all");
};

const getAllUserOnPage =(page,limit)=>{
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)

}

const updateUser = async (id, user, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", user);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("/api/v1/participant", data);
};

const deleteUser = (userId) => {
  //form urlencoded thì phải truyền vào 1 object

  return axios.delete("/api/v1/participant",  { userId } );
};

const postSignUp =(email,password)=>{
    return axios.post("/api/v1/register",{data:{email,password}});
}
export {postLoginUser, postCreateNewUser, getAllUser, updateUser, deleteUser ,getAllUserOnPage,postSignUp};
