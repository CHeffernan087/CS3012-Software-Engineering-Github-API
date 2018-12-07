import React, { Component } from 'react';
import './App.css';
import GitHubCharts from './Components/githubComponents';
import InputField from './Components/InputField/Input';
import {ResponsiveBar } from 'nivo'
const navBar = 
{
    height:"8vh",
    width:"100vw",
    backgroundColor:"white",
    marginBottom:"3vh",
    boxShadow: "7px 5px 12px grey",
}

class App extends Component {


testFunction()
{
  
}

getCredentials(userName, password)
{
    this.setState({
        userName:userName,
        password:password,
        displayGithubLogin :false,
        displayGithubStats:true
    })
  
}



  constructor(props)
  {
    super(props)
    this.state = {
      languages:
      {
        "python":100,
      },
      displayGithubLogin :false,
      displayGithubStats:true,
    }
    this.getCredentials = this.getCredentials.bind(this)
 
  }
 
  
  render() {

    this.testFunction()

    return (


      <div className="App" style = {{fontFamily:"Lobster"}}>
            <div style = {navBar}></div>
            <GitHubCharts  display = {this.state.displayGithubStats} userName = {this.state.userName} password = {this.state.password}/>

            <InputField display = {this.state.displayGithubLogin} retrieveUserInfo = {this.getCredentials} />
           
      </div>
    );
  }
}

export default App;
