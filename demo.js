var FlickrScraper = require('./');

var opts = {
  api_key: '22c74047dd054d19989b3ce7e4e15b81',
  tag_mode: 'any',
  tags: 'interiordesign,architecture,chairs',
  imageOpts: {
    dimensions: 'largeSquare'
  }
};

require('domready')(function() {
  demo();
});

function demo() {
  var flickrScraper = new FlickrScraper(opts);
  
  flickrScraper.getImages(function(images) {
    console.log(images);    
  });
  
}
