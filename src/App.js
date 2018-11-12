import React, { Component } from 'react';
import GitHub from 'github-api';
import logo from './logo.svg';
import './App.css';



// // unauthenticated client
// const gh = new GitHub();
// let gist = gh.getGist(); // not a gist yet
// gist.create({
//    public: true,
//    description: 'My first gist',
//    files: {
//       "file1.txt": {
//          content: "Aren't gists great!"
//       }
//    }
// }).then(function({data}) {
//    // Promises!
//    let createdGist = data;
//    return gist.read();
// }).then(function({data}) {
//    let retrievedGist = data;

//    console.log(data)
//    // do interesting things
// });


//---------------------

 
// basic auth
var gh = new GitHub({
   username: 'CHeffernan087',
   password: 'Hello087'
   /* also acceptable:
      token: 'MY_OAUTH_TOKEN'
    */
});


var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
me.listNotifications(function(err, notifications) {
   // do some stuff
});

me.getProfile(function(err, details) {
  console.log(details)
});
 
var clayreimann = gh.getUser('CHeffernan087');
clayreimann.listRepos(function(err, repos) {
   // look at all the starred repos!

   var langs = getLangStats(repos)
   console.log(langs)

   for(repo in repos)
   {
     var nextRepo = gh.getRepo('CHeffernan087', repos[repo].name)
     console.log(repos[repo].name)
     console.log(nextRepo)
    
   }
});

 
var repo = gh.getRepo('CHeffernan087', "CS3012_Software_Engineering")
repo.getDetails(function(err, dets) 
{
  console.log("here are the details ya bollix")
   console.log(dets)
});

console.log(repo)



var getLangStats = function getLangStats(repos) {
  var CStats = {}
  var mapper = function(ent){
    console.log(ent)
    var currentLangs = JSON.parse(httpGet(ent.languages_url));
    console.log((currentLangs))
    var index = 0
    for( let i in currentLangs)
    {
      console.log(Object.keys(currentLangs)[index]+" : "+currentLangs[i])
      index++;
    }
    return ent.language},
  reducer = function(stats, lang) {stats[lang] = (stats[lang] || 0) + 1; return stats},
  langStats = repos.map(mapper).reduce(reducer, {});
  delete langStats['null'];
  return Object.keys(langStats).sort(function(a,b){return langStats[b] - langStats[a]});
};



function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false); // false for synchronous request
    //xmlHttp.responseType = 'json'
    xmlHttp.send( null );
    return xmlHttp.responseText;
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
