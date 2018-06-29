require(['jquery', 'getRequest', 'render', 'text!bookTB', 'storage'], function($, getRequest, render, bookTB, storage) {
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

            //点击开始阅读
            $("#start-btn").on("click", function() {
                if (storage.get("code")) {
                    location.href = "../../page/artical.html?fiction_id=" + fiction_id;
                } else {
                    location.href = "../../page/login.html";
                }
            })
        },
        error: function(error) {
            console.log(error)
        }
    })

    //返回首页
    $("header>span").on("click", function() {
        location.href = "/";
    })


})

//接口地址： /api/detail
//接口说明： 请求书的详情
//请求方式: get
//传参：          数据类型   默认值
//fiction_id      Number     无
//返回值