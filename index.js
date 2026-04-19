const searchBtn = document.getElementById('search-bar')
const searchText = document.getElementById('search-text')
const mainLayOut = document.getElementById('main-layout')
const apiKey = '338ca256'
const movieName = searchText.value








searchBtn.addEventListener('click', fetchForFilms)

async function fetchForFilms() {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`)
    const data = await response.json()
    const filmsIdsArr = data.Search.map(film => film.imdbID)
    fetchForFilmDetails(filmsIdsArr)
}

function renderCard(data) {

}


async function fetchForFilmDetails(filmsIdsArr) {

    const films = filmsIdsArr.map(async id => {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
        const data = await response.json()
        return data
    })
    console.log(films)
}