(function(){
  "use strict";


  let $ = require('jquery');
  let handlebars = require('handlebars');

  let $searchInput = $('[data-music-search]');
  let $submitBtn = $('[data-music-submit]');

  // create url from input on submit click
  $submitBtn.on('click', function(event) {
    event.preventDefault();
    let $searchTerm = $searchInput.val().replace(/ /g,"+");;
    console.log($searchTerm);
    let url = 'https://itunes.apple.com/search?term=' + $searchTerm + '&limit=12&entity=song';
    search(url);
  });

  // fetch url requested
  function search(url) {
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(ajaxRequest) {
      displaySearch(ajaxRequest.results);
    });
  }

  let $source = $('[data-handlebars]').html();
  let template = handlebars.compile($source);
  let songWrapper = $('[data-music-template]');


  // function that runs on successful fetch which displays music
  function displaySearch(music) {

    // loop over music object to get song object
    music.forEach(function(song) {
      // console.log('song object', song);
      let $songNode = $(template(song));
      // bind data to song HTML
      $songNode.find('.play-song').data('song', song)

      // append song html to template
      songWrapper.append($songNode);
    });
  }


  songWrapper.on('click', '.play-song', function(event) {
    event.preventDefault();
    let playLink = $(event.target);
    let song = playLink.data('song');
    console.log(song.previewUrl);
  });

})();

