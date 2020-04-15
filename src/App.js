import React ,{ useState, useEffect }from "react";
 import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import AddCourse from './pages/AddCourse';
import TheQuiz from './pages/TheQuiz';
import jwt_decode from 'jwt-decode';
import MyInfo from './pages/MyInfo';
 import Header from './components/Header';
import Mycourses from './pages/Mycourses' ;
import EditCourse from "./pages/editCourse";
import Instructor from "./pages/Instructor";
import EditInfo from "./pages/EditInfo";
import OneInstructor from './pages/OneInstructor';
import Image from './components/Image';


function App(props) {
  // useEffect( ()=>{
  //   let token = localStorage.getItem("tokens");
  //   console.log(token)
  // })
  const path1 = "/course"
  const [authTokens, setAuthTokens] = useState();
  // const [ userId , setUserId] = useState("");

  const setTokens = (data) => {
  console.log(data)
    if (data) {
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
     const  x = localStorage.getItem('tokens') ;
     const user =jwt_decode(x)
   
  
     console.log(user);
    }
    else {
      console.log("no data ")
    }
   
  }
 
 
  return (
    //check the user token
    
    <AuthContext.Provider value = {{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
        {/* <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/admin">Admin Page</Link>
          </li>
          <li>
            <Link to="/login">log in</Link>
          </li>
          <li>
            <Link to="/quiz">take a quiz</Link>
          </li>
          <li>
            <Link to="/myinfo">info</Link>
          </li>
        </ul> */}
        {/* <MyInfo use rInfo={props.useID}/> */}
<Header></Header>
            <Route exact path= {path1 + "/" }     component={Home} />
         <Route path= "/login" component={Login} />
            <Route path="/myinfo" component={MyInfo} />
            <Route path="/thequiz" component={TheQuiz} />
          <Route path="/signup" component={Signup} />
          <Route path="/image" component={Image} />

          <Route path="/mycourses" component={Mycourses} />
          <Route path="/addcourse" component={AddCourse} />
          {/* <Route path="/addcourse/" render={(props) => <EditCourse {...props}/>} /> */}

          <Route path="/editcourse/:id" render={(props) => <EditCourse {...props}/>} />
          <Route path="/oneinstructor/:id" render={(props) => <OneInstructor {...props}/>} />

          <Route path="/instructor" component={Instructor} />
  



             {/* <Route path="/quiz" component={TheQuiz} /> 
 */}  
 < Route path="/editinfo" component={EditInfo} /> 
          < Route path="/admin" component={Admin} /> 
          {/* <Route path="/admin" render={(props) => <Admin {...props}/>} /> */}

          {/* <PrivateRoute path="/admin" component={Admin} />  */}

        </div>
      </Router>
    </AuthContext.Provider>
    
  );
        
}

export default App;