import React, { Component } from 'react'
import { Button, Form,Message,Modal, } from 'semantic-ui-react'
import axios from 'axios'
import {connect} from 'react-redux'
 class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:"",
            password:"",
            confirmPass:"",
            error:false,
            header:"Action Forbidden",
            content:"",
            loading:false,
            signupContent:"",
            signupError:false
        }
    }

     loginRequest=()=>{
        if(this.state.username===""||this.state.password===""){
            this.setState({
                error:true,
                content:"Please enter the values"
            })
        }else{
            const payload = {
                username:this.state.username,
                password:this.state.password,
                
            }
            this.setState({error:false,loading:true})
            axios.post('/api/user/login',payload)
            .then(res=>{
                if(res.data.error){
                    this.setState({error:true,loading:false,content:res.data.error})
                }else{
                    const userDetails = {
                        id:res.data._id,
                        username:res.data.username,
                        room:res.data.room
                    }
                    //
                    
                    console.log(res.data)
                    this.props.setUser(userDetails)
                    localStorage.setItem("nearMeUser",JSON.stringify(userDetails))
                }
            })
            .catch(err=>console.log(err))
        }
    }
    signUpReqeuest=()=>{
    
        if(this.state.username===""||this.state.password==="" || this.state.confirmPass===""){
            
            this.setState({
                signupError:true,
                signupContent:"Please enter the values"
            })
        }else if(this.state.password!==this.state.confirmPass){
            
            this.setState({
                signupError:true,
                signupContent:"Password must be same"
            })
        }else{
            
            const payload = {
                username:this.state.username,
                password:this.state.password
            }
            this.setState({signupError:false})
            axios.post('/api/user/signup',payload)
            .then(res=>{
                
                if(res.data.error){
                    this.setState({signupError:true,signupContent:res.data.error})
                }else{
                    const userDetails = {
                        id:res.data._id,
                        username:res.data.username
                    }
                    console.log(res.data)
                    this.props.setUser(userDetails)
                    localStorage.setItem("nearMeUser",JSON.stringify(userDetails))
                }
            })
            .catch(err=>console.log(err))
        }
    }
     SignUpModal = () => (
        <Modal trigger={
            <Button animated='fade'>
                <Button.Content visible>New User?</Button.Content>
                <Button.Content hidden>Signup Now!</Button.Content>
              </Button>
        }>
          <Modal.Header>Signup</Modal.Header>
          <Modal.Content image>
           
            <Modal.Description>
            <h3>Create Account</h3>
            <Form  error={this.state.signupError}
            size="large"
            >
            <Form.Input fluid  placeholder='Enter userame' onChange={(e)=>{
                this.setState({username:e.target.value})
            }}
            />

            <Form.Input  type="password" placeholder='Enter password' onChange={(e)=>{
                this.setState({password:e.target.value})

            }}/>
            <Form.Input  type="password" placeholder='Confirm password' onChange={(e)=>{
                this.setState({confirmPass:e.target.value})

            }}/>

            <Message
            error
            header={this.state.header}
            content={this.state.signupContent}
          />
            <Button onClick={this.signUpReqeuest}>Submit</Button>

            </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      )
    render() {
        return (
            <div className="loginPage">

            <header>WHERE ARE THEY</header>
            <Form id="loginForm" error={this.state.error}
            loading={this.state.loading}
            size="large"
            >
                <Form.Input fluid label='Username' placeholder='Enter userame' onChange={(e)=>{
                    this.setState({username:e.target.value})
                }}
                />

                <Form.Input label='Password' type="password" placeholder='Enter password' onChange={(e)=>{
                    this.setState({password:e.target.value})

                }}/>

                <Message
                error
                header={this.state.header}
                content={this.state.content}
              />
                <Button onClick={this.loginRequest}>Submit</Button>
                <br/><br/>
                
              <this.SignUpModal/>
            </Form>
            </div>
        )
    }
}

const mapStateToProps=()=>(
    {
        
    }
)
    


const mapDispatchToProps=(dispatch)=>{
    return{
        setUser:(payload)=>dispatch({type:"SET_USER",payload})
    }
    
}



export default connect(mapStateToProps,mapDispatchToProps)(Login)