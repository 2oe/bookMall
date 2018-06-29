require(['jquery', 'bscroll', 'render', 'getRequest', 'storage'], function($, bscroll, render, getRequest, storage) {
    var fiction_id = getRequest().fiction_id;
    $.ajax({
        url: '/api/chapter',
        data: {
            fiction_id: fiction_id
        },
        dataType: 'json',
        success: function(res) {
            console.log(res);
            var already = storage.get("already") || []; //[1,2,3,4]
            already.forEach(function(val, index) {
                res.item.toc[val].already = true;
            })
            render("#chapter-template", ".chapter-list", res.item.toc);
            var chapterScroll = new bscroll(".chapter-wrap", {
                click: true
            })
            var target;
            if (!getRequest().chapter_id) {
                target = $(".chapter-list li").length - 1;
            } else {
                target = getRequest().chapter_id;
            }

            chapterScroll.scrollToElement($(".chapter-list li").eq(target)[0]);
            $(".chapter-list li").eq(target).addClass("active");
        },
        error: function(error) {
            console.warn(error)
        }
    })

    $(".icon-back").on("click", function() {
        history.go(-1);
    })

    //点击li 
    $(".chapter-list").on("click", "li", function() {
        var index = $(this).index();
        storage.set("chapter_id", index);
        location.href = "../../page/artical.html?fiction_id=" + fiction_id + "&chapter_id=" + index;
    })
})

//接口的地址  /api/chapter
//接口说明   请求目录的
//参数            数据类型    默认值
//fiction_id        Number     无

//请求方式  get

//success  返回数据