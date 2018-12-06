import React, { Component } from 'react';
import GitHub from 'github-api';
import logo from './logo.svg';
import './App.css';
import { ResponsivePie } from 'nivo'
import io from 'socket.io-client'
import OAuth from './OAuth.js'
import { API_URL } from './config'
import './App.css'
import PieChart from './Components/pieChart/pieChart';
import GitHubCharts from './Components/githubComponents';
import InputField from './Components/InputField/Input';
import { timingSafeEqual } from 'crypto';

const navBar = 
{
    height:"8vh",
    width:"100vw",
    backgroundColor:"white"
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
      displayGithubLogin :true,
      displayGithubStats:false,
    }
    this.getCredentials = this.getCredentials.bind(this)
 
  }

  render() {

    this.testFunction()

    return (


      <div className="App">
            <div style = {navBar}></div>
            <GitHubCharts  display = {this.state.displayGithubStats} userName = {this.state.userName} password = {this.state.password}/>
            <InputField display = {this.state.displayGithubLogin} retrieveUserInfo = {this.getCredentials} />
      </div>
    );
  }
}

export default App;
