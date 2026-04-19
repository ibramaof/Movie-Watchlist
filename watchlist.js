const apiKey = '338ca256'
let resultsConainer = document.getElementById('watchlist-results')
const watchListNoData = document.getElementById('watchlist-no-data')






const watchList = JSON.parse(localStorage.getItem('watchlist')) || []

if (watchList.length === 0) {
    watchListNoData.style.display = 'flex'
} else {
    watchListNoData.style.display = 'none'
    fetchForFilmDetails(watchList)
}

async function fetchForFilmDetails(filmsIdsArr) {

    const films = await Promise.all(filmsIdsArr.map(async id => {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
        const data = await response.json()
        return data
    }))

    renderCardforWatchlistPage(films)
}

function renderCardforWatchlistPage(data) {
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
                    <p class="movie-title">${film.Title}</p>
                    <div class="movie-rating" >
                        <span class="material-symbols-outlined">
                            star
                        </span>
                        <p class="rating">${film.imdbRating}</p>
                    </div>
                </div>
                <div class="movie-data">
                    <p class="runtime" > ${film.Runtime}</p>
                    <p class="genre" >${film.Genre}</p>
                    <button class="remv-btn " data-id=${film.imdbID}><i class="fa-solid fa-circle-minus"></i></i>
                        Remove</button>
                </div>
                <p class="plot" >
                    ${film.Plot}
                </p>
            </div>
    </div>
    <div class="divider" id="divider"></div> 
`

    }
    resultsConainer.innerHTML = resultsHtml
    watchListNoData.style.display = 'none'
    resultsConainer.onclick = e => {
        const btn = e.target.closest('.remv-btn');
        if (btn) {
            const movieId = btn.dataset.id
            removeFromWatchlist(movieId)
        }
    }

}

function removeFromWatchlist(movieId) {
    let watchList = JSON.parse(localStorage.getItem('watchlist'))
    watchList = watchList.filter(id => id !== movieId)
    localStorage.setItem('watchlist', JSON.stringify(watchList))

    if (watchList.length === 0) {
        resultsConainer.innerHTML = ''
        watchListNoData.style.display = 'flex'
    } else {
        fetchForFilmDetails(watchList)
    }

}


