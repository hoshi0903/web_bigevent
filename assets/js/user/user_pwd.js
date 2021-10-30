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
            } else {
                return '修改成功！'
            }
        }
    })
})