import React,{useEffect,useState} from 'react'
import mapboxgl from 'mapbox-gl';
import Marker from './Marker'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'



export default function Map(props) {
    const color = ["blue","red","orange","green","pink","yellow"]
    //color[Math.floor(Math.random() * color.length)]
    mapboxgl.accessToken = "pk.eyJ1IjoiY29kaWZpZWRjb2RlciIsImEiOiJjazkxZmMxZXUwM2R3M2VqcnRjNHM1NzF6In0.2xliKWIgfeUjatgma4_CRg";
    var [state,setState] = useState({
        lat:props.coords.latitude,
        lng:props.coords.longitude,
        zoom:8
    })
    var dispatch = useDispatch()
    var userState = useSelector(state=>state.auth.user)
    var roomState = useSelector(state=>state.room)
    var loading = useSelector(state=>state.loading.isLoading)
    var map 
    var [l,setL] = useState("default")
    useEffect(()=>{
      
       map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [state.lng, state.lat],
            zoom: state.zoom
            });
            new mapboxgl.Marker(<Marker /> ).setLngLat([state.lng,state.lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 }) 
            .setHTML('<h3>' + "You"+ '</h3> '))
            .addTo(map) 

            call()
            
    },[])
    async function reverseGeolocation (lat,lng){
        var location = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=886c132b136b3f&lat=${lat}&lon=${lng}&format=json`)
       
      var data = await location.json()
      
      return data.display_name       
        
    }
     async function call(){
        roomState.users.forEach(async function (user) {
            setTimeout(async function(){
                if(user._id!==userState.id){
                    var location = await reverseGeolocation(user.coords.lat,user.coords.lng)
                  
                      
                    var marker = new mapboxgl.Marker(<Marker /> ).setLngLat([user.coords.lng,user.coords.lat])
                .setPopup(new mapboxgl.Popup({ offset: 25 }) 
                .setHTML(`<h3> ${user.username} </h3><br/>
                    <p>${location}</p>
                `))
                .addTo(map)
                }
            },1000)
           
           
        })
    }
   
    return (
        <div>
            <div id="map" style={{width:"100%",height:"100vh"}} />
        </div>
    )
}
