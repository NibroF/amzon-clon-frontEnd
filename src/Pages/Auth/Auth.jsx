import React, { useState, useContext } from 'react'
import classes from './signup.module.css'
import LayOut from '../../Components/Layout/LayOut'
import { Type } from '../../Utility/action.type'
import { Link, useNavigate, useLocation } from "react-router-dom"
import { auth } from '../../Utility/firebase'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth"
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { ClipLoader } from "react-spinners"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const authHandler = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (e.target.name === "signIn") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false }); // Fixed: was signUp: false
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img src="https://thumbs.dreamstime.com/b/amazon-logo-amazon-logo-white-background-vector-format-avaliable-124289859.jpg" alt="" />
      </Link>
      
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {state?.msg && <small style={{ paddingTop: "5px", color: "green" }}>{state.msg}</small>}
        
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              type="email" 
              id="email" 
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              type="password" 
              id="password" 
            />
          </div>
          <button 
            name="signIn" 
            onClick={authHandler} 
            className={classes.login__signInButton}
          >
            {loading.signIn ? (<ClipLoader color="#000" size={15} />) : "Sign In"}
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        <button 
          name="signUp" 
          onClick={authHandler} 
          className={classes.login__registerButton}
        >
          {loading.signUp ? (<ClipLoader color="#000" size={15} />) : "Create Your Amazon Account"}
        </button>

        {error && <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;