require(['jquery', 'render', 'lazy'], function($, render, lazy) {
    function getList() {
        $.ajax({
            url: '/api/list',
            dataType: 'json',
            success: function(res) {
                console.log(res)
                render("#list-tpl", ".list-wrap", res.items);
                $("img[data-original]").lazyload({
                    threshold: 200,
                    container: $(".list-content")
                })

                $(".list-content").on("scroll", loadMore);
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }
    getList();

    var parentHeight = $(".list-content").height();


    function loadMore() {
        var conHeight = $(".list-wrap").height();
        var maxScrollY = conHeight - parentHeight;
        if ($(this).scrollTop() > maxScrollY - 40) {
            $(".list-content").off("scroll");
            getList();
        }
    }

    $("header>span").on("click", function() {
        location.href = "/";
    })

})