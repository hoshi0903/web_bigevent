$(function(){
    initArtCateList()

    var form = layui.form
    var layer = layui.layer

    // 获取文章分类的列表
    function initArtCateList(){
        $.ajax({
            method: 'GET',
            url:'/my/article/cates',
            success: function(res){
                if(res.status !== 0) {
                    return layer.msg('获取文章列表失败！');
                }
                console.log(res);
                layer.msg('获取文章列表成功！');
                var htmlStr = template('tpl-table',res);
                $('tbody').html(htmlStr)
            }
        })
    }

    // 给添加类别按钮绑定事件
    $('#btnAddCate').on('click',function(){
        console.log('OK!');
        layer.open({
            // type: 1 不带确定按钮的页面层 0是指信息框
            type: 1,
            // 弹出层宽高
            area: ['500px','250px'],

            // 弹出层标题设置
            title: '在添加文章分类',
            content: $('#dialog-add').html()
          });    
    })
})