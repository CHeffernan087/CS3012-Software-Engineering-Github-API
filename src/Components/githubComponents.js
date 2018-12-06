

import React, { Component } from 'react';
import GitHub from 'github-api';
import { ResponsivePie } from 'nivo'
import PieChart from './pieChart/pieChart';
import { ClipLoader, BounceLoader } from 'react-spinners';





function httpGet(theUrl,callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false); 
    xmlHttp.send( null );
    callback(xmlHttp.responseText);
}



const statBoard = 
{
    height:"85vh",
    width:"90vw",
    margin:"auto",
    backgroundColor:"white",
    borderRadius:"20px"
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

class GitHubCharts extends Component {
 


getLangStats(repos,callback) {
    var CStats = {}
    
    for( let i in repos)
      httpGet(repos[i].languages_url,function(langauges){
      let langs = JSON.parse(langauges)
      for(let j in langs)
      {
  
        let key = j
        if(CStats[key]==null)
        {
          CStats[key] = langs[j]
        }
        else
        {
          CStats[key] = CStats[key] + langs[j]
        }
      }
      console.log((parseInt(i)+1)+ " " + Object.keys(repos).length)
      if ((parseInt(i)+1) === Object.keys(repos).length){
      callback(CStats)
      }
     
    })
  };
runGitQuery()
{
    var gh = new GitHub({
        username: this.props.userName,
        password: this.props.password
       
     });
     
     
  var userObj = gh.getUser(this.props.userName);
  const that = this;
  let currentLangs =  this.state.languages
  userObj.listRepos(function(err, repos) {
    that.getLangStats(repos,function(langs){
      if(currentLangs[Object.keys(currentLangs)[0]] !== langs[Object.keys(langs)[0]]){
        that.setState
        ({
        languages:langs
        })
      }
    })
  })
}

getChartData()
{
    
  let data = []
  for(let language in this.state.languages)
  {
    let newItem = {
      "id": language,
      "label": language,
      "value": this.state.languages[language],
  
    }
    data.unshift(newItem)
  }
  return data
}


  constructor(props)
  {
    super(props)
    this.state = {
      languages:
      {
        "No Data Found":100,
      },
      loading:true,
      color: '#000000',
    className: ''
    }
    this.runGitQuery = this.runGitQuery.bind(this)
    this.getChartData = this.getChartData.bind(this)
  }

  render() {
    let chartData = {}  
    if(this.props.userName!==undefined){
    this.runGitQuery()
    chartData = this.getChartData()
    }
     
    
    return (


      <div  style = {this.props.display===true?{display:"initial"}:{display:"none"}}>
        
      
        <div style = {statBoard}>
        <div style = {centerText} >
        <BounceLoader
          className={this.state.className}
          sizeUnit={"40px"}
          size={1}
          color={'#F5A623'}
          loading={this.state.loading}
        />
        </div>
            <PieChart chartData = {chartData}/>
        </div>
      </div>
    );
  }
}

export default GitHubCharts;
