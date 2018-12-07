

import React, { Component } from 'react';
import { ResponsivePie } from 'nivo'



const wrapper = 
{
    position:"block",
   marginLeft:"0%",
    height:"100%",
    width:"40%",
    float:"left",
    
}

const statsBox = 
{
    float:"left",
    width:"60%",
    height:"100%",

}

const centerText = {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '1.2em',
  }

const heading = 
{
    height:"20%",
    position:"relative",
    width:"100%",
    fontSize:"1.5em",
}

const listEl = 
{
    height:"12.5%",
    width:"100%",
    textAlign:"left",
    paddingBottom:"5%"
}

const profilePictureStyle = {

    
    height:"40%",
    position:"relative"
}

class Profile extends Component {



  

  constructor(props)
  {
    super(props)
    this.state = {
     
      
    }
  }

  render() {

   

    return (
            <div style = {{height:"100%",width:"100%",position:"relative"}}>
            <div style = {wrapper}>
                <div style = {heading}>
                    <div style = {centerText}> Dashboard </div>
                 </div>
                 <div style = {profilePictureStyle}>
                    <img style = {{height:"100%",width:"auto"}}src = "./githubLogo.png"  />
                 </div>
            </div>
            <div style = {statsBox}>
         
                <div style ={heading}></div>
                <div style = {{height:"80%",width:"100%",float:"none",display:"inlineBlock",position:"relative"}}>
                    <div style = {{width:"100%"}}>
                        <div style = {listEl}>Username:{"   "+this.props.user.userName}</div>
                
                        <div style = {listEl}>Number Of Projects:{"   "+this.props.user.numberOfRepos}</div>
                        <div style = {listEl}>Preferred Language:{"   "+this.props.user.preferredLanguage}</div>
                        <div style = {listEl}>Most Projects:{"   "+this.props.user.mostProjectsCompletedIn}</div>
                    </div>
                   
                </div>
             
            </div>
            
            </div>
       
      
    );
    
  }
}

export default Profile;
