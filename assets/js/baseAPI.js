// 每次调用$.gei()函数或者是$.post()函数，$.ajax()函数等之前都会调用$.ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax()配置的对象
$.ajaxPrefilter(function(options){
    // 在发起真正的Ajax请求之前，同意拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net'+ options.url;
    
    // 统一为有权限的接口，设置headers请求头
    // 先判断url是否有my(有权限的接口)
    if(options.url.indexOf('/my/') !== -1){
        options.headers = { Authorization: localStorage.getItem('token') ||''}
        // console.log(options.headers)
    }

    // 全局统一挂载 complete 回调函数
     // 无论成功还是失败，最终都会调用complete 回调函数
    options.complete = function (res) {
        //    在complete回调函数中，可以使用res.reponseJSON 拿到的服务器响应回来的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            // 1、强制清空token
            localStorage.removeItem('token')
            // 2、强制跳转到登录页面
            location.href = '/web_bigevent/login.html'
            }
    }

}) 