require.config({
    baseUrl: '/js/',
    paths: {
        //库文件
        'jquery': './libs/jquery-2.1.1.min',
        'swiper': './libs/swiper.min',
        'bscroll': './libs/bscroll',
        'handlebars': './libs/handlebars-v4.0.11',
        'text': './libs/text',
        'lazy': './libs/jquery.lazyload',

        //common
        'direction': './common/direction',
        'render': './common/render',
        'storage': './common/storage',
        'getRequest': './common/getRequest',

        //app
        'index': './app/index',
        'search': './app/search',
        'detail': './app/detail',
        'list': './app/list',

        //模板
        'bookTB': '../page/tpl/book-t-b.html',
        'bookSearchTpl': '../page/tpl/book-l-r-s-list.html',
        'bookLR': '../page/tpl/book-l-r-list.html'
    },
    shim: {
        'lazy': {
            deps: ['jquery']
        }
    }
})