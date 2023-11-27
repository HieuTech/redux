import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLoginUser } from "../../services/apiService";
const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
    const navigate = useNavigate()
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const checkLogin = async() => {

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Email invalid", {
        position: "top-center",
      });
      return;
    }
    if (!password) {
      toast.error("password invalid", {
        position: "top-center",
      });
      return;
    }

    let res = await postLoginUser(email,password);
    console.log("res>>>", res);
    if(res && res.EC ===0){
        navigate("/admin")
    }if(res && res.EC !==0){
        toast.error("Wrong info, check again",{
            position:'top-center'
        })
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Dont have any account yet?</span>
        <button className="btn btn-primary"
        onClick={()=>{ navigate("/signup")}}
        >Sign Up</button>
      </div>
      <div className="login-content">
        <div className="title">
          <h1> Hieu Java</h1>
        </div>
        <div className="welcome">Hello, who's this?</div>
        <div className="content-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type={"email"}
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type={"password"}
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>
          <a href="#!" className="text">
            {" "}
            Forgot your password?{" "}
          </a>
          <button
            className="btn btn-login"
            onClick={() => {
              checkLogin();
            }}
          >

            Login to Hieu Java
          </button>
            <div className="text-center">
            <span className="back"
            onClick={()=>{
                navigate('/')
            }}
            >&#60; &#60; Go To HomePage</span>

            </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
