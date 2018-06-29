require(['jquery', 'storage', 'getRequest', 'jsonp', 'base64', 'render'], function($, storage, getRequest, jsonp, base64, render) {

    //缓存元素
    var _setWrap = $(".set-wrap");

    var chapter_id = storage.get("chapter_id") || 1;

    $(".cur-chapter").html(chapter_id);

    var fiction_id = getRequest().fiction_id;

    var chapterIdArr = storage.get("already") || [];

    if (storage.get("code")) {
        //加载第一章的数据
        getArtical();
    } else {
        location.href = "../../page/login.html";
    }

    //点击返回
    $(".set-t").on("click", "span", function() {
        location.href = "../../page/detail.html?fiction_id=" + fiction_id;
    })



    //获取章节内容
    function getArtical() {
        $.ajax({
            url: '/api/artical',
            data: {
                fiction_id: fiction_id,
                chapter_id: chapter_id
            },
            dataType: 'json',
            success: function(res) {
                console.log(res);
                jsonp({
                    url: res.jsonp,
                    callback: 'duokan_fiction_chapter',
                    cache: true,
                    success: function(data) {
                        var str = $.base64.atob(data, true);
                        var artical = JSON.parse(str);
                        console.log(artical);
                        render("#artical-tpl", ".artical-con", artical, true);
                        if (chapterIdArr.indexOf(chapter_id) == -1) {
                            chapterIdArr.push(chapter_id);
                            storage.set("already", chapterIdArr);
                        }
                    }
                })
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }

    //点击下一章
    $("#next-btn").on("click", function() {
        if (chapter_id < 4) {
            chapter_id += 1;
            getArtical();
            $(".cur-chapter").html(chapter_id);
            storage.set("chapter_id", chapter_id);
        } else {
            alert("最后一章");
        }
    })

    //点击上一章
    $("#pre-btn").on("click", function() {
        if (chapter_id > 1) {
            chapter_id -= 1;
            getArtical();
            $(".cur-chapter").html(chapter_id);
            storage.set("chapter_id", chapter_id);
        } else {
            alert("没有上一章");
        }
    })

    //章节数

    $.ajax({
        url: '/api/chapter',
        data: {
            fiction_id: fiction_id
        },
        dataType: 'json',
        success: function(res) {
            console.log(res);

            $(".total-chapter").html(res.item.toc.length);
        },
        error: function(error) {
            console.warn(error)
        }
    })

    //go 目录页面

    $(".chapter-btn").on("click", function() {
        location.href = "../../page/chapter-list.html?fiction_id=" + fiction_id + "&chapter_id=" + chapter_id;
    })


    //点击内容
    $(".artical-con").on("click", function() {
        _setWrap.show();
    })

    //点击mask
    $(".mask").on("click", function() {
        _setWrap.hide();
        $(".set-panel").hide();
        $(".font-btn").removeClass("active");
    })

    //点击字体
    $(".font-btn").on("click", function() {
        $(".set-panel").toggle();
        $(this).toggleClass("active");
    })

    var initFz = storage.get("fz") || 14,
        maxFz = 30,
        minFz = 10; //初始12

    $(".artical-con p").css("font-size", initFz / 37.5 + "rem");

    //点击大
    $(".large-btn").on("click", function() {
        if (initFz < maxFz) {
            initFz += 2;
        }
        //转换rem
        $(".artical-con p").css("font-size", initFz / 37.5 + "rem");
        storage.set("fz", initFz);
    })

    //点击小
    $(".small-btn").on("click", function() {
        if (initFz > minFz) {
            initFz -= 2;
        }
        //转换rem
        $(".artical-con p").css("font-size", initFz / 37.5 + "rem");
        storage.set("fz", initFz);
    })

    var status = true,
        chooseBg = storage.get("bg") || "#f7eee5",
        darkBg = '#0f1410'; //夜间的状态

    if (!storage.get("tag") || storage.get("tag") === '夜间') {
        status = true;
        lightStatus();
    } else {
        status = false;
        nightStatus();
    }


    //设置背景
    $(".bg-btns").on("click", "li", function() {
        chooseBg = $(this).attr("data-bg");
        $(this).addClass("active").siblings().removeClass("active");
        if (status) {
            $(".artical-con").css("background-color", chooseBg);
        }
        storage.set("bg", chooseBg);
    })

    //切换白天黑夜
    $(".day-btn").on("click", function() {
        status = !status;
        var tag = status ? "夜间" : "白天";
        storage.set("tag", tag);
        if (status) { //白天的状态 ---》 dl显示夜间
            lightStatus();
            storage.set("bg", chooseBg);
        } else { //夜间的状态 --->dl显示的是白天
            nightStatus()
        }
    })

    function lightStatus() {
        $(".day-btn").removeClass("light");
        $(".day-btn").find("dd").html("夜间");
        $(".artical-con").css("background-color", chooseBg);
        $(".bg-btns li").each(function() {
            if ($(this).attr("data-bg") === chooseBg) {
                $(this).addClass("active").siblings().removeClass("active");
            }
        })
    }

    function nightStatus() {
        $(".day-btn").addClass("light");
        $(".day-btn").find("dd").html("白天");
        $(".artical-con").css("background-color", darkBg);
        $(".bg-btns li:last").addClass("active").siblings().removeClass("active");
    }
});