import { useState } from "react";
import "./Signup.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postSignUp } from "../../services/apiService";
import { IoMdEye,IoMdEyeOff } from "react-icons/io";

const Signup = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [checked, setChecked] = useState(false);
  const [isShowPassWord,setIsShowPassWord]=useState(false)
  const navigate = useNavigate();

  const validateEmail = (value) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return    emailRegex.test(value);

  };
  const handleSignUp = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Email invalid");
    }
    if (!password) {
      toast.error("Password Invalid");
    }

    //call api
    let res = await postSignUp(email,password);
    console.log(res);
    if(res && res.EC ===0 && checked){
        toast.success("Sign up success")
        navigate('/login');

    }else{
        toast.error("Fail to Sign Up")
    }
  };

  return (
    <div className="signup-container">
      <header className="header">
        <div className="header__content">
          <span>Already have an account?</span>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </div>
      </header>
      <div className="signup-content">
        <h3 className="title">Sign Up</h3>
        <p className="desc">
          {" "}
          Get better data with conversional forms, surveys, quizzes
        </p>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        >
        </input>
        {isShowPassWord? <span className="eye-icon"
        onClick={()=>{
            setIsShowPassWord(false)
        }}>
            <IoMdEye />
        </span>:
        <span className="eye-icon"
        onClick={()=>{
            setIsShowPassWord(true)
        }}>
        <IoMdEyeOff />
            </span>}
        


        <input
          type={isShowPassWord ? 'type':'password'}
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <div className="checkbox">
          <input
            type="checkbox"
            defaultChecked={checked}
            className="form-check-input"
            onChange={() => {
              setChecked(!checked);
            }}
          ></input>
          <label>
            I agree to Sign Up <NavLink to={"/"}>Terms of Service</NavLink>{" "}
          </label>
        </div>
      </div>
      <div className="confirm">
        <button
          className="btn btn-primary"
          onClick={() => {
            handleSignUp();
          }}
        >
          Create my free account
        </button>
      </div>
    </div>
  );
};

export default Signup;
