// JQuery

// onClick search button
// $(".search-button").on("click", function() {
//     // onChange input search keywords
//     $.ajax({
//       url: "http://www.omdbapi.com/?apikey=84d8c1bd&s=" + $(".input-keyword").val(),
//       success: (results) => {
//         const movies = results.Search;

//         console.log(movies);

//         // looping card in cards container
//         let cards = "";
//         movies.forEach((m) => {
//           cards += showCards(m);
//         });

//         $(".movies-container").html(cards);

//         // onClick movie details button
//         $(".modal-detail").on("click", function () {
//           $.ajax({
//             url:
//               "http://www.omdbapi.com/?apikey=84d8c1bd&i=" + $(this).data("imdbid"),
//             success: (m) => {
//               const movieDetail = showMovieDetail(m);

//               $(".modal-body").html(movieDetail);
//             },
//             error: (e) => {
//               console.log(e.responseText);
//             },
//           });
//         });
//       },
//       error: (e) => {
//         console.log(e.responseText);
//       },
//     });

// });

// //////////////////////////////NO TRESPASSING///////////////////////////////

// fetch

// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function() {

//   const inputKeyword = document.querySelector(".input-keyword");
//   fetch('http://www.omdbapi.com/?apikey=84d8c1bd&s=' + inputKeyword.value)
//     .then(response => response.json())
//     .then(response => {
//       const movies = response.Search;

//       let cards = "";
//       movies.forEach((m) => {
//         cards += showCards(m);
//       });
//       // select movies container
//       const moviesContainer = document.querySelector(".movies-container");
//       moviesContainer.innerHTML = cards;

//       // fetching detail button
//       const modalDetailButton = document.querySelectorAll(".modal-detail");
//         modalDetailButton.forEach(btn => {
//           btn.addEventListener("click", function() {
//             const imdbid = this.dataset.imdbid;
//             fetch("http://www.omdbapi.com/?apikey=84d8c1bd&i=" + imdbid)
//               .then(response => response.json())
//               .then(m => {
//                 const movieDetail = showMovieDetail(m);
//                 const detail = document.querySelector(".modal-body");
//                 detail.innerHTML = movieDetail;
//               });

//           });
//         });
//     });

// });

// //////////////////////////DO NOT TRESPASS//////////////////////////////////

// fetch refractor (async await)

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  console.log(movies);
  updateUI(movies);
});

// event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});



function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=84d8c1bd&s=" + keyword)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => {
    cards += showCards(m);
  });
  // select movies container
  const moviesContainer = document.querySelector(".movies-container");
  moviesContainer.innerHTML = cards;
}

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=84d8c1bd&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetail(m);
  const detail = document.querySelector(".modal-body");
  detail.innerHTML = movieDetail;
}

// constants
function showCards(m) {
  return `<div class="col-md-3 my-3">
                <div class="card" style="width: 18rem;">
                    <img src="${m.Poster}" class="card-img-top" alt="Ini poster, lho">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-success modal-detail" data-bs-toggle="modal" data-bs-target="#moviesDetail"
                        data-imdbid="${m.imdbID}">Details</a>
                    </div>
                </div>
            </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
                <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid" src="${m.Poster}" />
                </div>
                <div class="col-md">
                    <ul class="list-group">
                    <li class="list-group-item">
                        <h4>${m.Title} (${m.Year})</h4>
                    </li>
                    <li class="list-group-item">
                        <strong>Director : </strong>${m.Director}
                    </li>
                    <li class="list-group-item"><strong>Genre : </strong>${m.Genre}</li>
                    <li class="list-group-item">
                        <strong>Actors : </strong>${m.Actors}
                    </li>
                    <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
                    </ul>
                </div>
                </div>
            </div>`;
}

// fetch("http://www.omdbapi.com/?apikey=84d8c1bd&s=harry potter").then(response => response.json()).then(response => console.log(response));
