# flickr-scraper
A scraper for flickr that returns images. You can specify the available options from the flickr.photo.search endpoint. https://www.flickr.com/services/api/flickr.photos.search.html

## example usage 

```javascript
// api key here 
var API_KEY = '';
var opts = {
  api_key: API_KEY,
  tag_mode: 'any',
  tags: 'cars',
  imageOpts: {
    dimensions: 'largeSquare'
  },
  text: 'red'
};

var flickrScraper = new FlickrScraper(opts);
//images.map(url => `<img src="${url}" />`).join('');
flickrScraper.getImages(function(images) {
  var html = images.map(function(url) {
    return `<img src="${url}" />`;
  }).join('\n');
  document.body.innerHTML = html;
});
```
Would append the fetched photos to the DOM.
