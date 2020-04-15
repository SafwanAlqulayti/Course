import React, { Component } from 'react';
 import { Card, Logo, Form, Button , Input } from '../components/AuthForms';
 
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import FileBase from 'react-file-base64';
import { thisExpression } from '@babel/types';

const API_URL = "https://course-exam.herokuapp.com";



class EditInfo extends Component {
    
    constructor(){
        super()
        this.state = {
            username1: "l",
            baseImage: "DefaultImg"
        }
    }
    UNSAFE_componentWillMount(){
        // const  x = localStorage.getItem('tokens') ;
        // const user =jwt_decode(x)
        // const id = user.user._id
        // this.setState({
        //     id: user.user._id ,
        //     username: user.user.username
        // })
        const  x = localStorage.getItem('tokens') ;
        const user =jwt_decode(x)
        const id = user.user._id
        axios.get(`https://course-exam.herokuapp.com/users/${id}`)
        .then((result)=>{
          console.log(result.data.username)
          console.log("test get")
          this.setState({
            username: result.data.username
          })
        })
    }
    handleChangeName=e=>{
        this.setState({
            username1:    e.target.value
        })
        console.log(this.state.username1)
    }
          updatInfo = ()=>{
            const  x = localStorage.getItem('tokens') ;
            const user =jwt_decode(x)
            const id = user.user._id
            const name = this.state.username1
       axios.put(`https://course-exam.herokuapp.com/users/${id}`,{
           username:  this.state.username1,
        img: this.state.baseImage} ).then((res)=>{
        console.log(res)       
        })
  
          }
          getUserInfo=()=>{
            const  x = localStorage.getItem('tokens') ;
            const user =jwt_decode(x)
            const id = user.user._id
            axios.get(`https://cors-anywhere.herokuapp.com/https://course-exam.herokuapp.com/users/${id}`)
            .then((result)=>{
              this.setState({
                username: result.username
              })
            })
          }
      

          getBaseFile(files) {
            // create a local readable base64 instance of an image
            this.setState({
              baseImage: files.base64.toString()
            });
        
            // let imageObj = {
            //    img: files.base64.toString()
            // };
         
          }
          
        
    render() {
        return (
    
               
      
                     <div class="modify">
                  <Card id="SignUpCard">
                <h1 >My info</h1>
      <Form>
      <span>current user name :          {this.state.username}</span>


      <Input
         type="userName"
          onChange={this.handleChangeName}
          placeholder="User Name"
        />
         <div className="process__upload-btn">
              <FileBase type="file" multiple={false} onDone={this.getBaseFile.bind(this)} />
            </div>
         
        <Button onClick={this.updatInfo}>Update profile</Button>
      </Form>
      </Card> 
 </div>
 
 

 
        );
    }
}

export default EditInfo;