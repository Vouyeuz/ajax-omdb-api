$(".search-button").on("click", function() {
    
    $.ajax({
      url: "http://www.omdbapi.com/?apikey=84d8c1bd&s=" + $(".input-keyword").val(),
      success: (results) => {
        const movies = results.Search;
    
        console.log(movies);
    
        let cards = "";
    
        movies.forEach((m) => {
          cards += showCards(m);
        });
    
        $(".movies-container").html(cards);
    
        $(".modal-detail").on("click", function () {
          $.ajax({
            url:
              "http://www.omdbapi.com/?apikey=84d8c1bd&i=" + $(this).data("imdbid"),
            success: (m) => {
              const movieDetail = showMovieDetail(m);
    
              $(".modal-body").html(movieDetail);
            },
            error: (e) => {
              console.log(e.responseText);
            },
          });
        });
      },
      error: (e) => {
        console.log(e.responseText);
      },
    });

});






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

