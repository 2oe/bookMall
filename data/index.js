var homeJson = require('./mock/home.json');
var hotJson = require('./mock/search-hot.json');
var zhuJson = require('./mock/search-zhu.json');
var tianJson = require('./mock/search-tian.json');
var detail_352876 = require('./mock/352876.json');
var recommend1 = require('./mock/recommend/recommend1.json');
var recommend2 = require('./mock/recommend/recommend2.json');
var recommend3 = require('./mock/recommend/recommend3.json');
var female = require('./mock/female.json');

var obj = {
    '/api/home': homeJson,
    '/api/hot': hotJson,
    '/api/search?key=诛仙': zhuJson,
    '/api/search?key=择天记': tianJson,
    '/api/detail?fiction_id=352876': detail_352876,
    '/api/loadMore?pNum=1&count=10':recommend1,
    '/api/loadMore?pNum=2&count=10':recommend2,
    '/api/loadMore?pNum=3&count=10':recommend3,
    '/api/list':female
}

module.exports = function(path) {
    return obj[path] || null
}