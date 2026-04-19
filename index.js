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
        fetchForFilmDetails(filmsIdsArr)
    } else {
        noFilmFound.textContent = 'Unable to find what you’re looking for. Please try another search.'
    }

}

async function fetchForFilmDetails(filmsIdsArr) {

    const films = await Promise.all(filmsIdsArr.map(async id => {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
        const data = await response.json()
        return data
    }))

    renderCardforSearchPage(films)


}



function renderCardforSearchPage(data) {
    let resultsHtml = ''
    for (let film of data) {

        resultsHtml += `
        <div class="movie-card">
            <div class="poster-div">
                <img src=${film.Poster}
                    class="poster">
            </div>
            <div class="movie-info" >
                <div class="header-title" >
                    <p class="movie-title" >${film.Title}</p>
                    <div class="movie-rating" >
                        <span class="material-symbols-outlined">
                            star
                        </span>
                        <p class="rating">${film.imdbRating}</p>
                    </div>
                </div>
                <div class="movie-data" >
                    <p class="runtime" > ${film.Runtime}</p>
                    <p class="genre" >${film.Genre}</p>
                    <button class="add-btn" data-id=${film.imdbID}><i class="fa-solid fa-circle-plus"></i></i>
                        Watchlist</button>
                </div>
                <p class="plot" >
                    ${film.Plot}
                </p>
            </div>
    </div>
    <div class="divider"></div> 
`

    }
    noData.style.display = 'none'
    const resultsConainer = document.getElementById('results')
    resultsConainer.innerHTML = resultsHtml

    resultsConainer.onclick = e => {
        const btn = e.target.closest('.add-btn');
        if (btn) {
            const movieId = btn.dataset.id
            addToWatchlist(movieId)
        }
    }


}


function addToWatchlist(movieId) {
    const watchList = JSON.parse(localStorage.getItem('watchlist')) || []
    if (!watchList.includes(movieId)) {
        watchList.push(movieId)
        const btn = document.querySelector(`[data-id="${movieId}"]`);
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-check"></i> Added`;
            btn.disabled = true;
        }
        localStorage.setItem('watchlist', JSON.stringify(watchList))
        console.log("added to watchlist")
    } else {
        console.log("This movie is already in your watchlist!")
    }
}
