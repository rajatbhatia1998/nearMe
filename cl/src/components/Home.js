import React, { Component } from 'react'
import Map from './Map/Map'
import {connect} from 'react-redux'



class Home extends Component {
    constructor(props){
       super(props)
        this.state = {
            coords:null
        }
    }
    success=(position)=>{
        this.setState({coords:position.coords})
        console.log(position)
        this.props.setCoords({
            id:this.props.user.id,
            lat:position.coords.latitude,
            lng:position.coords.longitude
        })
        const roomId =  this.props.user.room
        if(roomId!==undefined){
            this.props.getRoomData({id:roomId})
        }else{
            alert("Please Join a room")
        }
    }
    error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
    componentWillMount(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.success,this.error,{
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
              });
          } else {
              //<MapContainer coords={this.state.coords}/>
            console.log("Geolocation is not supported by this browser.");
          }
    }


    render() {
       
        return (
            <div>
            {this.state.coords!==null?<Map coords={this.state.coords}/>:<h3>Not loaded</h3>}
                
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        user:state.auth.user
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        setCoords:(payload)=>dispatch({type:"SET_COORDS",payload}),
        getRoomData:(payload)=>dispatch({type:"GET_ROOM_DATA",payload})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
