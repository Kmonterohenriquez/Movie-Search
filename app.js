$(document).ready(() => {
	$('#searchForm').on('submit', (e) => {
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});

function getMovies(searchText) {
	axios
		.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=993b0c40')
		.then((response) => {
			console.log(response);
			let movies = response.data.Search;
			let output = '';
			 
			
		
			$.each(movies, (index, movie) => {
				output += `
            <div class="movie-container">
              <div class="sgl-movie text-center">
                <div class='img-container'>
                    <img id='poster-img' src="${movie.Poster}">
                </div>
                <div class='info-container'>
                    <h6>${movie.Title}</h6>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
                    
                </div>
            </div>
          `;
			});

			

			$('#movies').html(output);
		})
		.catch((err) => {
			console.log(err);
		});
}

function movieSelected(id){
	sessionStorage.setItem('movieId', id);
	window.location = 'movie.html';
	return false;
}

function getMovie(){
	let movieId = sessionStorage.getItem('movieId');
	axios
		.get('http://www.omdbapi.com/?i=' + movieId + '&apikey=993b0c40')
		.then((response) => {
			console.log(response);
			let movie = response.data;

			let output = `
			<div class='row'>
				<div class='col-lg-4 post-container'> 
					<img src='${movie.Poster}' class='thumbnail'>
				</div>
				<div class='col-lg sgl-movie-info'>
					<h2>${movie.Title}</h2>
					<ul class='list-group'>
						<li class='list-group-item'><strong>Genre:</strong> ${movie.Genre}</li>
						<li class='list-group-item'><strong>Released:</strong> ${movie.Released}</li>
						<li class='list-group-item'><strong>Rated:</strong> ${movie.Rated}</li>
						<li class='list-group-item'><strong>IMDB rating:</strong> ${movie.imdbRating}</li>
						<li class='list-group-item'><strong>Director:</strong> ${movie.Director}</li>
						<li class='list-group-item'><strong>Writer:</strong> ${movie.Writer}</li>
						<li class='list-group-item'><strong>Actors:</strong> ${movie.Actors}</li>
					</ul>
				</div>
			</div>
			<div class='row'>
				<div class='description-container'>
					<h3>Description</h3>
					${movie.Plot}
					<hr>
					<a href='http://imdb.com/title/${movie.imdbID}' target='blank' class='btn btn-primary'>View IMDB</a>
					<a href='index.html' class='goBack-btn'>Go Back</a>
				</div>
			</div>
			`;
			$('#movie').html(output);
		})
		.catch((err) => {
			console.log(err);
		});
}

