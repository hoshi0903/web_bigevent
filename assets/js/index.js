$(function() {
    // 调用函数获取用户信息
    getUserInfo()

    var layer = layui.layer
    // 点击退出按钮 实现退出功能
    $('#btnLogout').on('click',function(){
        // 提示用户是否确认退出
        layer.confirm('确定退出登录？',{icon: 3, title:'提示'},function (index) {
            // 1、清楚本地存储中的token
           localStorage.removeItem('token')
            //2、重新跳转到登录页面
            location.href = '/web_bigevent/login.html'    
            // 关闭confirm 询问框
            layer.close(index)
        })
    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头的配置对象
        // /my开头的请求路径必须携带Authorization身份字段认证，要求为 localStorage.getItem('token')
        // headers: {
        //     Authorization: localStorage.getItem('token') ||''},
            success: function(res) {
                if(res.status !== 0) {
                    console.log(res);
                    return layui.layer.msg('获取用户信息失败！')
                } 
                // 调用renderAvatar 渲染用户的头像
                renderAvatar(res.data)
        }
    })
}

// 渲染用户头像
function renderAvatar(user) {

    // 1、获取用户的名称
    var name = user.nickname || user.username
    // 2、设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 按需渲染用户的头像
    if(user.user_pic !== null) {
        // 渲染用户的头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } else {

        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()//获取用户名第一个字符
        // console.log(first);
        $('.text-avatar').html(first).show()
    }
}


