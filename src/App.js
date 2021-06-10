import React, {useState, useEffect} from 'react';
import MovieList from './components/MovieList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MovieHeading from './components/MovieHeading';
import SearchBox from './components/SearchBox'
import AddFav from './components/AddFav';
import RemoveFavorite from './components/RemoveFavorite'

function App() {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('')
    const [favroites, setFavroites] = useState([]);

    const getApi = async (setSearchValue) => {
        const url = `http://www.omdbapi.com/?s=${setSearchValue}&apikey=259c3b4e`

        const response = await fetch(url);
        const responseJson = await response.json();
        if (responseJson.Search) {
            setMovies(responseJson.Search)
        }

    };

    useEffect(() => {
        getApi(searchValue);
    }, [searchValue])

    useEffect(() => {
        const movieFavorites = JSON.parse(
          localStorage.getItem('movie-api-favorites')
          );
        setFavroites(movieFavorites)
    }, [])

    const saveLocalStorage = (items) => {
        localStorage.setItem('movie-api-favorites', JSON.stringify(items))
    }

    const addFavoriteMovie = (movie) => {
        const newFavoriteMovie = [
            ...favroites,
            movie
        ];
        setFavroites(newFavoriteMovie);
        saveLocalStorage(newFavoriteMovie)
    }

    const removeFavoriteMovie = (movie) => {
        const newFavoriteList = favroites.filter((favorite) => favorite.imdbID !== movie.imdbID)
        setFavroites(newFavoriteList);
        saveLocalStorage(newFavoriteList);
    }

    return (
        <div className="container-fluid movie-app">
            <div className="row d-flex align-items-center mt-4 mb-4">
                <MovieHeading heading='Movies'/>
                <SearchBox searchValue={searchValue}
                    setSearchValue={setSearchValue}/>
            </div>
            <div className="row">
                <MovieList movies={movies}
                    handleFavoitesClick={addFavoriteMovie}
                    favoriteComp={AddFav}/>
            </div>
            <div className="fav-heading"><MovieHeading heading='Favorites'/>
                <div className="row d-flex align-items-center mt-4 mb-4">

                    <div className="row fav-row">
                        <MovieList movies={favroites}
                            handleFavoitesClick={removeFavoriteMovie}
                            favoriteComp={RemoveFavorite}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
