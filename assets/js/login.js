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
    // 通过 form.verify()函数自定义校验规则
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],

        // 校验两次密码是否一致的规则
        repwd:function(value){
            // 通过形参拿到密码中的内容
            // 再通过判断，若两者不一致则return出提示消息
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) {
                return alert('两次密码不一致,请重新输入！')
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        // 阻止默认行为
        e.preventDefault();
        // 发起ajax的post请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        console.log(data);
        $.post("http://api-breakingnews-web.itheima.net/api/reguser", data, 
        function(res){
            if(res.status !== 0) {
                    return console.log(res.message);
            }
            console.log('注册成功，请登录！');
        })
    })
})