$(function(){
    var form = layui.form
    var layer = layui.layer

     // 通过 form.verify()函数自定义校验规则
     form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],

        // 校验新密码和旧密码是否一致的规则
        samepwd: function (value) {
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同，请重新输入！'
            }
        },
    
        
        
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到密码中的内容
            // 再通过判断，若两者不一致则return出提示消息
            if(value !== $('[name=newPwd]').val()) {
                return '两次密码不一致,请重新输入！'
            } 
            
        }
    })

    // 点击提交按钮发起ajax的post请求，密码提交
    $('.layui-form').on('submit',function(e){
        // 阻止表单的重置默认行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data:$(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layui.layer.msg('更新密码失败！');
                } 
                layui.layer.msg('更新密码成功！');

                // 重置表单
                $('.layui-form')[0].reset();
                // js对象转原生dom对象：只需书写方括号枚举其中一项的下标即可：$('.layui-form')[0]
                // 原生dom对象转js对象：通过getElement等方法转化为js dom对象，然后传入jquery括号里即可：var obox = document.getElementsByClassName('box'),$(obox).css('backgroundColor','grey');
            }
        })
    })
})