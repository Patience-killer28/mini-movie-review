const main = document.getElementById("main");
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4464f76aff31aac65054deb456b7721b&page=1";
const SEARCH =
  "https://api.themoviedb.org/3/search/movie?&api_key=4464f76aff31aac65054deb456b7721b&query=";
const IMG_URL = "https://image.tmdb.org/t/p/w1280";

const form = document.getElementById("form");
const search = document.getElementById("search");
getMovies(API_URL);
async function getMovies(URL) {
  const res = await fetch(URL);
  const data = await res.json();
  showMovies(data.results);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEL = document.createElement("div");
    movieEL.classList.add("movie");
    movieEL.innerHTML = `
      
      <img src="${IMG_URL + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassAverage(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          <p>
            ${overview}
          </p>
        </div>
      `;

    main.appendChild(movieEL);
  });
}

function getClassAverage(vote) {
  if (vote > 8) {
    return "green";
  } else if (vote > 6 && vote <= 8) {
    return "orange";
  } else if (vote < 6) {
    return "red";
  }
}
