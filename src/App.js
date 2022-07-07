import Home from './pages/Home';
import React, {  useReducer, createContext, useEffect, useState } from 'react';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import JobDetails from './pages/JobDetail';
import DashboardPost from './components/DashboardPost'
import DashboardPosted from './components/DashboardPosted'
import myReducer from './reducers/UserReducer';
import { BrowserRouter } from 'react-router-dom';
import SearchJob from './pages/SearchJob';
import ListPosts from './pages/ListPosts';
import DashboardHome from './components/DashboardHome'
import DashboardModify  from './components/DashboardModify';
import DashboardPostModify from './components/DashboardPostModify';
import DashboardApplied from './components/DashboardApplied';

export const UserContext = createContext()



const Loading =()=>
  <div className="loading">
    <div></div>
    <div></div>
  </div>  


function App() {

  const [user, dispatch] = useReducer(myReducer)
  const [isLoading, setIsLoading] = useState(true)


  const timer = () => setTimeout(()=>{
    setIsLoading(false)
  }, 2500);


  useEffect(() => {
    
  if(localStorage.getItem('user')){
    let user = JSON.parse( localStorage.getItem('user'))
    console.log(user)
    dispatch({
      "type": "login",
      "payload": {
          "username": user.username,
          "avatar": user.avatar_path,
          "email": user.email,
          "id": user.id,
          "role": user.user_role,
          "firstname": user.first_name,
          "lastname": user.last_name
      
      }
  })
}

  timer()

  },[])

  

  return (
    isLoading ? (<Loading/>)
    :(
      <div className="App content">
      <BrowserRouter>
        <UserContext.Provider value={[user, dispatch]}>
          <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route  path="/profile/:id" element={<Profile/>}/>
                <Route  path="/sign-in" element={<SignIn/>}/>
                <Route  path="/sign-up" element={<SignUp/>}/>
                <Route  path="/dashboard"  element={<Dashboard/>}>
                  <Route path="home" element={<DashboardHome/>}/>
                  <Route  path="applied" element={<DashboardApplied/>}/>
                  <Route  path="all-posted" element={<DashboardPosted/>}/>
                  <Route  path="post" element={<DashboardPost/>}/>
                  <Route  path="job-detail/:id" element={<JobDetails authenticated/>}/>
                  <Route  path="job-detail/:id/modify" element={<DashboardPostModify/>}/>
                  <Route  path="modify/:id" element={<DashboardModify/>}/>
                  <Route  path="*" element={<PageNotFound/>}/>
                </Route>
                <Route  path="job-list" element={<SearchJob/>}/>
                <Route  path="/job-list/:id/posts" element={<ListPosts/>}/>
                <Route  path="/job-list/posts" element={<ListPosts/>}/>
                <Route  path="/job-detail/:id" element={<JobDetails/>}/>
                <Route  path="*" element={<PageNotFound/>}/>
      
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
      </div>
    )
   
  );
}

export default App;
