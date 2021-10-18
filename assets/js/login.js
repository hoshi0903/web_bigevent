$(function(){
    // 点击"去注册账号"的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击"去登录账号"的链接
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui中获取form对象
    var form = layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格']
    })
})