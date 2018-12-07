import React, { Component } from 'react';
import './App.css';
import GitHubCharts from './Components/githubComponents';
import InputField from './Components/InputField/Input';
import {ResponsiveBar } from 'nivo'
import Swal from 'sweetalert2'
import swal from 'sweetalert2';


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

resubmit()
{
    //Swal("Oh no, looks like your credentials were not valid",'error')
    //swal('Oops...', 'Something went wrong!', 'error')
    //Swal('Ooops..', 'Could not validate your credentials.Check your connection and retry','error')
    // Swal("Are all alerts like this?") 
    // Swal({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     type: 'error',
     
    //     confirmButtonColor: '#3085d6',
       
    //   })

    Swal({
        
        type: 'error',
        title: 'Inavlid Credentials',
        confirmButtonColor: 'orange',
        text: 'Check your connection and retry'
      })

    this.setState({
        displayGithubLogin :true,
      displayGithubStats:false,
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
    this.resubmit = this.resubmit.bind(this)
 
  }
 
  
  render() {
 
    this.testFunction()

    return (


      <div className="App" style = {{fontFamily:"Lobster"}}>
            <div style = {navBar}></div>
            <GitHubCharts  display = {this.state.displayGithubStats} userName = {this.state.userName} password = {this.state.password} resubmit ={this.resubmit}/>

            <InputField display = {this.state.displayGithubLogin} retrieveUserInfo = {this.getCredentials} />
           
      </div>
    );
  }
}

export default App;
