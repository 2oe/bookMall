var gulp = require('gulp');

var server = require('gulp-webserver');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var sequence = require('gulp-sequence');

var url = require('url');

var path = require('path');

var fs = require('fs');

var querystring = require('querystring');

var mock = require('./data');

//开发 --- 编译scss 

gulp.task('devSass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            borwsers: ['last 2 versions', 'Android > 4.0']
        }))
        .pipe(gulp.dest("src/css"))
})

//开发 --- 监听scss
gulp.task('devWatch', function() {
    return gulp.watch('src/scss/**/*.scss', ['devSass']);
})

//起服务
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            open:true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                var reqUrl = querystring.unescape(req.url);

                if (/\/api/g.test(pathname)) {
                    //   /api/hot
                    res.end(JSON.stringify(mock(reqUrl)))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }

            }
        }))
})

//开发环境

gulp.task('dev', function(cb) {
    sequence('devSass', 'devWatch', 'server', cb)
})