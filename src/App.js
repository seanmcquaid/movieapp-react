import React, { Component } from 'react';
import Navbar from "./Navbar"
import Poster from "./Poster";
import './App.css';

class App extends Component {
  // in order to use this, we need have a constructor
  constructor(){
    super()
    this.state = {
      movieList: []
    }
    this.movieSearch = this.movieSearch.bind(this)
  }

  movieSearch(event){
    event.preventDefault();
    console.log("form submitted")
    const movieTitle = document.getElementById("searchTerm").value;
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=fec8b5ab27b292a68294261bb21b04a5&query='+movieTitle;
		fetch(url)
		.then((response)=>{
		  return response.json();
		})
		.then((myJson)=>{
			const results = myJson.results;
			console.log(results)
			this.setState({
				movieList: results
			});
		});		
  }

  componentDidMount(){
        const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=fec8b5ab27b292a68294261bb21b04a5";
        
        // fetch is a replacement for $.getJSON/$.ajax/axios
        fetch(url)
        .then((response)=>{
          return response.json();
        })
        .then((myJson)=>{
            const results = myJson.results;
            console.log(results)
            this.setState({
                movieList: results
            });
        });

        console.log("Checking... yes! It's mounted");

    }

  render() {
    const posters = this.state.movieList.map((movie,i)=>{
      return(<Poster key={i} movie={movie}/>)
    })
    return (
      <div className="container">
        <Navbar />
        <div className="row">
        <h1>The Movie App for the 5th Time</h1>

        <form onSubmit={this.movieSearch}>
          <input id="searchTerm" type="text" placeholder="Movie Title"/>
          <button type="submit" className="btn">Submit</button>
        </form>

        {posters}
        </div>
      </div>
    );
  }
}

export default App;
