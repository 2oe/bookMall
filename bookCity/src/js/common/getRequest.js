define(function() {
    function getRequest() {
        var url = location.search;
        var target = {};
        if (url.indexOf("?") > -1) {
            url = url.slice(1);
            console.log(url);
            var paramsArr = url.split("&");
            paramsArr.forEach(function(item) {
                var itemArr = item.split("=");
                target[itemArr[0]] = itemArr[1];
            })
        }
        return target
    }
    return getRequest
})