$(function(){
    var form = layui.form
    var layer = layui.layer

    initCate()

    // 初始化富文本编辑器
    initEditor()


    // 定义加载文章分类的方法
    function initCate(){
        $.ajax({
            method: 'GET',
            url:'/my/article/cates',
            success: function(res){
                if(res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                // 调用模板引擎，渲染分类菜单下拉菜单
                console.log(res);
                var htmlStr = template('tpl-cate',res)
                console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr);

                // 动态添加的tpl-cate是layui无法监听到的
                // 一定要调用form.render()方法，重新渲染区域
                form.render()

                layer.msg('初始化文章分类成功！')
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 点击上次文件
    $('#btnChooseImage').on('click',function(e){
        e.preventDefault();
        $('#coverFile').click();
 
    })

    // 监听coverFile的 change 时间
    $('#coverFile').on('change',function(){

    })
           // 1. 拿到用户选择的文件
           var files = e.target.files[0]
           // 2. 根据选择的文件，创建一个对应的 URL 地址：
           var newImgURL = URL.createObjectURL(file)
   
           console.log(newImgURL);
})