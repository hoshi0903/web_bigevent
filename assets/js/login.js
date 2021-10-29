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

    var layer = layui.layer
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
        $.post("/api/reguser", data, 
        function(res){
            if(res.status !== 0) {
                    return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            // 模拟人的点击行为 点击登录 跳到登录窗口
            $('#link_login').click();
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit',function(e){
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
 

                // 将登录成功得到的token字符串，保存到localStorage中
                console.log(res.token);
                localStorage.setItem("token",res.token)
                // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDA0ODAsInVzZXJuYW1lIjoi6IOW57qiIiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6IiIsImVtYWlsIjoiIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2MzQ3NDM3MjcsImV4cCI6MTYzNDc3OTcyN30.T31Jczwq33CvPsXEUgr4MlJvU_IXMDakGRYRgHv2xKU

                // 跳转到后台主页 记住斜线的写法
                location.href = '/web_bigevent/index.html';
            }
        })
    })
})