import React,{useEffect,useState} from 'react';
import './App.css';
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux' 
import Sidebar from './components/Sidebar'
import Login from './components/Login';




function App() {

  const auth = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const [state,setState] = useState({
    openMenu:false,
    currentStyle:""
  })
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("nearMeUser"))
    if(user){
      dispatch({type:"SET_USER",payload:user})
    }
  },[])
  
  return (
    <div className="App">
      {auth.auth?<button id="menu-btn" onClick={()=>{
        setState({
          openMenu:!state.openMenu,
          currentStyle:"menu-btn2"
        })
      }}>	&#x2630;</button>:null}

      {auth.auth?<Sidebar open={state.openMenu}/>:<Login/>}
       
     
    </div>
  );
}

export default App;
