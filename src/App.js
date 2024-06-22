// import { Route, Routes } from "react-router-dom";
// import LandingPage from "./Components/LandingPage/LandingPage";
// import VerifyEmail from "./Components/VerifyEmail/VerifyEmail";
// import SelectOptions from "./Components/SelectOptions/SelectOptions";
// import Greetings from "./Components/Welcome/Greetings";
// import { useSelector } from "react-redux";
// import { Navigate} from "react-router-dom";

// function App() {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   console.log(isAuthenticated);

//   return (
//     <>
//       <div className="bg-white">
//         {/* <DemoComponent/> */}
//         {!isAuthenticated && <Navigate to="/" />}
//         {/* <Routes>
//           <Route path="/" exact element={<LandingPage />} />
//           <Route path="/welcome" element={<Greetings />} />
//           <Route path="/verify" element={<VerifyEmail />} />
//           <Route path="/select_options" element={<SelectOptions />} />

//         </Routes> */}


//       </div>
//     </>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setIsLoggedIn(true);
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
        setIsLoggedIn(false);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {isLoggedIn ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}
export default App;