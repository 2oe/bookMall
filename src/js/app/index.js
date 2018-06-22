require(['jquery', 'swiper', 'bscroll', 'direction', 'render', 'text!bookTB','text!bookLR'], function($, swiper, bscroll, direction, render, bookTB,bookLR) {
    // 把上下结构的模板放在页面中
    $("body").append(bookTB);
    $("body").append(bookLR);
    var pNum = 1; //初始
    var more = true;
    var num = 0,len;
    var recommend;
    $.ajax({
        url: '/api/home',
        dataType: 'json',
        success: function(res) {
            console.log(res.items[0].data.data)
            // 轮播图
            var bannerArr = [];
            res.items[0].data.data.forEach(function(item) {
                if (item.size !== 0) {
                    bannerArr.push(item);
                }
            });
            render("#banner_tpl", ".bWrap", bannerArr);
            var bannerSwiper = new swiper('.banner',{
                autoplay: 1000,
                loop:true
            })
            
            //分类
            var typeArr = [];
            res.items[0].data.data.forEach(function(item) {
                if (item.size === 0) {
                    typeArr.push(item);
                }
            });
            console.log(typeArr)
            render("#type-tpl", ".types", typeArr);

            // 本周最火
            render("#book-t-b", ".top-list", res.items[1].data);

            
            //重磅推荐
            recommend = format(res.items[2].data.data);
            len = recommend.length;
            renderRecommend(recommend[num]);
            $(".top-list").on("click", "li", function() {
                var fiction_id = $(this).attr("data-id");
                location.href = "../../page/detail.html?fiction_id=" + fiction_id;
            })
        },
        error: function(error) {
            console.warn(error)
        }
    });
    // 格式化数组
    function format (data) {
        var i = 0;
        var nArr = [];
        data.forEach(function(item,index){
            if (!nArr[i]) {
                nArr[i] = [];
            }
            var idx = index + 1;
            nArr[i].push(item);
            if (idx % 5 === 0) {
                i++;
            }
        })
        return nArr;
    }
    // 渲染重磅推荐
    function renderRecommend(data){
        render("#book-l-r-tpl", ".l-f-list", data,true);
    }
    // 点击换一换
    $('.change_btn').on('click', function () {
        num++;
        if (num == len) {
            num = 0;
        }
        renderRecommend(recommend[num]);
    })
    //滑动兼容处理  
    var startX, startY;
    document.addEventListener('touchstart', function(ev) {
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
    }, false);
    document.addEventListener('touchend', function(ev) {
        var endX, endY;
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var direct = direction(startX, startY, endX, endY);
        switch (direct) {
            case 3:
                swiperFun(1);
                break;
            case 4:
                swiperFun(0);
                break;
            default:
        }
    }, false);

    //缓存元素
    var _line = $(".line"),
        _parent = $(".book-city>div");

    function swiperFun(activeIndex) {
        $(".tab-item").eq(activeIndex).addClass("active").siblings().removeClass("active");
        if (activeIndex == 1) {
            _line.addClass("move")
        } else {
            _line.removeClass("move")
        }
        wrapSwiper.slideTo(activeIndex);
    }

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
            if(more){
                _parent.attr('up',"释放加载更多");
            } else{
                _parent.attr("up", "暂无数据");
            }
        } else if (this.y < this.maxScrollY - hei / 2) {
            if(more){
                _parent.attr('up',"上拉加载");
            } else{
                _parent.attr("up", "暂无数据");
            }
        } else if (this.y > hei) {
            _parent.attr("down", "释放刷新")
        }
    })

    cityBscroll.on("touchEnd", function() {
        if (_parent.attr("up") === "释放加载更多") {
            console.log("加载下一页");
            if (more) {
                pNum++;
                loadMore();
                _parent.attr('up',"上拉加载");
            } else {
                _parent.attr('up',"暂无数据");
            }
        } else if (_parent.attr("down") === "释放刷新") {
            location.reload();
        }
    })

    //实例化wrap-swiper
    var wrapSwiper = new swiper('.wrap-swiper');

    //点击tab
    $(".tab").on("click", ".tab-item", function() {
        $(this).addClass("active").siblings().removeClass("active");
        var ind = $(this).index();

        if (ind == 1) {
            _line.addClass("move");
        } else {
            _line.removeClass("move");
        }
        wrapSwiper.slideTo(ind);
    })
    // 上拉加载
    function loadMore() {
        $.ajax({
            url: '/api/loadMore',
            data: {
                pNum:pNum,
                count: 10
            },
            dataType:'json',
            success:function(res){
                if(!res.more){
                    more = false;
                } 
                render('#l-r-tpl','.loadMore',res.items);
                cityBscroll.refresh();
            },
            error:function(error){
                console.warn(error);
            }
        })
    }
    loadMore();
    $('.types').on('click','dl',function(){
        location.href = '../../page/list.html';
    })
})