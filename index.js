const searchBtn = document.getElementById('search-btn')
const searchText = document.getElementById('search-text')
const mainLayOut = document.getElementById('main-layout')
const noData = document.getElementById('no-data')
const noFilmFound = document.getElementById('no-film')
const myWatchlist = document.getElementById('watchlist-page')
const apiKey = '338ca256'








searchBtn.addEventListener('click', fetchForFilms)
async function fetchForFilms() {
    const movieName = searchText.value
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}&t=${movieName}`)
    const data = await response.json()
    if (data.Search) {
        const filmsIdsArr = data.Search.map(film => film.imdbID)
        console.log(data)
        fetchForFilmDetails(filmsIdsArr)
    } else {
        noFilmFound.textContent = 'Unable to find what you’re looking for. Please try another search.'
    }

}

function renderCard(data) {
    let results = ''
    for (let film of data) {

        results += `
    <div class="movie-card" id="moive-card">
            <div class="poster-div" id="poster-div">
                <img src=${film.Poster}
                    class="poster" id="poster">
            </div>
            <div class="movie-info" id="movie-info">
                <div class="header-title" id="header-title">
                    <p class="movie-title" id="movie-title">${film.Title}</p>
                    <div class="movie-rating" id="movie-raring">
                        <span class="material-symbols-outlined">
                            star
                        </span>
                        <p class="rating" id="rating">${film.imdbRating}</p>
                    </div>
                </div>
                <div class="movie-data" id="movie-data">
                    <p class="runtime" id="runtime"> ${film.Runtime}</p>
                    <p class="genre" id="genre">${film.Genre}</p>
                    <button class="add-btn" id="add-bar"><i class="fa-solid fa-circle-plus fa-shake"></i></i>
                        Watchlist</button>
                </div>
                <p class="plot" id="plot">
                    ${film.Plot}
                </p>
            </div>
    </div>
    <div class="divider" id="divider"></div> 
`

    }
    noData.style.display = 'none'
    document.getElementById('results').innerHTML = results
}


async function fetchForFilmDetails(filmsIdsArr) {

    const films = await Promise.all(filmsIdsArr.map(async id => {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
        const data = await response.json()
        return data
    }))
    renderCard(films)
}