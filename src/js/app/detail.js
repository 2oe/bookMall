require(['jquery', 'getRequest', 'render', 'text!bookTB'], function($, getRequest, render, bookTB) {
    $("body").append(bookTB);
    var fiction_id = getRequest().fiction_id;
    console.log(fiction_id);
    $.ajax({
        url: '/api/detail?fiction_id=' + fiction_id,
        dataType: 'json',
        success: function(res) {
            console.log(res);
            // 书的详情
            render("#detail-template", "#detail", res.item);
            //类别标签
            render("#tag-template", ".type-tags", res.item);
            //作者相关书籍
            render("#book-t-b", "#other-list", res.related);
            //版本信息
            render("#copyright-template", ".copyright", res.item);
            $(".content").show();
        },
        error: function(error) {
            console.log(error)
        }
    })
    $("header>span").on("click", function() {
        location.href = "/";
    })
})