var FlickrScraper = require('./');

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

require('domready')(function() {
  demo();
});

function demo() {
  var flickrScraper = new FlickrScraper(opts);
  //images.map(url => `<img src="${url}" />`).join('');
  flickrScraper.getImages(function(images) {
    var html = images.map(function(url) {
      return `<img src="${url}" />`;
    }).join('\n');
    document.body.innerHTML = html;
  });
}
