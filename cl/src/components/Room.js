import React,{useState,useEffect} from 'react'
import _ from "lodash";
import RoomDetails from './RoomDetails'
import {useDispatch,useSelector} from 'react-redux'
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Search,
  Segment,
  Message,
  Modal,
  Form
} from 'semantic-ui-react'
import axios from 'axios'

const source = []
export default function Room(props) {
  const [isLoading,setLoading] = useState(false)
  const [value,setValue] = useState("")
  const [results,setResults] = useState({})
  const [source,setSource] = useState([])
  const [open,setOpen] = useState(false)
  const [create,setCreate] = useState(false)
  const [password,setPassword] = useState("")
  const [username,setUsername] = useState("")
  const [roomInstance,setRoomInstance] = useState({})
  const [error,setError] = useState({
    isError:false,
    errorContent:""
  })
  const user = useSelector(state=>state.auth.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    axios.get('/api/room')
    .then(res=>{
      const data = res.data
      const newArrayOfObj = data.map(({ roomName: title, ...rest }) => ({ title, ...rest }));
      setSource(newArrayOfObj)
    })
  },[])


  const handleResultSelect = (e, { result }) =>{
    setValue(result.title)
    let obj = source.find(o => o.title === result.title);
    setOpen(true)
    setRoomInstance(obj)
  }

  const handleSearchChange = (e, { value }) => {
    setLoading(true)
    setValue(value)
    setTimeout(() => {
      if (value.length < 1){
        setLoading(false)
        setResults({})
        setValue("")
      }
      const re = new RegExp(_.escapeRegExp(value), 'i')
      const isMatch = (result) => re.test(result.title)
      setLoading(true)
      setResults( _.filter(source, isMatch))

    },300)
  }
  const joinRoom=()=>{
   axios.post(`/api/room/joinRoom/${user.id}/${roomInstance._id}`,{
     password:password
   })
   .then(res=>{
     console.log(res)
     if(res.data.error){
      setError({
        isError:true,
        errorContent:res.data.error
      })
     }else{
      alert("Room Joined")
      dispatch({type:"GET_USER",payload:{id:user.id}})
      setOpen(false)
      window.location.reload()
      
     }
   }).catch(err=>console.log(err))
  }


  const createRoom=()=>{
    axios.post(`/api/room/createRoom`,{
      roomName:username,
      password:password
    })
    .then(res=>{
      console.log(res)
      if(res.data.error){
       setError({
         isError:true,
         errorContent:res.data.error
       })
      }else{
       alert("Room Created")
       setCreate(false)
       setError({
        isError:false,
        errorContent:""
      })
      }
    }).catch(err=>console.log(err))
  }
    return (
        <div id="room">

        <Segment placeholder>
          <Grid columns={2} stackable textAlign='center'>
            <Divider vertical>Or</Divider>
    
          <Grid.Row verticalAlign='middle'>
          
    
            <Grid.Column>
              <Header icon>
                <Icon name='group' />
                Add New Room
              </Header>
              <Button primary onClick={()=>setCreate(true)}>Create</Button>
              <Modal size="mini" open={create} onClose={()=>{
                setError({
                  isError:false,
                  errorContent:""
                })
              }}>
              <Modal.Header>Create New Room</Modal.Header>
              <Modal.Content>
              <Form.Input  placeholder='Enter Room name...' onChange={(e)=>{
                setUsername(e.target.value)
              }}/><br/>
                <Form.Input type="password"  placeholder='Enter password...' onChange={(e)=>{
                  setPassword(e.target.value)
                }}/>
                {error.isError?<Message
                  error
                  header='Action Forbidden'
                  content={error.errorContent}
                />:null}
                
              </Modal.Content>
              <Modal.Actions>
                <Button negative onClick={()=>setCreate(false)}>No</Button>
                <Button
                  positive
                  icon='checkmark'
                  labelPosition='right'
                  content='Yes'
                  onClick={()=>createRoom()}
                />
              </Modal.Actions>
          </Modal>
            </Grid.Column>

            <Grid.Column>
            <Header icon>
              <Icon name='search' />
              Find Room
            </Header>
  
            <Search
                fluid
                input={{ icon: 'search', iconPosition: 'left' }}
                loading={isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={_.debounce(handleSearchChange, 500, {
                  leading: true,
                })}
                results={results}
                value={value}
                placeholder="Search Room Name..."
                {...props}
        />

        <Modal size="mini" open={open} 
        onClose={()=>{
          setError({
            isError:false,
            errorContent:""
          })
        }}
        >
        <Modal.Header>Join Room ?</Modal.Header>
        <Modal.Content>
          <p>{value}</p>
          <Form.Input type="password"  placeholder='Enter password...' onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
          {error.isError?<Message
            error
            header='Action Forbidden'
            content={error.errorContent}
          />:null}  
          
          
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={()=>setOpen(false)}>No</Button>
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content='Yes'
            onClick={()=>joinRoom()}
          />
        </Modal.Actions>
    </Modal>
          </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      {user.room?
        
        <RoomDetails/>
        :
        <Message
        info
        header='Room not found'
        content="You are not in room Please Join or Create one !"
      />
      }
     
        </div>
    )
}
