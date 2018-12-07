

import React, { Component } from 'react';
import GitHub from 'github-api';
import PieChart from './pieChart/pieChart';
import { GridLoader } from 'react-spinners';
import BarChart from './barChart/barChart';


const languageAcronyms = 
{
    "JavaScript":"JS",
    "TypeScript":"TS",
    "C":"C",
    "C++":"C++",
    "HTML":"Web",
    "Java":"J",
    "Rust":"Rst",
    "Haskell":"Hsk",
    "Python":"Py"
}


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
    borderRadius:"20px",
    boxShadow: "7px 5px 12px grey",
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

  const quarter1 = 
  {
    height:"50%",
    width:"50%",
    float:"left"
  }
  const quarter2 = 
  {
    height:"50%",
    width:"50%",
    float:"left"
  }

  const quarter3 = 
  {
    height:"50%",
    width:"50%",
    float:"left"
  }

  const quarter4 = 
  {
    height:"50%",
    width:"50%",
    float:"left",
    position:"relative"
  }

  const centerChart = {
    margin: 0,
    position: 'absolute',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
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
  
      if ((parseInt(i)+1) === Object.keys(repos).length){
      callback(CStats)
      }
     
    })
  };


  getLangCardinalities(repos,callback) {
    var langStats = {}
    
    for( let i in repos)
      httpGet(repos[i].languages_url,function(langauges){
      let langs = JSON.parse(langauges)
      for(let j in langs)
      {
  
        let key = j
        if(langStats[key]==null)
        {
            langStats[key] = 1
        }
        else
        {
            langStats[key] = langStats[key] + 1
        }
      }
  
      if ((parseInt(i)+1) === Object.keys(repos).length){
            callback(langStats)
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
  let langCardinalities = this.state.langCardinalities
  userObj.listRepos(function(err, repos) {
    
    that.getLangStats(repos,function(langs){
      if(currentLangs[Object.keys(currentLangs)[0]] !== langs[Object.keys(langs)[0]]){
        that.setState({
        languages:langs
        })
      }
    })


    that.getLangCardinalities(repos,function(langs){
        if(langCardinalities[Object.keys(currentLangs)[0]] !== langs[Object.keys(langs)[0]]){
          that.setState({
            langCardinalities:langs
          })
        }
      })

  })
}
renderChart()
{
    this.setState({loading:false})
}
getChartData()
{
    
  let data = []
  for(let language in this.state.languages)
  {
    let newItem = {
      "id": language,
      "label": language,
      "value": parseInt(this.state.languages[language]/1000),
  
    }
    data.unshift(newItem)
  }
 
  return data
}

getBarData(){
    


      let data = []
      for(let language in this.state.langCardinalities)
      {
        let newItem = {
            "country": languageAcronyms[language],
           "hot dogColor": "hsl(74, 70%, 50%)",
           
          }
          newItem[language] =  this.state.langCardinalities[language]
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
      langCardinalities:
      {
        "No Data Found":0,
      },
      loading:true,
      color: '#000000',
    className: ''
    }
    this.runGitQuery = this.runGitQuery.bind(this)
    this.getChartData = this.getChartData.bind(this)
    this.renderChart = this.renderChart.bind(this)
  }

  render() {
    let chartData = {}  
    let barData = {}
    if(this.props.userName!==undefined){
        this.runGitQuery()
        chartData = this.getChartData()
        barData = this.getBarData()
    }
     
    console.log(this.state.langCardinalities)
    return (


      <div  style = {this.props.display===true?{display:"initial"}:{display:"none"}}>
        
      
        <div style = {statBoard}>
            <div style = {centerText} >
                <div style = {{marginLeft:"25%"}}>
                    <GridLoader
                    className={this.state.className}
                    margin = {"2px"}
                    size={20}
                    color={'#F5A623'}
                    loading={this.state.loading}
                    />
                </div>
                <br /><br />
                <h1 style = {this.state.loading===true?{display:"initial"}:{display:"none"}}>loading your info...</h1>
            </div >

            <div style = {quarter1}></div>
            <div style = {quarter2}>
                <div style = {this.state.loading===true?{display:"none"}:{display:"initial",position:"relative"}}>
                    <div style = {centerChart} >
                        <PieChart getRidOfLoadingSign = {this.renderChart} loading = {this.state.loading} chartData = {chartData}/>
                    </div>
                 </div>
            </div>
            <div style = {quarter3}></div>
            <div style = {quarter4}>
                <div style = {this.state.loading===true?{display:"none"}:{display:"initial",position:"relative"}}>
                    <div style = {centerChart}>
                        <BarChart chartData = {barData}/>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    );
  }
}

export default GitHubCharts;
