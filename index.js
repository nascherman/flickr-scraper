/*
data from https://www.flickr.com/services/api/flickr.photos.search.html
LICENSE
id="0" name="All Rights Reserved" 
id="1" name="Attribution-NonCommercial-ShareAlike License" 
id="2" name="Attribution-NonCommercial License" 
id="3" name="Attribution-NonCommercial-NoDerivs License" 
id="4" name="Attribution License" 
id="5" name="Attribution-ShareAlike License" 
id="6" name="Attribution-NoDerivs License" 
id="7" name="No known copyright restrictions"
id="8" name="United States Government Work" 
SORT
ate-posted-asc, date-posted-desc, date-taken-asc, date-taken-desc, interestingness-desc, interestingness-asc, and relevance.
PUBLIC FILTER
1 public photos
2 private photos visible to friends
3 private photos visible to family
4 private photos visible to friends & family
5 completely private photos
WORLD LEVEL
World level is 1
Country is ~3
Region is ~6
City is ~11
Street is ~16
CONTENT TYPE
1 for photos only.
2 for screenshots only.
3 for 'other' only.
4 for photos and screenshots.
5 for screenshots and 'other'.
6 for photos and 'other'.
7 for photos, screenshots, and 'other' (all).
*/
var xtend = require('xtend');
var generateUrls = require('flickr-generate-urls');
var fetch = require('node-fetch');

var DEFAULT_OPTS = {
  api_key: undefined,
  tag_mode: 'any',
  text: '',
  min_upload_data: undefined,
  max_upload_date: undefined,
  min_taken_date: undefined,
  max_taken_date: undefined,
  license: undefined,
  sort: 'date-posted-desc',
  privacy_filter: 1,
  bbox: undefined,
  accuracy: 1,
  safe_search: 1,
  content_type: 7,
  machine_tags: undefined,
  machine_tag_mode: undefined,
  group_id: undefined,
  contacts: undefined,
  woe_id: undefined,
  place_id: undefined,
  media: undefined,
  has_geo: undefined,
  geo_context: undefined,
  lat: undefined,
  lon: undefined,
  radius: undefined,
  radius_units: undefined,
  tags: undefined,
  is_comons: undefined,
  in_gallery: undefined,
  is_getty: undefined,
  extras: undefined,
  per_page: undefined,
  page: undefined
};

/* 
  FORMAT jpg/png
  DIMENSIONS 
    square
    largeSquare
    thumbnail
    small
    small320
    medium
    medium640
    medium800
    large
    large1600
    large2048
    original
*/

var DEFAULT_IMAGE_OPTS = {
  format: 'jpg',
  dimensions: 'largeSquare'
};

function FlickrScraper(opts) {
  if(!opts.api_key) {
    if(typeof opts.api_key !== 'string' || opts.api_key.length <= 0) {
      console.error('you need to specify an api key for photo search https://www.flickr.com/services/api/explore/flickr.photos.search');
      return;
    }
  }
  this.opts = xtend(DEFAULT_OPTS, opts);
  this.opts.imageOpts = undefined;
  this.opts = parseOpts(this.opts);
  this.imageOpts = xtend(DEFAULT_IMAGE_OPTS, opts.imageOpts);
}

FlickrScraper.prototype.getSearchUrl = function() {
  var _this = this;
  var uri = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1';
  Object.keys(this.opts).forEach(function(opt, i) {
    if(_this.opts[opt] !== undefined) {
      uri += '&' + opt + '=' + _this.opts[opt];
    }
  });
  this.uri = uri;
};

FlickrScraper.prototype.getImages = function(cb) {
  var _this = this;
  if(!this.uri) {
    console.warn('no flick url yet. generating');
    this.getSearchUrl();
  }

  fetch(this.uri)
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      var imageUrls = getUrls(json.photos.photo, _this.imageOpts);
      cb(imageUrls);
    });
};

function parseOpts(opts) {
  Object.keys(opts).forEach(function(opt) {
    if(typeof opts[opt] === 'string' && opts[opt].length <= 0) {
      opts[opt] = undefined;
    }
  });
  return opts;
}

function getUrls(photos, opts) {
  var images = [];
  photos.forEach(function(photo) {
    images.push(generateUrls(xtend(photo, {format: opts.format }))[opts.dimensions])
  });
  return images;
}

module.exports = FlickrScraper;
