import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignUp = (props) => {
  const navigate = useNavigate();
  const api_url = process.env.REACT_APP_API_URL;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [checkBox , setCheckbox] = useState(false);
  const [usernameTaken , setUsernameTaken] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmailUsed, setIsEMailUsed] = useState(false);

  useEffect(() => {
    // check username is already is already taken or not
  
   const Timer =  setTimeout(()=>{
    fetch(`${api_url}auth/valid_username`,{
      method : 'POST',
      headers : {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        username : username
      })
    }).then((res) => {
      console.log(res);
      
      return res.json();

    }).then((resData)=>{
      console.log(resData);
      if(resData.isUsernameTaken === true){
         setMessage(resData.message);
         setUsernameTaken(true);
      }
      else {
        setMessage('');
        setUsernameTaken(false);
      }
      console.log(resData);
    });

    fetch(`${api_url}auth/check-email`,{
      method : 'POST',
      headers : {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        email : email
      })
    }).then((res) => {
      console.log(res);
      
      return res.json();

    }).then((resData)=>{
      console.log(resData);
      if(resData.isEmailUsed === true){
         setEmailMessage(resData.message);
         setIsEMailUsed(true);
      }
      else {
        setEmailMessage('');
        setIsEMailUsed(false);
      }
      console.log(resData);
    });



    }, 300);
    return ()=>{
      console.log('running');
      clearTimeout(Timer);
      
    }
    
    // check email is already is already taken or not
  }, [username, email]);

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const checkBoxHandler = (e)=>{
    console.log(e.target.checked);
    setCheckbox(e.target.checked);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // navigate('/auth/signin');
    fetch(`${api_url}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("There is some Error");
        }
        return res.json({
          message: "New Account Creation failed!",
        });
      })
      .then((resData) => {
        console.log(resData);

        setMessage("Account Creation Successful!");
        setTimeout(() => {
          // navigate("/");
          setEmail('');
          setName('');
          setPassword('');
          setUsername('');
          
          setCheckbox((prevState)=> !prevState);
        
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="p-10">
        <div className="flex justify-end gap-4 pb-5">
          <div>Already a member? </div>
          <div>
            <Link to="#" className="text-blue-500" onClick={props.manageAccount}>
              SignIn
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5 pb-10">
          <div className="text-2xl font-bold">Sign up to Dribble</div>
          <div className="flex flex-col gap-3">
            {" "}
            <h4 className={`${usernameTaken ? 'text-red-500' : 'text-green-500' }  h-[10px]`}> {message} </h4>
            <h4 className={`${isEmailUsed ? 'text-red-500' : 'text-green-500' }  h-[10px]`}> {emailMessage} </h4>
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-bold"> Name </label>
              <input
                type="text"
                name="name"
                id="name"
                className="px-2 rounded h-[2.5rem] bg-gray-200 outline-none"
                value={name}
                required
                onChange={nameHandler}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="username" className="block font-bold" >
                {usernameTaken ? <FontAwesomeIcon icon={faWarning} className="text-red-500"/>: ''} Username{" "}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className={`px-2 rounded h-[2.5rem] bg-gray-200 outline-none ${usernameTaken ? 'bg-red-200' : ''}`}
                value={username}
                required
                onChange={usernameHandler}
              />
            </div>
          </div>
          <div className="my-5 flex flex-col">
            <label htmlFor="email" className="font-bold">  {isEmailUsed ? <FontAwesomeIcon icon={faWarning} className="text-red-500"/>: ''} Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`px-2 rounded h-[2.5rem] bg-gray-200 outline-none ${isEmailUsed ? 'bg-red-200' : ''}`}
              value={email}
              required
              onChange={emailHandler}
            />
          </div>
          <div className="my-5 flex flex-col">
            <label htmlFor="password" className="font-bold"> Password </label>
            <input
              type="password"
              name="password"
              id="password"
              className="px-2 rounded h-[2.5rem] bg-gray-200 outline-none"
              value={password}
              required
              onChange={passwordHandler}
            />
          </div>
          <div className="my-5 flex gap-2">
            <input
              type="checkbox"
              id="checkbox"
              name="checkbox"
              className="rounded border-none"
              checked = {checkBox}
              onChange={checkBoxHandler}
              required
            />
            <label htmlFor="checkbox">
              Creating an account means you're okey with our{" "}
              <a href="#" className="text-blue-600">
                Terms of Service, Privacy Policy,
              </a>
              and our default
              <a href="#" className="text-blue-600">
                Notification Settings.
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary bg-[#F7418F] px-10 py-2 rounded-lg text-white my-5"
          >
            Create Account
          </button>
        </form>
        <div className="my-5">
          This site is Protected by reCAPTCHA and the Google{" "}
          <a href="#" className="text-blue-600">
            Privacy Policy
          </a>
          and
          <a href="#" className="text-blue-600">
            Terms of Service
          </a>
          apply.
        </div>
      </div>
    </>
  );
};

export default SignUp;
