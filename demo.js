var FlickrScraper = require('./');

var opts = {
  api_key: '22c74047dd054d19989b3ce7e4e15b81',
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
      return `<img src="${url}" />`
    }).join('\n');
    document.body.innerHTML = html;
  });
}
