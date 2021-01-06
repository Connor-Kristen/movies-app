const moviesURL = ' http://localhost:3000/movies';
const omdbMainURL =  `http://www.omdbapi.com/?apikey=${omdbKey}`
const header = {'Content-Type': 'application/json'};
// i=tt3896198&

const getMovies = () => {
    return fetch(moviesURL)
        .then(response => response.json())
        .catch(console.error)
}

getMovies().then(console.log)

const getMovieId = (id) => {
    return fetch(`${moviesURL}/${id}`)
        .then(response => response.json())
        .catch(console.error)
}