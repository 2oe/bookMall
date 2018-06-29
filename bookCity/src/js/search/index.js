require(['jquery', 'render', 'text!bookSearchTpl', 'lazy', 'storage'], function($, render, bookSearchTpl, lazy, storage) {
    $("body").append(bookSearchTpl);

    var history = storage.get('history') || [];
    if (history.length > 0) {
        renderHistory(history)
    }
    //搜索历史记录
    function renderHistory(history) {
        $(".history-title").show();
        var targetArr = [];
        history.forEach(function(item, index) {
            var obj = {};
            obj['ad_name'] = item;
            targetArr.push(obj)
        })
        render("#tag-tpl", ".history", targetArr, true);
    }

    //点击返回
    $(".icon-back").on("click", function() {
        location.href = "/";
    })

    //热门搜索数据
    $.ajax({
        url: '/api/hot',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            render("#tag-tpl", ".hot", res.ads)
        },
        error: function(error) {
            console.warn(error)
        }
    })

    //缓存元素
    var _ipt = $(".ipt"),
        _typeTags = $(".type-tags"),
        _searchList = $(".search-list"),
        _tagWrap = $(".tag-wrap");

    //点击搜索按钮
    $(".search-btn").on("click", function() {
        _searchList.html(" ");
        _tagWrap.hide();
        _searchList.show();
        var val = _ipt.val();
        //搜索内容为空
        if (!val) {
            _searchList.html("<p>搜索内容为空，请输入搜索内容</p>");
        } else {
            searchFun(val);
        }
    })

    //搜索
    function searchFun(val) {
        if (history.indexOf(val) == -1) {
            history.unshift(val);
            storage.set("history", history);
        }
        renderHistory(history);
        $.ajax({
            url: '/api/search',
            data: {
                key: val
            },
            dataType: 'json',
            success: function(res) {
                console.log(res);
                renderResult(res)
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }


    //渲染数据
    function renderResult(res) {

        if (res) {
            render("#search-template", ".search-list", res.items, true);
            $(".search-list img").lazyload({
                threshold: 200,
                container: $(".search-list")
            })
        } else {
            _searchList.html("<p>暂无数据</p>");
        }
    }

    //ipt input事件
    _ipt.on("input", function() {
        if (!_ipt.val()) {
            _tagWrap.show();
            _searchList.hide();
        }
    })

    //tags 点击
    $(".type-tags").on("click", "li", function() {
        _searchList.html(" ");
        _tagWrap.hide();
        _searchList.show();
        var key = $(this).html();
        _ipt.val(key);
        searchFun(key);
    })

})

//接口的地址    /api/hot
//接口的说明    请求热门数据
//传参：无
//请求方式:get
//返回数据：


//接口地址   /api/search
//接口说明   搜索书籍
//传参：key  数据类型：string  
//请求方式：get
//返回数据