import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {  Icon,  Menu, Segment, Sidebar } from 'semantic-ui-react'
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import Home from './Home'
import Room from './Room'
const SidebarExampleDimmed = (props) => {
  //const [visible, setVisible] = useState(true)
  const dispatch = useDispatch()
  const user = useSelector(state=>state.auth.user)

  const signOut=()=>{
    dispatch({type:"RESET_USER"})
    console.log("Signout clicked")
    localStorage.removeItem("nearMeUser")
    window.location.reload()
  }
  return (
    <Router>
        <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible={props.open}
        width='thin'
      >
      <Link to="/home"> 
          <Menu.Item as='i'>
          <Icon name='home' />
            Home
          </Menu.Item>
      </Link>

       
        <Link to="/room"> 
                <Menu.Item as='i'>
                <Icon name='globe' />
                  Room
                </Menu.Item>
        </Link>

        <Menu.Item as='i' onClick={signOut}>
            <Icon name='sign-out' />
            Signout <br/>{user.username}
      </Menu.Item>
      </Sidebar>



      <Sidebar.Pusher style={{ height: '100%'}}>
              <Switch>
          
              <Route path="/" exact>
              <Home/>
              </Route>
              <Route path="/home">
                  <Home/>
              </Route>

              <Route path="/room" >
                  <Room/>
              </Route>


          </Switch>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
    </Router>

  )
}

export default SidebarExampleDimmed
