require(['jquery', 'bscroll', 'render'], function($, bscroll, render) {

    var pagenum = 1, //初始加载第一页
        more = true; //是否有更多数据

    var _parent = $(".book-city>div");

    //实例化bscroll

    var cityBscroll = new bscroll(".book-city", {
        probeType: 2,
        click: true,
        scrollY: true
    })


    var fz = $("html").css("font-size");
    console.log(parseInt(fz));
    var hei = parseInt(fz) * 37.5 / 44;

    cityBscroll.on("scroll", function() {
        if (this.y < this.maxScrollY - hei) {
            if (more) {
                _parent.attr("up", "释放加载更多");
            } else {
                _parent.attr("up", "没有更多");
            }
        } else if (this.y < this.maxScrollY - hei / 2) {
            if (more) {
                _parent.attr("up", "上拉加载");
            } else {
                _parent.attr("up", "没有更多");
            }
        } else if (this.y > hei) {
            _parent.attr("down", "释放刷新")
        }
    })

    cityBscroll.on("touchEnd", function() {
        if (_parent.attr("up") === "释放加载更多") {
            console.log("加载下一页");
            if (more) {
                pagenum++;
                loadMore();
                _parent.attr("up", "上拉加载");
            } else {
                _parent.attr("up", "没有更多");
            }
        } else if (_parent.attr("down") === "释放刷新") {
            location.reload();
        }
    })

    //上拉加载

    function loadMore() {
        $.ajax({
            url: '/api/loadMore',
            data: {
                pagenum: pagenum,
                count: 10
            },
            dataType: 'json',
            success: function(res) {
                console.log(res);
                if (!res.more) {
                    more = false
                }
                render("#l-r-tpl", ".loadmore", res.items);
                cityBscroll.refresh();
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }
    loadMore();

})