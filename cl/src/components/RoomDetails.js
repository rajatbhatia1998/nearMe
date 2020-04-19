import React,{useEffect,useState} from 'react'
import Avatar from 'react-avatar';
import { 
    Card,
    Button
} from 'semantic-ui-react'
import LoadingUser from './LoadingUser'
import {Link  } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
export default function RoomDetails() {
    var roomState =  useSelector(state=>state.room);
    var userState = useSelector(state=>state.auth.user);
    var loading = useSelector(state=>state.loading.isLoading)
    var dispatch = useDispatch()
    var [coords,setCoords] = useState({})
    var [distance,setDistance] = useState(false)
    useEffect(()=>{
        dispatch({type:"GET_ROOM_DATA",payload:{id:userState.room}})
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
               setCoords({
                   lat:position.coords.latitude,
                   lng:position.coords.longitude
               })
            });
          } else {
            console.log("Geolocation is not supported by this browser.");
          }
    },[])

    function getDistance(lat, lng) {
       
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat-coords.lat);  // deg2rad below
        var dLon = deg2rad(lng-coords.lng); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(coords.lat)) * Math.cos(deg2rad(lat)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }
    return (
        
        <Card.Group id="roomDetails" itemsPerRow={3}>
       
        {!loading? 
            roomState.users.map((user)=>{
            return  <Card>
            <Card.Content>
             <Avatar className="avatar" name={user.username} size="40" />
              <Card.Header>{user.username}</Card.Header>
              <Card.Meta>{userState.id===user._id?"You":"Member"}</Card.Meta>
              <Card.Description>
              {userState.id===user._id?
                <strong>Lattitude:{user.coords.lat.toFixed(2)} <br/>Longitude:{user.coords.lng.toFixed(2)}</strong>
                :
                <span><strong>{getDistance(user.coords.lat,user.coords.lng).toFixed(2)} KM away from you!</strong></span>}
               
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            {userState.id===user._id?null:
              <Link to="/home"><Button primary>Get Location </Button></Link>
            }
                
            </Card.Content>
          </Card>
            
         } )
         :
         roomState.users.map(user=>{
            return  <Card>
            <Card.Content>
                <LoadingUser/>
            </Card.Content>
            <Card.Content extra>
             
            </Card.Content>
          </Card>
        
        })

    }

               
        </Card.Group>
      

            
       
    )
}
