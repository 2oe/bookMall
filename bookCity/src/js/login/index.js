require(['jquery', 'storage'], function($, storage) {
    //点击登录
    $("#sub-btn").on("click", function() {
        var username = $("#username").val();

        var pwd = $("#pwd").val();

        if (!username) {
            alert("请输入用户名");
        } else if (!pwd) {
            alert("请输入密码");
        } else {
            $.ajax({
                url: '/api/login',
                type: 'post',
                dataType: 'json',
                data: {
                    username: username,
                    pwd: pwd
                },
                success: function(res) {
                    console.log(res);
                    if (res.code) {
                        storage.set("code", res.code);
                        history.go(-1);
                    }
                    alert(res.msg);
                },
                error: function(error) {
                    console.warn(error)
                }
            })
        }
    })
})