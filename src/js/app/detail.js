require(['jquery', 'getRequest'], function($, getRequest) {
    var fiction_id = getRequest().fiction_id;
    console.log(fiction_id);
    $.ajax({
        url: '/api/detail?fiction_id=' + fiction_id,
        dataType: 'json',
        success: function(res) {
            console.log(res)
        },
        error: function(error) {
            console.log(error)
        }
    })
})

//接口地址： /api/detail
//接口说明： 请求书的详情
//请求方式: get
//传参：          数据类型   默认值
//fiction_id      Number     无
//返回值