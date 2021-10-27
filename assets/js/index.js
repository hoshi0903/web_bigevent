$(function() {
    // 调用函数获取用户信息
    getUserInfo()
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头的配置对象
        // /my开头的请求路径必须携带Authorization身份字段认证，要求为 localStorage.getItem('token')
        headers: {
            Authorization: localStorage.getItem('token')
        },
            success: function(res) {
                if(res.status !== 0) {
                    console.log(res);
                    return layui.layer.msg('获取用户信息失败！')
                } 
                // 调用renderAvatar 渲染用户的头像
                // renderAvatar()
                console.log(res);
        }
    })
}