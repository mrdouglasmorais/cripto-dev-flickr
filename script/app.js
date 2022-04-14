
let flickrKeys = 'a79dbdd1d24bbdf97f202f74ff0b63ec';
let flickrBaseURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=';
let suffixURL = 'q';

function getPhotos(term){
  let URL = `${flickrBaseURL}${flickrKeys}&text=${term}`
  return (
    fetch(URL)
      .then( res => res.json())
      .then( data => data.photos.photo)
  )
}

let app = document.querySelector('#app');
let searchForm = document.querySelector('.search-form');
let searchTerm = document.querySelector('.search-input');
let results = document.querySelector('#results');

function createFlickrThumb(photoData){
  let link = document.createElement('a');
  link.setAttribute('href', photoData.thumb);
  link.setAttribute('target', '_blank');

  let image = document.createElement('img');
  image.setAttribute('src', photoData.thumb)
  image.setAttribute('alt', photoData.title);

  link.appendChild(image);
  return link
}

function clearLoader(){
  let loadText = document.querySelector('#load-text')
  loadText.remove()
}



searchForm.addEventListener('submit', function(e){
  e.preventDefault();
  let filter =  searchTerm.value;
  results.innerHTML = `<h2 id="load-text">Carregando... ${filter}</h2>`
  getPhotos(filter)
    .then( result => {
      result.innerText = ''
      result.forEach(function(photo){
        let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
        let thumbnail = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${suffixURL}.jpg`

        let item = createFlickrThumb({
          thumb: thumbnail,
          large: url,
          title: photo.title
        })
        results.appendChild(item)
      })
    }).finally( () => clearLoader());
    
})