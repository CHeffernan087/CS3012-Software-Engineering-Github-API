

import React, { Component } from 'react';



const wrapper = {
    position:"relative",
    height :"55vh",
    width:"35vh",
    backgroundColor:"white",
    margin:"auto",
    borderRadius : "20px",
    boxShadow: "7px 5px 12px grey",
    marginTop:"10vh"
}
const imageWrap = {
    height: "30%",
    width: "100%",
    paddingTop:"20%",
    paddingBottom:"17.5%"

}

const submitButton = {
    height:"5vh",
    width:"60%",
    backgroundColor:"orange",
    position:"relative",
    margin:"auto",
    borderRadius:"10px",
    marginTop:"15%",
    color:"white",
    cursor:"pointer"
    
}

const centerText = {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '.8em',
  }

  const imgStyle = 
  {
      width:"auto",
      height:"100%"
  }

  const inputBox = 
  {
      width:"80%",
      marginBottom:"3%",
      height:"100%"
  }

  

class InputField extends Component {

    submitClick()
    {
       let name = document.getElementById("userNameField").value
       var password = document.getElementById("passwordField").value
       document.getElementById("passwordField").value = ""
       document.getElementById("userNameField").value = ""
       this.props.retrieveUserInfo(name, password)
    }

    constructor(props){

        super(props)
        this.submitClick = this.submitClick.bind(this)
    }

  render() {
  
    return (

     <div style = {this.props.display===true?{display:"initial"}:{display:"none"}}>
        <div style = {wrapper}>
            <div style = {imageWrap}>
                <img style ={imgStyle} src = "githubLogo.png"/>
            </div>
            <div style = {{height:"7%",paddingBottom:"6%"}}>
                <input id = "userNameField" style = {inputBox} placeholder = "username"></input>
            </div>
            <div style = {{height:"7%"}}>
                <input  id = "passwordField"  style = {inputBox} placeholder = "password" type = "password"></input>
            </div>
    
                <div onClick = {this.submitClick} style = {submitButton}>
                    <div style = {centerText}> Submit </div>
                </div>
        
        </div>
      </div>
    );
  }
}

export default InputField;
