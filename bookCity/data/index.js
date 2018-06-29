var homeJson = require('./mock/home.json');
var hotJson = require('./mock/search-hot.json');
var zhuJson = require('./mock/search-zhu.json');
var tianJson = require('./mock/search-tian.json');
var detail_352876 = require('./mock/352876.json');
var recommend1 = require('./mock/recommend/recommend1.json');
var recommend2 = require('./mock/recommend/recommend2.json');
var recommend3 = require('./mock/recommend/recommend3.json');
var femaleJson = require('./mock/female.json');
var chapterList = require('./mock/chapter-list.json');
var artical1 = require('./mock/artical/data1.json');
var artical2 = require('./mock/artical/data2.json');
var artical3 = require('./mock/artical/data3.json');
var artical4 = require('./mock/artical/data4.json');

var obj = {
    '/api/home': homeJson,
    '/api/hot': hotJson,
    '/api/search?key=诛仙': zhuJson,
    '/api/search?key=择天记': tianJson,
    '/api/detail?fiction_id=352876': detail_352876,
    '/api/loadMore?pagenum=1&count=10': recommend1,
    '/api/loadMore?pagenum=2&count=10': recommend2,
    '/api/loadMore?pagenum=3&count=10': recommend3,
    '/api/female': femaleJson,
    '/api/chapter?fiction_id=352876': chapterList,
    '/api/artical?fiction_id=352876&chapter_id=1':artical1,
    '/api/artical?fiction_id=352876&chapter_id=2':artical2,
    '/api/artical?fiction_id=352876&chapter_id=3':artical3,
    '/api/artical?fiction_id=352876&chapter_id=4':artical4
}

module.exports = function(path) {
    return obj[path] || null
}